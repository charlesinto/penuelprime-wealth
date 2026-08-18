# Deployment Options

## Current Setup: Prisma + Node.js

The application currently uses Prisma ORM, which requires a Node.js runtime.

### ✅ Compatible Platforms

**Vercel** (Recommended)
```bash
npm i -g vercel
vercel
```

**Railway**
- Connect your GitHub repo
- Railway auto-detects and deploys

**Render**
- Build command: `npm run build`
- Start command: `node .output/server/index.mjs`

**VPS (DigitalOcean, AWS EC2, etc.)**
```bash
npm run build
node .output/server/index.mjs
```

### ❌ Incompatible Platforms

- **Cloudflare Workers** - Doesn't support Prisma (no Node.js runtime)
- **Cloudflare Pages** - Doesn't support Prisma
- **Deno Deploy** - Doesn't support Prisma

---

## Alternative: Supabase + Cloudflare Workers

If you need Cloudflare Workers specifically, switch back to Supabase:

1. Remove Prisma configuration from `vite.config.ts`
2. Revert to Supabase client in `src/lib/leads.functions.ts`
3. Supabase works on edge runtimes via HTTP API

---

## Alternative: Use Drizzle ORM

Drizzle is edge-compatible and works on Cloudflare Workers:

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

Use with Neon, PlanetScale, or Turso for edge-compatible PostgreSQL.
