# deepvac.space

Website der Deepvac GmbH. Vite, React 18, TypeScript, Tailwind, react-router und i18next (EN/DE). Jede Route wird beim Build mit Playwright vorgerendert (scripts/prerender.mjs) und von nginx auf einem Hetzner-Server als statisches HTML ausgeliefert. Formular-Backend: Supabase Edge Functions (send-inquiry, weekly-form-healthcheck), E-Mail über Resend, Bot-Schutz über Cloudflare Turnstile.

## Wie Änderungen live gehen

1. Änderungen entstehen in Lovable und landen auf dem Arbeitsbranch in GitHub.
2. Pull Request nach main öffnen. Die CI (.github/workflows/ci.yml) prüft Lint, Tests, Build und die fertige Ausgabe. Nur mit grünem Haken mergen.
3. Der Merge nach main startet .github/workflows/deploy-production.yml: Lint, Tests, Build mit Prerender, Prüfung von dist (npm run check:dist), Upload, Prüfung des Release auf dem Server, Umschalten des Symlinks current, Smoke-Test. Schlägt der Smoke-Test fehl, schaltet der Workflow automatisch auf das vorherige Release zurück und der Lauf wird rot.
4. Ausnahme: Supabase Edge Functions und Datenbank-Migrationen werden von Lovable sofort deployt, unabhängig vom Merge.

## Server

- /var/www/deepvac/releases/<commit>: die fünf neuesten Releases
- /var/www/deepvac/current: Symlink auf das aktive Release, von nginx ausgeliefert
- /var/www/deepvac/previous: Symlink auf das vorherige Release

### Manueller Rollback

Auf das vorherige Release:

```
ssh -p <PORT> <USER>@<HOST> 'cd /var/www/deepvac && ln -sfn "$(readlink -f previous)" current.tmp && mv -Tf current.tmp current'
```

Auf ein bestimmtes Release: `ls -1t /var/www/deepvac/releases` zeigt die vorhandenen Commits. Dann:

```
ssh -p <PORT> <USER>@<HOST> 'cd /var/www/deepvac && ln -sfn /var/www/deepvac/releases/<commit> current.tmp && mv -Tf current.tmp current'
```

Danach prüfen: `curl -fsS https://deepvac.space/healthz` liefert `ok`.

## nginx

Die Server-Konfiguration liegt in infra/nginx/deepvac.conf und wird manuell ausgerollt. Die Schritte, Prüfbefehle und der Rückweg stehen im Kopf der Datei. Änderungen immer zuerst im Repository, dann auf dem Server.

## Prüfungen lokal

```
npm install --legacy-peer-deps
npm run lint
npm test
npm run build
npm run check:dist
```

- npm test: Übersetzungen EN/DE vollständig, Routentabelle konsistent mit Seiten, Blog und Optionen, Meta-Beschreibungen vorhanden.
- npm run check:dist: prüft die vorgerenderten Seiten (Titel, Beschreibung, Canonical, hreflang, Sprache, JSON-LD, keine doppelten Head-Tags, Sitemaps, 404-Seiten).

## Neue Seiten

Jede Route gehört in src/lib/route-map.json (EN- und DE-Pfad, seoKey, Sitemap-Gruppe). Daraus entstehen Routing-Hilfen, hreflang, Sitemaps und das Prerendering. Titel und Beschreibung stehen in src/i18n/locales/<lang>/seo.json. Beschreibungen haben 120 bis 155 Zeichen.

## Monitoring

- https://deepvac.space/healthz liefert `ok` (Smoke-Test nach jedem Deploy).
- weekly-form-healthcheck schickt einmal pro Woche eine Testanfrage durch das Formular-Backend.
- Anfrage-Log: Tabelle inquiry_logs in Supabase. Einträge werden nach 30 Tagen automatisch gelöscht (pg_cron-Job purge-inquiry-logs-30d).
- Analytics: Plausible, nur auf deepvac.space aktiv.
