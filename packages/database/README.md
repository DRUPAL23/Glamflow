# @glamflow/database

Prisma/PostgreSQL persistence boundary for GLAMFLOW.

## Tenant isolation
Every workspace-owned resource carries `workspaceId`. API handlers must resolve the workspace from the authenticated user's membership before reading or mutating records. Never trust a client-supplied workspace ID without membership verification.

## Models
User, Workspace, Membership, SocialAccount, Content, PublishJob and AuditLog.

## Local database
Use the repository `docker-compose.yml` PostgreSQL service, then run:

```bash
npm install
npm run generate --workspace=@glamflow/database
npm run migrate --workspace=@glamflow/database
```
