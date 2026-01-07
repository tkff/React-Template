# React Web Template

A production-ready React template with TypeScript, Vite, and a modern development stack.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Available Scripts

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Start development server at http://localhost:3000 |
| `pnpm build`        | Build for production                              |
| `pnpm preview`      | Preview production build locally                  |
| `pnpm test`         | Run unit tests once                               |
| `pnpm test:watch`   | Run tests in watch mode                           |
| `pnpm coverage`     | Run tests with coverage report                    |
| `pnpm lint`         | Lint code with ESLint                             |
| `pnpm lint:fix`     | Fix linting issues automatically                  |
| `pnpm format`       | Format code with Prettier                         |
| `pnpm format:check` | Check code formatting                             |
| `pnpm typecheck`    | Type-check with TypeScript                        |

## Tech Stack

### Core

- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool with HMR

### Routing & Data

- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client

### Forms & Validation

- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### State Management

- **Zustand** - Lightweight state management

### Styling

- **Tailwind CSS** - Utility-first CSS framework

### Testing

- **Vitest** - Unit testing framework
- **Testing Library** - React component testing

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting

## Project Structure

```
src/
├── app/                    # Application setup
│   ├── providers/          # React Query, Router providers
│   ├── routes/             # Route definitions
│   ├── store/              # Global Zustand stores
│   ├── styles/             # Global CSS, Tailwind entry
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
│
├── pages/                  # Route-level page components
│   ├── Home/
│   ├── ExampleForm/
│   └── NotFound/
│
├── features/               # Feature modules (domain logic)
│   └── [feature]/
│       ├── api/            # API calls and React Query hooks
│       ├── ui/             # Feature-specific components
│       ├── model/          # Types and business logic
│       └── hooks/          # Custom hooks
│
├── shared/                 # Shared/reusable code
│   ├── api/                # Axios instance, interceptors
│   ├── lib/                # Utility functions
│   ├── ui/                 # Reusable UI components
│   │   ├── components/     # Button, Input, etc.
│   │   └── layouts/        # Layout components
│   └── types/              # Shared TypeScript types
│
├── tests/                  # Test utilities and setup
│   ├── setup.ts            # Vitest setup
│   └── utils.tsx           # Test render helpers
│
└── assets/                 # Static assets
```

## Path Aliases

Use `@/` to import from the `src` directory:

```tsx
import { Button } from '@/shared/ui';
import { useUIStore } from '@/app/store/ui-store';
```

## Optional Tools

The following tools are scaffolded but not installed by default. Enable them as needed:

### Husky + Commitlint (Git Hooks)

Enforce conventional commits and run pre-commit checks.

```bash
pnpm add -D husky @commitlint/cli @commitlint/config-conventional lint-staged
pnpm prepare
```

### Bundle Analyzer

Analyze bundle size after build.

```bash
pnpm add -D rollup-plugin-visualizer
pnpm analyze
```

### Playwright (E2E Testing)

Run end-to-end tests across browsers.

```bash
pnpm add -D @playwright/test
npx playwright install
pnpm e2e
pnpm e2e:ui  # Interactive UI mode
```

### Storybook (Component Development)

Develop and document UI components in isolation.

```bash
pnpm add -D @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/blocks storybook
pnpm storybook
```

### Convex (Backend-as-a-Service)

Real-time database with serverless functions.

```bash
pnpm add convex
pnpm convex:dev
```

This will prompt you to log in and create a Convex project. The `convex/` directory contains example schema and functions. See `convex/README.md` for usage details.

## Environment Variables

Create a `.env` file (optional) for environment-specific settings:

```env
# API base URL (defaults to /api if not set)
VITE_API_BASE_URL=https://api.example.com

# Convex (set automatically by `npx convex dev`)
# VITE_CONVEX_URL=https://your-project.convex.cloud
```

All variables must be prefixed with `VITE_` to be exposed to the client.

## VS Code Setup

Recommended extensions are configured in `.vscode/extensions.json`. Install them for the best experience:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Playwright (optional)

## License

MIT
