# Sales Order Exercise

## Getting Started

```bash
# Install dependencies
npm install

# Set the API base URL (you'll receive this separately)
cp .env.example .env

# Start the dev server
npm run dev

# Run tests
npm test
```

## The Exercise

See **[ISSUE.md](./ISSUE.md)** for the full brief.

**TL;DR**: Implement the "Create Sales Order" form using the provided Figma design, wire it to the API, and handle success/error flows.

## What's Here

- **React + TypeScript** with Vite, Tailwind, react-router, vitest
- **`src/components/`** — Base components (`Button`, `Heading`, `FormItem`, `Select`, `DatePicker`, `LoadingSpinner`, `ToastAlert`)
- **`src/pages/sales-orders/`** — Sales Order list and detail pages (View + Hook pattern)
- **`src/services/`** — API client and service layer (bootstrapped with endpoints)
- **`src/types/`** — TypeScript type definitions
- **`API_DOCS.md`** — API endpoint documentation
- **`.claude/skills/`** and **`.codex/`** — Project conventions for AI assistants

## Project Conventions

Pages follow a **View + Hook** pattern — see `.claude/skills/create-page/SKILL.md` or `.codex/instructions.md` for details.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run tests (watch mode) |
| `npm run test:run` | Run tests once |
| `npm run type-check` | TypeScript type checking |
