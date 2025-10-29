# SupportHaiti

SupportHaiti is a low-bandwidth-optimized disaster support MVP for Haiti, built with Next.js 14 and Prisma. The portal lets citizens submit assistance requests, view public updates, and optionally explore a dynamic Leaflet map while responders manage assignments.

## Quick start

```bash
pnpm install
cp .env.example .env
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

The app is available at http://localhost:3000.

### Demo credentials

* Admin: `admin@example.com` / `Admin!234`
* Responder: `responder@example.com` / `Responder!234`

### Features

* Mobile-first UI with Tailwind using system fonts only
* Lite Mode toggle with automatic suggestion for slow networks
* Dynamic Leaflet map with static fallback tile and cluster-ready markers
* Citizen request intake with Zod validation, file upload, and rate limiting
* WhatsApp intake stub with natural-language parser and localized acknowledgements
* Prisma data layer with SQLite for local demo and PostgreSQL readiness
* Internationalization dictionaries for Kreyòl Ayisyen, Français, and English
* Admin inbox view with role-protected access

### Lite Mode & languages

Use the header toggle or visit `/settings` (coming soon) to persist Lite Mode. Language preferences are stored in a cookie (`supporthaiti_lang`) and default to Kreyòl.

### Running tests and CI tooling

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
pnpm ci:bundle-budget
pnpm ci:lhci
```

Bundle budgets and Lighthouse performance (Slow 4G profile, score ≥ 80) are enforced in CI via GitHub Actions.

### Postgres & Docker

A Docker Compose file is provided for PostgreSQL:

```bash
docker-compose up -d
```

Update `DATABASE_URL` in `.env` to point at the container, then rerun Prisma migrations.

### WhatsApp provider integration

The `/api/intake/whatsapp` route accepts payloads with `from`, `body`, and `mediaUrl`. Hook it up to Twilio or Meta WhatsApp Business API by forwarding incoming webhooks to this endpoint. Requests created through the stub are tagged with `source = WHATSAPP`.

### Lighthouse & bundle budgets

Set `ANALYZE=true` before `pnpm build` to emit `.next/analyze/client.json`, then run `pnpm ci:bundle-budget`. Lighthouse CI configuration lives in `lighthouse.config.cjs` and checks `/` and `/requests` under Slow 4G conditions.

## License

MIT License
