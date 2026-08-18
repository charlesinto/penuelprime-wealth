# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Penuel Prime Wealth Club is a landing page and lead capture platform for an investment wealth club. Built with TanStack Start (React SSR framework), TypeScript, Tailwind CSS, and Prisma ORM for database operations.

## Development Commands

```bash
# Install dependencies (uses npm, not pnpm despite pnpm-lock.yaml presence)
npm i

# Development server
npm run dev

# Build for production
npm run build

# Build for development (preserves dev features)
npm run build:dev

# Preview production build
npm run preview

# Linting
npm run lint

# Code formatting
npm run format

# Database commands
npm run db:generate        # Generate Prisma client
npm run db:migrate         # Create and apply migrations
npm run db:migrate:deploy  # Apply migrations (production)
```

## Architecture Overview

### Routing System

**File-based routing** via TanStack Start. Routes live in `src/routes/`:

- `__root.tsx` — App shell wrapping all pages; contains site header/footer layout
- `index.tsx` — Homepage
- `about.tsx`, `deals.tsx`, `team.tsx`, etc. — Top-level pages
- `$param.tsx` — Dynamic routes using `$` prefix (NOT `{id}` or `[id]`)
- `routeTree.gen.ts` — Auto-generated, never edit manually

Key routing notes:
- **Do NOT create** `src/pages/`, `_app/index.tsx`, or `app/layout.tsx` — those are Next.js conventions
- Route context includes `queryClient` for React Query integration
- See `src/routes/README.md` for detailed routing conventions

### Server-Side Architecture

**SSR error wrapper**: `src/server.ts` wraps TanStack Start's server entry to catch and properly display SSR errors. This prevents h3's generic JSON error responses from leaking to users.

**Server functions** (`*.functions.ts`):
- Use `createServerFn()` from `@tanstack/react-start`
- `src/lib/leads.functions.ts` handles contact and interest form submissions
- Server functions use Zod validation and Prisma ORM

**Important**: Server function files ship to the client bundle — never directly import `@/lib/prisma.server` at the top level. Use dynamic import inside the handler:
```typescript
const { prisma } = await import("@/lib/prisma.server");
```

### Database & Backend

**Prisma ORM** for PostgreSQL database:
- `src/lib/prisma.server.ts` — Prisma client singleton (server-side only)
- `prisma/schema.prisma` — Database schema and source of truth
- `prisma/migrations/` — Database migrations

Tables:
- `wealth_club_members` — Contact form submissions
- `interest_applications` — Express interest form submissions (tier-based signups)
- `contact_messages` — General contact inquiries

**Important**:
- Always use dynamic import for Prisma in server functions: `const { prisma } = await import("@/lib/prisma.server")`
- Run `npm run db:generate` after schema changes
- The app uses Node.js runtime (not Cloudflare edge) for Prisma compatibility

### UI Components

**shadcn/ui** components in `src/components/ui/`:
- Configured via `components.json`
- Style: "new-york"
- Tailwind CSS with CSS variables
- Import alias: `@/components/ui/*`

Custom components:
- `SiteChrome.tsx` — Site header and footer (used in `__root.tsx`)
- `ContactForm.tsx`, `ExpressInterestForm.tsx` — Form components with validation
- `FormField.tsx` — Reusable form field wrapper

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` maps to `src/*`

### Build Configuration

**Vite configuration** (`vite.config.ts`):
- Uses `@lovable.dev/vite-tanstack-config` preset
- Preset includes: TanStack Start, React, Tailwind, path aliases, Nitro
- Custom server entry: `src/server.ts` (SSR error wrapper)
- Nitro preset: `node-server` (for Prisma ORM compatibility)
- **Do NOT manually add** TanStack devtools, vite-react, tailwindcss plugins — they're in the preset

## Important Constraints

### Lovable Integration

This project is connected to Lovable (see `AGENTS.md`):
- **Never force-push, rebase, amend, or squash** commits already pushed to the connected branch
- Keep the branch in a working state — commits sync back to Lovable editor
- Lovable history rewrites break the project connection

### Runtime

- Uses Node.js runtime (via Nitro's `node-server` preset)
- Prisma ORM for database operations
- Server functions execute in Node.js environment

### TypeScript Strictness

`tsconfig.json` uses strict mode with additional safeguards:
- `noUncheckedIndexedAccess: true` — array/object access may be undefined
- `exactOptionalPropertyTypes: true` — `undefined` and missing are different
- `noImplicitReturns: true` — all code paths must return

## Form Validation Schemas

Located in `src/lib/leads.functions.ts`:

**Contact schema**:
- `fullName`, `email`, `phone`, `message`
- Includes honeypot field (`company`) for bot detection

**Interest schema**:
- `fullName`, `email`, `phone`, `tier`, `timeline`, `referralSource`
- Tier options: `tier_1`, `tier_2`, `tier_3`, `entry`
- Includes honeypot field

All schemas use Zod with custom error messages.

## Email Notifications

`notifyTeam()` function sends email via Resend API when forms are submitted:
- Requires `RESEND_API_KEY` and `TEAM_NOTIFICATION_EMAIL` environment variables
- Gracefully fails if not configured

## Mailchimp Integration

When an interest application is submitted, the contact is automatically added to Mailchimp:
- **Location**: `src/lib/mailchimp.server.ts`
- Automatically creates "Penuel Prime Wealth Club" audience if it doesn't exist
- Creates or updates contact in Mailchimp audience
- Adds "WealthClubMember" tag
- Stores tier, timeline, and referral source as merge fields
- Caches audience ID to avoid repeated API calls
- Gracefully fails if Mailchimp not configured (logs warning)
- **Required**: `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`
- **Optional**: `MAILCHIMP_AUDIENCE_ID` (auto-detected if not provided)

## Environment Variables

Required for full functionality:
- `DATABASE_URL` — PostgreSQL connection string
- `RESEND_API_KEY` — Optional, for email notifications
- `TEAM_NOTIFICATION_EMAIL` — Optional, recipient for notifications
- `MAILCHIMP_API_KEY` — Optional, Mailchimp API key for contact sync
- `MAILCHIMP_SERVER_PREFIX` — Optional, Mailchimp server prefix (e.g., "us1", "us2")
- `MAILCHIMP_AUDIENCE_ID` — Optional, Mailchimp audience/list ID (auto-detected if not set)

## Error Handling

**Client-side error boundaries**:
- Root error component in `__root.tsx` catches route-level errors
- Reports to Lovable error tracking via `src/lib/lovable-error-reporting.ts`

**Server-side error handling**:
- `src/server.ts` wraps TanStack Start entry
- Catches SSR errors and serves custom error page
- `src/lib/error-capture.ts` and `src/lib/error-page.ts` handle error state

## Code Style

**ESLint** configuration (`eslint.config.js`):
- TypeScript strict recommended rules
- React Hooks rules enforced
- Prettier integration
- No unused vars warning (disabled)
- Blocks `server-only` import (use `*.server.ts` naming instead)
