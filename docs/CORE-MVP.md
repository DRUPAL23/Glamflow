# GLAMFLOW Core MVP

## Implemented
- Workspace domain with a default demo workspace.
- Content draft creation and listing.
- Content lifecycle fields: `draft` and `scheduled`.
- Scheduling creates a publish job in the in-memory queue.
- API health/readiness endpoints.
- Dashboard for creating and viewing content.

## API
- `GET /health`
- `GET /ready`
- `GET /api/workspaces`
- `POST /api/workspaces` `{ "name": "Brand" }`
- `GET /api/content?workspaceId=<id>`
- `POST /api/content` `{ "title": "...", "body": "...", "platform": "instagram" }`
- `POST /api/content/:id/schedule` `{ "scheduledAt": "2026-09-01T10:00:00Z" }`
- `GET /api/jobs`

## Production hardening next
Replace the in-memory domain store with PostgreSQL/Prisma, add authentication and tenant isolation, Redis-backed jobs, OAuth integrations, media storage, idempotent publishing, rate limiting, audit logging and automated integration tests.
