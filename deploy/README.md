# GLAMFLOW deployment

This deployment target is a Linux VPS with Docker Engine, Docker Compose v2, curl, and an SSH account allowed to run Docker.

## Server preparation

Create separate directories for staging and production, for example /opt/glamflow-staging and /opt/glamflow-production. In each directory, create a .env file readable only by the deployment account:

```dotenv
POSTGRES_DB=glamflow
POSTGRES_USER=glamflow
POSTGRES_PASSWORD=replace-with-a-long-random-secret
NEXT_PUBLIC_API_URL=/api
```

Do not commit this file. Ensure the directory is owned by the deployment account. The workflow copies deploy/compose.yml into that directory.

The Compose file binds web/API ports to loopback only. Configure a host reverse proxy (Nginx, Caddy, or Traefik) with TLS and route the public hostname to 127.0.0.1:3000. If the frontend needs API requests, configure the reverse proxy to route the relevant API path to 127.0.0.1:4000; confirm the frontend's API base URL before exposing it.

## GitHub environments and secrets

Create GitHub environments named staging and production. Add these environment-specific secrets:

- STAGING_HOST / PRODUCTION_HOST: VPS hostname or IP
- STAGING_USER / PRODUCTION_USER: SSH deployment user
- STAGING_SSH_KEY / PRODUCTION_SSH_KEY: private SSH key
- STAGING_APP_DIR / PRODUCTION_APP_DIR: absolute server directory

Add repository or environment secrets:

- GHCR_USERNAME: GitHub account/package reader
- GHCR_TOKEN: token with read access to the private GHCR packages

Set the production environment to require reviewer approval. Restrict deployment branches to main where supported.

## Release flow

- A successful CI run on main triggers staging deployment.
- Production is manually dispatched with the full 40-character SHA of a release whose images exist in GHCR.
- Deployments use SHA-tagged images, not latest.
- The API /ready endpoint is polled after Compose starts.

## Rollback

Run the relevant deployment workflow again with the previous known-good full commit SHA. Keep the corresponding GHCR images available. Database schema changes are not automatically migrated by this workflow; add a reviewed migration job before introducing production schema changes.

## Current application caveat

The API currently reports process readiness at /ready; it does not yet verify PostgreSQL/Redis connectivity in that handler. The Compose health check therefore confirms the API process is responding, not full dependency readiness. Validate the actual API/worker persistence behavior before treating this as a complete production rollout.
