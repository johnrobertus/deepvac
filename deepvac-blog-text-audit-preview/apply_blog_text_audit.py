#!/usr/bin/env python3
"""
Apply the Deepvac blog text-audit package to the preview working tree.

Usage from the repository root:
  python3 /path/to/apply_blog_text_audit.py --check
  python3 /path/to/apply_blog_text_audit.py --apply

The script does not run git, deploy or network commands.
"""

from __future__ import annotations

import argparse
import copy
import json
import shutil
import sys
from pathlib import Path
from typing import Any

BUNDLE = Path(__file__).resolve().parent
FILES = BUNDLE / "files"
PATCH_DATA = BUNDLE / "audit" / "patch-data.json"

COPIED_FILES = [
    "src/content/blog/part1.json",
    "src/content/blog/part2.json",
    "src/content/blog/part3.json",
    "src/content/blog/part4.json",
    "src/content/blog/part5.json",
    "src/lib/blogContent.ts",
    "src/lib/blog.ts",
    "src/pages/blog/GeneratedPost.tsx",
    "src/pages/blog/BlogArticlePage.tsx",
]

PATCHED_JSON_FILES = [
    "src/i18n/locales/en/blog.json",
    "src/i18n/locales/de/blog.json",
    "src/i18n/locales/en/seo.json",
    "src/i18n/locales/de/seo.json",
    "src/content/blog/legacy.json",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true", help="validate the package without writing")
    mode.add_argument("--apply", action="store_true", help="write the audited files")
    parser.add_argument(
        "--root",
        type=Path,
        default=Path.cwd(),
        help="repository root, defaults to the current directory",
    )
    parser.add_argument(
        "--backup-dir",
        type=Path,
        default=None,
        help="optional directory for copies of files before writing",
    )
    return parser.parse_args()


def read_json(path: Path) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RuntimeError(f"Required file is missing: {path}") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON in {path}: {exc}") from exc


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def set_dotted(data: dict[str, Any], dotted: str, value: Any) -> None:
    parts = dotted.split(".")
    cursor: dict[str, Any] = data
    for part in parts[:-1]:
        current = cursor.get(part)
        if current is None:
            current = {}
            cursor[part] = current
        if not isinstance(current, dict):
            raise RuntimeError(
                f"Cannot set {dotted}: {part} is not an object in the target JSON"
            )
        cursor = current
    cursor[parts[-1]] = copy.deepcopy(value)


def replace_em_dash(value: Any) -> Any:
    if isinstance(value, str):
        return value.replace("\u2014", "\u2013")
    if isinstance(value, list):
        return [replace_em_dash(item) for item in value]
    if isinstance(value, dict):
        return {key: replace_em_dash(item) for key, item in value.items()}
    return value


def load_generated_posts() -> list[dict[str, Any]]:
    posts: list[dict[str, Any]] = []
    for index in range(1, 6):
        path = FILES / f"src/content/blog/part{index}.json"
        value = read_json(path)
        if not isinstance(value, list):
            raise RuntimeError(f"{path} must contain a JSON array")
        posts.extend(value)
    return posts


def patch_blog_json(
    current: dict[str, Any],
    language: str,
    patch_data: dict[str, Any],
) -> dict[str, Any]:
    result = copy.deepcopy(current)
    updates = patch_data["blogUpdates"][language]
    for dotted, value in updates.items():
        set_dotted(result, dotted, value)

    # These duplicate top-level objects were introduced by the initial blog wiring.
    # The application reads the nested blog.categories and blog.labels objects.
    result.pop("categories", None)
    result.pop("labels", None)
    return replace_em_dash(result)


def patch_seo_json(
    current: dict[str, Any],
    language: str,
    posts: list[dict[str, Any]],
    patch_data: dict[str, Any],
) -> dict[str, Any]:
    result = copy.deepcopy(current)

    for post in posts:
        content = post[language]
        result[post["seoKey"]] = {
            "title": content["seoTitle"],
            "description": content["seoDescription"],
        }

    for key, value in patch_data["legacySeoUpdates"][language].items():
        result[key] = copy.deepcopy(value)

    return replace_em_dash(result)


def patch_legacy_json(
    current: list[dict[str, Any]],
    patch_data: dict[str, Any],
) -> list[dict[str, Any]]:
    result = copy.deepcopy(current)
    by_key = patch_data["legacyListingUpdates"]

    for post in result:
        updates = by_key.get(post.get("articleKey"))
        if not updates:
            continue
        for language in ("en", "de"):
            post.setdefault(language, {}).update(copy.deepcopy(updates[language]))

    return replace_em_dash(result)


def validate_generated_posts(posts: list[dict[str, Any]]) -> list[str]:
    problems: list[str] = []
    article_keys: set[str] = set()
    en_slugs: set[str] = set()
    de_slugs: set[str] = set()

    required_top = {
        "articleKey",
        "enSlug",
        "deSlug",
        "category",
        "datePublished",
        "dateModified",
        "seoKey",
        "relatedPaths",
        "relatedArticles",
        "searchIntent",
        "references",
        "en",
        "de",
    }
    required_content = {
        "title",
        "description",
        "seoTitle",
        "seoDescription",
        "intro",
        "sections",
        "faq",
        "conclusion",
    }

    for post in posts:
        key = post.get("articleKey", "<missing>")
        missing = required_top.difference(post)
        if missing:
            problems.append(f"{key}: missing top-level fields {sorted(missing)}")

        if key in article_keys:
            problems.append(f"duplicate articleKey: {key}")
        article_keys.add(key)

        for slug_field, seen in (("enSlug", en_slugs), ("deSlug", de_slugs)):
            slug = post.get(slug_field)
            if not isinstance(slug, str) or not slug:
                problems.append(f"{key}: invalid {slug_field}")
            elif slug in seen:
                problems.append(f"duplicate {slug_field}: {slug}")
            else:
                seen.add(slug)

        if post.get("dateModified") != "2026-07-23":
            problems.append(f"{key}: dateModified is not 2026-07-23")

        intent = post.get("searchIntent")
        for language in ("en", "de"):
            content = post.get(language)
            if not isinstance(content, dict):
                problems.append(f"{key}: missing {language} content")
                continue
            content_missing = required_content.difference(content)
            if content_missing:
                problems.append(
                    f"{key}: {language} content missing {sorted(content_missing)}"
                )

            lang_intent = intent.get(language) if isinstance(intent, dict) else None
            if not isinstance(lang_intent, dict):
                problems.append(f"{key}: missing {language} search intent")
            else:
                if not lang_intent.get("primaryKeyword"):
                    problems.append(f"{key}: empty {language} primaryKeyword")
                if not lang_intent.get("primaryQuestion"):
                    problems.append(f"{key}: empty {language} primaryQuestion")

        references = post.get("references")
        if not isinstance(references, list) or len(references) < 2:
            problems.append(f"{key}: fewer than two technical references")
        else:
            for reference in references:
                if not all(reference.get(field) for field in ("title", "publisher", "url")):
                    problems.append(f"{key}: incomplete technical reference")
                if not str(reference.get("url", "")).startswith("https://"):
                    problems.append(f"{key}: non-HTTPS technical reference")

        serialized = json.dumps(post, ensure_ascii=False)
        if "\u2014" in serialized:
            problems.append(f"{key}: em dash remains in article data")

    known_related = article_keys | {
        "coolingSystems",
        "retrofitVsReplacement",
        "aerospaceQualification",
        "tvacCostDrivers",
        "tvacTestCampaign",
    }
    for post in posts:
        for related in post.get("relatedArticles", []):
            if related not in known_related:
                problems.append(
                    f"{post.get('articleKey')}: unknown related article {related}"
                )

    if len(posts) != 22:
        problems.append(f"expected 22 generated posts, found {len(posts)}")

    return problems


def validate_source_files() -> list[str]:
    problems: list[str] = []
    for relative in COPIED_FILES:
        source = FILES / relative
        if not source.exists():
            problems.append(f"bundle source is missing: {source}")
            continue
        if "\u2014" in source.read_text(encoding="utf-8"):
            problems.append(f"em dash remains in bundle source: {relative}")
    return problems


def build_outputs(
    root: Path,
    posts: list[dict[str, Any]],
    patch_data: dict[str, Any],
) -> dict[str, bytes]:
    outputs: dict[str, bytes] = {}

    for relative in COPIED_FILES:
        outputs[relative] = (FILES / relative).read_bytes()

    for language in ("en", "de"):
        blog_relative = f"src/i18n/locales/{language}/blog.json"
        blog_current = read_json(root / blog_relative)
        blog_patched = patch_blog_json(blog_current, language, patch_data)
        outputs[blog_relative] = (
            json.dumps(blog_patched, ensure_ascii=False, indent=2) + "\n"
        ).encode("utf-8")

        seo_relative = f"src/i18n/locales/{language}/seo.json"
        seo_current = read_json(root / seo_relative)
        seo_patched = patch_seo_json(seo_current, language, posts, patch_data)
        outputs[seo_relative] = (
            json.dumps(seo_patched, ensure_ascii=False, indent=2) + "\n"
        ).encode("utf-8")

    legacy_relative = "src/content/blog/legacy.json"
    legacy_current = read_json(root / legacy_relative)
    legacy_patched = patch_legacy_json(legacy_current, patch_data)
    outputs[legacy_relative] = (
        json.dumps(legacy_patched, ensure_ascii=False, separators=(",", ":")) + "\n"
    ).encode("utf-8")

    return outputs


def main() -> int:
    args = parse_args()
    root = args.root.resolve()

    if not (root / "package.json").exists():
        print(f"error: {root} does not look like the Deepvac repository root", file=sys.stderr)
        return 2

    patch_data = read_json(PATCH_DATA)
    posts = load_generated_posts()

    problems = validate_source_files()
    problems.extend(validate_generated_posts(posts))
    if problems:
        print("Validation failed:")
        for problem in problems:
            print(f"  * {problem}")
        return 1

    outputs = build_outputs(root, posts, patch_data)

    changed = []
    for relative, desired in outputs.items():
        target = root / relative
        current = target.read_bytes() if target.exists() else b""
        if current != desired:
            changed.append(relative)

    print(f"Validated {len(posts)} generated posts and 5 legacy articles.")
    print(f"Files that would change: {len(changed)}")
    for relative in changed:
        print(f"  {relative}")

    if args.check:
        return 0

    if args.backup_dir:
        backup_root = args.backup_dir.resolve()
        for relative in changed:
            source = root / relative
            if not source.exists():
                continue
            destination = backup_root / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)
        print(f"Backup written to {backup_root}")

    for relative in changed:
        target = root / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(outputs[relative])

    print("Blog text audit applied.")
    print("Next checks:")
    print("  npm run lint")
    print("  npm run test")
    print("  npm run build")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
