# Tag commuter network

Tag helps people who already share a route find one another, coordinate recurring rides privately, and keep backup matches available when plans change.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/tag-commuter-network/src/App.tsx` — frontend-only Tag experience, local persistence, demo matching data, and product flows.
- `artifacts/tag-commuter-network/src/index.css` — Tag's visual system and responsive layout rules.
- `artifacts/tag-commuter-network/vite.config.ts` — Vite entry and artifact routing.
- `artifacts/api-server/` — shared API scaffold; Tag's current demo does not require server endpoints.

## Architecture decisions

- The first release remains frontend-only so the full commuter journey can be experienced without account or backend setup.
- Demo commute data is fictional and localStorage-backed; it is intentionally separate from any real personal contact data.
- The public landing page and in-app experience share the same Tag commuter visual language but use different density levels for discovery versus task completion.
- Exact addresses and phone numbers are never part of the matching model; the product uses approximate areas and mutual sharing states.

## Product

- Public landing page explaining Tag's value proposition and privacy model.
- Rider/driver onboarding for recurring routes, timing, days, frequency, and seats.
- Route match discovery, compatibility details, connection requests, and demo acceptance.
- Connected commute management, repeat-ride feedback, recurring commute setup, and backup matches.
- Activity timeline, profile, safety center, invite sharing, founding tester signup, loading/empty/error states, and founder metrics.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
