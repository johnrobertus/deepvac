# Deepvac blog text audit package

Target: `johnrobertus/deepvac`, branch `preview`

Audit date: 2026-07-23

## What this package contains

This package applies the complete text audit to:

* 22 generated bilingual blog articles in `part1.json` through `part5.json`
* 5 legacy bilingual articles
* the generated-article renderer
* the legacy-article wrapper
* SEO metadata
* article-level primary keywords and user questions
* technical reference blocks and JSON-LD citations
* applicability notes for standards and configuration-dependent product values

The package changes 14 repository files.

## Apply

Run the commands from any directory. Replace `/path/to/deepvac` with the root of the checked-out `preview` branch.

```bash
python3 apply_blog_text_audit.py --check --root /path/to/deepvac
python3 apply_blog_text_audit.py --apply --root /path/to/deepvac
python3 validate_blog_audit.py --root /path/to/deepvac
```

An optional backup can be written before applying:

```bash
python3 apply_blog_text_audit.py \
  --apply \
  --root /path/to/deepvac \
  --backup-dir /path/to/blog-audit-backup
```

The script does not run git, deployment or network commands.

## Repository checks after application

```bash
npm run lint
npm run test
npm run build
```

The build regenerates the sitemap, RSS feed and `llms.txt` from the revised article data.

## Review documents

* `audit/TECHNICAL_TEXT_AUDIT.md`: detailed audit record and article matrix
* `audit/patch-data.json`: explicit legacy and SEO text changes
* `audit/article-intents.csv`: primary keyword and primary question for every generated article
* `audit/article-sources.csv`: article-to-source mapping
* `audit/claim-ledger.csv`: verification status for standards, numerical claims and product values
* `audit/engineering-signoff.csv`: proprietary or project-specific items that still need internal Deepvac approval

## Important limitation

The available GitHub and Lovable connectors are read-only for repository content in this session. The files were therefore prepared as a deterministic apply package rather than pushed to the branch. The replacement TypeScript files passed syntax checking, and the apply process was tested on a synthetic repository fixture. A full production build still needs the complete repository checkout and installed dependencies.
