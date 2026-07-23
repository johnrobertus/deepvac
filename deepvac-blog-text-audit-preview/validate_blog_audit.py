#!/usr/bin/env python3
"""Validate the audited Deepvac blog content after applying the package."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--root",
        type=Path,
        default=Path.cwd(),
        help="repository root or the package files directory",
    )
    return parser.parse_args()


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def words(value: Any) -> int:
    text = json.dumps(value, ensure_ascii=False)
    return len(re.findall(r"\b[\wÀ-ÿ°µ²³⁻×≤≥]+\b", text))


def main() -> int:
    root = parse_args().root.resolve()
    content_dir = root / "src/content/blog"

    posts: list[dict[str, Any]] = []
    errors: list[str] = []

    for index in range(1, 6):
        path = content_dir / f"part{index}.json"
        if not path.exists():
            errors.append(f"missing {path}")
            continue
        value = read_json(path)
        if not isinstance(value, list):
            errors.append(f"{path} is not a JSON array")
            continue
        posts.extend(value)

    if len(posts) != 22:
        errors.append(f"expected 22 generated posts, found {len(posts)}")

    keys = [post.get("articleKey") for post in posts]
    if len(keys) != len(set(keys)):
        errors.append("duplicate articleKey values")

    for slug_field in ("enSlug", "deSlug"):
        slugs = [post.get(slug_field) for post in posts]
        if len(slugs) != len(set(slugs)):
            errors.append(f"duplicate {slug_field} values")

    legacy_path = content_dir / "legacy.json"
    legacy = read_json(legacy_path) if legacy_path.exists() else []
    legacy_keys = {item.get("articleKey") for item in legacy}
    known_keys = set(keys) | legacy_keys

    sales_terms = [
        "our engineering team",
        "unser engineering-team",
        "talk to us",
        "sprechen sie mit uns",
        "our questionnaire",
        "unser fragebogen",
    ]
    sales_count = 0

    for post in posts:
        key = post.get("articleKey", "<missing>")
        serialized = json.dumps(post, ensure_ascii=False)

        if "\u2014" in serialized:
            errors.append(f"{key}: em dash remains")
        if post.get("dateModified") != "2026-07-23":
            errors.append(f"{key}: dateModified is not 2026-07-23")

        intent = post.get("searchIntent")
        for language in ("en", "de"):
            if not isinstance(intent, dict) or not isinstance(intent.get(language), dict):
                errors.append(f"{key}: missing {language} search intent")
                continue
            if not intent[language].get("primaryKeyword"):
                errors.append(f"{key}: empty {language} primary keyword")
            if not intent[language].get("primaryQuestion"):
                errors.append(f"{key}: empty {language} primary question")

        references = post.get("references")
        if not isinstance(references, list) or len(references) < 2:
            errors.append(f"{key}: too few technical references")
        else:
            for reference in references:
                if not all(reference.get(field) for field in ("title", "publisher", "url")):
                    errors.append(f"{key}: incomplete reference")
                if not str(reference.get("url", "")).startswith("https://"):
                    errors.append(f"{key}: reference does not use HTTPS")

        for related in post.get("relatedArticles", []):
            if related not in known_keys:
                errors.append(f"{key}: unresolved related article {related}")

        lowered = serialized.lower()
        sales_count += sum(lowered.count(term) for term in sales_terms)

    standards = next(
        (post for post in posts if post.get("articleKey") == "ecssStandardsOverview"),
        None,
    )
    if not standards:
        errors.append("missing ecssStandardsOverview")
    else:
        text = json.dumps(standards, ensure_ascii=False)
        for required in (
            "ECSS-E-ST-10-03C Rev.1",
            "GSFC-STD-7000B",
            "SMC-S-016",
            "cancelled",
            "zurückgezogen",
        ):
            if required not in text:
                errors.append(f"ecssStandardsOverview: missing status phrase {required}")

    if sales_count > 6:
        errors.append(
            f"generated content still contains {sales_count} direct sales phrases"
        )

    total_en = sum(words(post.get("en", {})) for post in posts)
    total_de = sum(words(post.get("de", {})) for post in posts)

    if errors:
        print("Blog audit validation failed:")
        for error in errors:
            print(f"  * {error}")
        return 1

    print("Blog audit validation passed")
    print(f"Generated articles: {len(posts)}")
    print(f"Legacy articles: {len(legacy)}")
    print(f"English content words: {total_en}")
    print(f"German content words: {total_de}")
    print(f"Direct sales phrases in generated content: {sales_count}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
