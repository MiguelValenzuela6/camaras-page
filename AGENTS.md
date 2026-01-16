# AGENTS.md - Development Guidelines for Camaras Project

This file contains essential information for AI coding agents working on the Camaras project. It includes build/lint/test commands, code style guidelines, and development conventions.

## Project Structure

This is a Turborepo monorepo with the following packages:

- `apps/web`: Next.js frontend application
- `apps/backend-worker`: Backend worker service
- `packages/ui`: Shared React component library
- `packages/api`: API service layer
- `packages/s3`: S3 utilities
- `packages/typescript-config`: Shared TypeScript configurations

## Build/Lint/Test Commands

### Global Commands (run from project root)

```bash
# Build all packages/apps
bun run build
# or
turbo build

# Run development servers
bun run dev
# or
turbo dev

# Lint all packages
bun run lint
# or
oxlint

# Type checking across all packages
bun run check-types
# or
turbo check-types

# Generate environment variables (if needed)
bun run envs
# or
turbo envs
```

### Package-Specific Commands

#### Web App (`apps/web`)

```bash
# Development
cd apps/web && bun run dev

# Build
cd apps/web && bun run build

# Start production
cd apps/web && bun run start

# Lint (Next.js linting)
cd apps/web && bun run lint
```

#### UI Package (`packages/ui`)

```bash
# Lint
cd packages/ui && bun run lint

# Type checking
cd packages/ui && bun run check-types

# Generate new component
cd packages/ui && bun run generate:component

# Add shadcn component
cd packages/ui && bun run shadcn
```

#### API Package (`packages/api`)

```bash
# Type checking
cd packages/api && bun run check-types

# Note: No test command configured yet
```

### Testing

**Note**: No testing framework is currently configured. When adding tests:

1. Choose a testing framework (Jest, Vitest recommended for this stack)
2. Add test scripts to individual package.json files
3. Configure test runners in turbo.json
4. Add test command to root package.json

Example for running single tests (once configured):

```bash
# Run all tests
bun run test

# Run tests for specific package
bun run test --filter @camaras/ui

# Run single test file
bun run test path/to/test.spec.ts
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled**: All packages use `strict: true`
- **Target**: ES2022
- **Module resolution**: NodeNext
- **JSX**: React JSX (for React packages)
- **No unchecked indexed access**: `noUncheckedIndexedAccess: true`

### Import Conventions

```typescript
// External imports first
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

// Internal imports (use absolute paths with workspace prefixes)
import { cn } from "@camaras/ui/src/lib/utils";

// Relative imports (avoid when possible)
import { Button } from "../components/button";
```

### Naming Conventions

#### Components

- Use PascalCase for component names
- Use `displayName` for forwarded components
- Props interfaces: `ComponentNameProps`
- Variant functions: `componentNameVariants`

```typescript
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // implementation
  },
);
Button.displayName = "Button";
```

#### Files and Folders

- Components: `component-name.tsx`
- Utilities: `utils.ts`
- Services: `service-name.service.ts`
- Routes: `route-name.route.ts`
- Hooks: `use-hook-name.tsx`

#### Variables and Functions

- camelCase for variables and functions
- PascalCase for types, interfaces, enums
- SCREAMING_SNAKE_CASE for constants

### Component Patterns

#### Using class-variance-authority (CVA)

```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-styles",
      destructive: "destructive-styles",
    },
    size: {
      default: "default-size",
      sm: "small-size",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

#### Utility Function for Class Names

Always use the `cn` utility for conditional classes:

```typescript
import { cn } from "@camaras/ui/src/lib/utils"

className={cn(buttonVariants({ variant, size, className }))}
```

### Error Handling

#### Frontend Components

```typescript
"use client"

function MyComponent() {
  const [error, setError] = React.useState<string | null>(null)

  // Handle errors gracefully
  if (error) {
    return <div className="error-message">{error}</div>
  }

  return <div>Content</div>
}
```

#### Backend Services

```typescript
export class UsersService {
  async getUsers() {
    try {
      // operation
      return { users: data };
    } catch (error) {
      console.error("Error in getUsers:", error);
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
}
```

### Formatting and Linting

#### Biome Configuration

- **Indentation**: 2 spaces
- **Line width**: 80 characters
- **Quote style**: Double quotes
- **Import organization**: Enabled
- **Recommended rules**: Enabled
- **A11y rules**: Enabled (except `useKeyWithClickEvents`)

#### Oxlint Configuration

- **Plugins**: import, typescript, unicorn, eslint-plugin-next, eslint-plugin-react, eslint-plugin-react-hooks
- **Custom rules**:
  - `eqeqeq`: warn (prefer === and !==)
  - `import/no-cycle`: error (prevent circular imports)
- **Test file overrides**: Relaxed rules for test files

### React Best Practices

#### Hooks

```typescript
// Custom hooks in separate files
export function useMobile() {
  // implementation
}
```

#### Component Structure

```typescript
"use client"; // Add for client components

import * as React from "react";
// imports...

export interface ComponentProps {
  // props
}

export function Component({ prop }: ComponentProps) {
  // implementation
}
```

#### Data Fetching

- Use React Query (TanStack Query) for server state
- Use Zustand for client state management
- Avoid prop drilling with context when appropriate

### Styling

#### Tailwind CSS

- Use utility-first approach
- Leverage design tokens and consistent spacing
- Custom variants for component states
- Responsive design with mobile-first approach

#### CSS-in-JS

- Use class-variance-authority for component variants
- Avoid inline styles except for dynamic values
- Consistent naming for custom CSS classes

### API Design

#### Elysia.js Patterns

```typescript
// Route definitions
export const usersRoute = new Elysia()
  .get("/users", async () => {
    const service = new UsersService();
    return await service.getUsers();
  })
  .post("/users", async ({ body }) => {
    // implementation
  });
```

#### Type Safety

- Use TypeBox for runtime type validation
- Define schemas for request/response types
- Leverage TypeScript for compile-time safety

### Environment Variables

- Use `.env.local` for local development
- Prefix with service/app name when needed
- Never commit secrets or sensitive data
- Use `turbo envs` command to check environment setup

### Git Workflow

#### Commit Messages

Follow conventional commit format:

```
feat: add user authentication
fix: resolve button click handler bug
docs: update API documentation
refactor: simplify component logic
```

#### Branching

- Use feature branches for new work
- Keep commits focused and atomic
- Run lint and type checks before committing

### Development Workflow

1. **Setup**: Run `bun install` in project root
2. **Development**: Use `bun run dev` to start development servers
3. **Testing**: Run tests if available (not currently configured)
4. **Linting**: Run `bun run lint` before committing
5. **Type checking**: Run `bun run check-types` to verify types
6. **Building**: Run `bun run build` to ensure everything compiles

### Performance Considerations

- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting
- Use virtualization for large lists
- Implement proper error boundaries

### Security

- Validate all user inputs
- Use HTTPS in production
- Implement proper authentication/authorization
- Avoid exposing sensitive data in client code
- Use environment variables for secrets

---

This document should be updated as the project evolves. When adding new tools, frameworks, or conventions, please update this file accordingly.</content>
<parameter name="filePath">D:\dev\camaras-page\AGENTS.md
