# kre8

A modern, production-ready full-stack boilerplate. Batteries included, opinions included, BS excluded.

## Stack

- **[Bun](https://bun.sh)** — runtime, package manager, and test runner
- **[TanStack Start](https://tanstack.com/start)** — full-stack React framework with SSR
- **[React 19](https://react.dev)** — UI library
- **[Convex](https://convex.dev)** — backend and database
- **[Better Auth](https://better-auth.com/)** — authentication
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling
- **[shadcn/ui](https://ui.shadcn.com)** — component library
- **[Base UI](https://base-ui.com)** — unstyled accessible primitives
- **[Docker](https://docker.com)** — containerized deployment
- **[OXC](https://oxc.rs/)** — linting and formatting

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+
- [Docker](https://docker.com) (optional, for containerized dev/prod)
- A [Convex](https://convex.dev) account

### 1. Clone and install

```bash
git clone https://github.com/zougari47/kre8
cd kre8
bun install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your values in `.env`:

```bash
PORT=3000
CONVEX_URL=your_convex_url_here
```

### 3. Run

**Without Docker:**

```bash
bun run dev
```

**With Docker:**

```bash
docker compose up dev
```

Both options give you hot reload at `http://localhost:3000`.

## Deployment

This boilerplate is designed to be deployed with Docker.

### Build the production image

```bash
docker compose up --build
```

> For other deployment targets (Vercel, Netlify, Railway) see the [Deployment Guide](./docs/deployment.md) — coming soon.

## Project Structure

```
kre8/
├── convex/              # Backend — functions, schema, and queries
└── src/
    ├── components/
    │   └── ui/          # shadcn/ui + Base UI components (50+ components)
    ├── hooks/           # Shared React hooks
    ├── lib/             # Utilities and helpers
    ├── routes/          # Pages (TanStack Start file-based routing)
    └── styles/          # Global styles
```

## Contributing

This is a boilerplate, so keep things lean. If you're adding something, ask yourself: "would every project using this need it?" If not, leave it out.

Commits follow the [Conventional Commits](https://www.conventionalcommits.org) spec, enforced via Husky. Your commit will be rejected if it doesn't follow the format — `feat: add something`, `fix: broken thing`, etc.

## License

MIT
