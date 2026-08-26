# GLAMFLOW Architecture

## System boundaries

```text
Browser / Mobile Web
        |
     Next.js
        |
   API Gateway
   /         \
PostgreSQL   Redis
               |
             Worker
               |
        AI / Social APIs
```

## Core domains

1. Identity and multi-tenancy
2. Brand/workspace management
3. Content ideation and generation
4. Media assets
5. Social account connections
6. Publishing and scheduling
7. Analytics and attribution
8. Automation workflows
9. Billing and entitlements
10. Audit and observability

## Engineering principles

- Tenant isolation at every data and API boundary.
- Secrets remain server-side and are never committed.
- External integrations are adapter-based.
- Long-running work executes asynchronously through workers.
- APIs remain stateless where practical.
- Every production mutation should be auditable.
- Observability is a first-class concern: structured logs, metrics, traces, and health checks.
