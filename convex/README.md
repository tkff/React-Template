# Convex Backend

This directory contains Convex backend scaffolding.

## Enable Convex

1. Install Convex:

```bash
pnpm add convex
```

2. Initialize your Convex project:

```bash
npx convex dev
```

This will prompt you to log in and create a new project.

3. The example files in this directory provide a starting point:
   - `schema.ts` - Database schema definition
   - `tasks.ts` - Example query and mutation functions

## Usage

After setup, import and use Convex in your React components:

```tsx
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

function MyComponent() {
  const tasks = useQuery(api.tasks.list);
  const addTask = useMutation(api.tasks.create);

  // ...
}
```

## Documentation

- [Convex Docs](https://docs.convex.dev/)
- [React Quickstart](https://docs.convex.dev/quickstart/react)
