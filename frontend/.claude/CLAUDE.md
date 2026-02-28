# Frontend CLAUDE.md

## File-Based Routing

TanStack Router with auto-generated route tree from `src/routes/`. Routes are code-split automatically. `routeTree.gen.ts` is auto-generated — do not edit manually.

## Development Commands

```bash
npm run dev              # Vite dev server (hot reload)
npm run build            # Build for production
npm run preview          # Preview production build
# Note: Frontend testing not yet configured
```

## TypeScript

Uses standard React + Vite TypeScript setup.

## Environment Variables

Must prefix with `VITE_` to expose to client (e.g., `VITE_API_URL`).

## Key File Locations

- **Routes**: `src/routes/` (auto-generates `routeTree.gen.ts`)

## Production

Nginx serves static assets from Vite build on port 3000 with SPA routing configured.

## Resources
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Lucide Icons**: https://lucide.dev
- **OKLCH Color Picker**: https://oklch.com
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/