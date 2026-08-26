# AGENTS.md

Agent instructions for this TypeScript Express template.

## Quick Start

- Install: npm install
- Dev server: npm run dev
- Typecheck: npm run typecheck
- Lint (auto-fix): npm run lint
- Build: npm run build
- Run compiled app: npm start

Primary reference: [README.md](README.md)

## Project Shape

- Entrypoint: [src/index.ts](src/index.ts)
- Validation middleware: [src/utils/validate.ts](src/utils/validate.ts)
- Route modules: [src/routes](src/routes)
- Controllers: [src/controllers](src/controllers)
- Services: [src/services](src/services)
- Models and Zod schemas: [src/models](src/models)
- Environment config: [src/config/index.ts](src/config/index.ts)

Request flow:

1. Route declares endpoint + validation middleware.
2. Controller reads validated inputs and maps service outcomes to HTTP
   responses.
3. Service performs business logic on in-memory arrays.
4. Schema files remain source of truth for runtime input validation.

## Conventions To Follow

- Preserve the entity file pattern used by user/teacher/class/rubrica:
  - entity.model.ts
  - entity.schema.ts
  - entity.service.ts
  - entity.controller.ts
  - entity.routes.ts
- Keep controllers thin. Put data mutation and lookup logic in services.
- Apply validate middleware in routes for params/body/query before controller
  handlers.
- Keep create and update schemas separate; update schemas should allow partial
  updates.
- Keep API mount style consistent: route files export a Router mounted under
  /api by [src/index.ts](src/index.ts).
- Maintain strict TypeScript compatibility with [tsconfig.json](tsconfig.json).

## Known Pitfalls

- Data is in-memory only (no DB): state resets on restart and IDs reinitialize
  in services.
- Test script is currently a placeholder in [package.json](package.json); do not
  assume a test suite exists.
- Logger utility exists at [src/utils/logger.ts](src/utils/logger.ts) but may
  not be wired into controllers/services.
- Validation errors are standardized by
  [src/utils/validate.ts](src/utils/validate.ts); preserve this response shape
  unless explicitly changing API contract.

## Fast Implementation Pattern For New Entities

1. Copy the user pattern from
   [src/models/user.model.ts](src/models/user.model.ts),
   [src/models/user.schema.ts](src/models/user.schema.ts),
   [src/services/user.service.ts](src/services/user.service.ts),
   [src/controllers/user.controller.ts](src/controllers/user.controller.ts), and
   [src/routes/user.routes.ts](src/routes/user.routes.ts).
2. Rename symbols and adjust field definitions and Zod rules.
3. Register the new router in [src/index.ts](src/index.ts) under /api.
4. Run npm run typecheck and npm run lint.

## Session-History Note

Available local session history for this workspace is minimal, so no recurring
friction pattern could be confidently inferred yet.

To improve these instructions over time based on real usage, run: /chronicle
improve
