# GLAMFLOW

AI-powered social content and growth platform.

## Foundation

This repository is the production-oriented monorepo foundation for GLAMFLOW. It is designed for AI-assisted content creation, social publishing workflows, analytics, automation, and future multi-tenant SaaS capabilities.

## Architecture

- `apps/web` — Next.js web application
- `apps/api` — API service boundary
- `apps/worker` — asynchronous jobs and automation workers
- `packages/ui` — shared UI primitives
- `packages/config` — shared configuration and TypeScript settings
- `packages/database` — database boundary
- `packages/ai` — AI provider boundary
- `infrastructure` — Docker, Kubernetes, and deployment configuration
- `.github/workflows` — CI/CD automation
- `docs` — architecture and product documentation

## Development

Requirements: Node.js 22+, npm 10+, Docker.

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and provide the required values. Never commit credentials, tokens, or production secrets.

## License

Proprietary — Equinvestment / GLAMFLOW.
