# Project Conventions

## Architecture

This project follows a structured pattern for pages, components, and services.

### Pages

Pages live in `src/pages/{domain}/{PageName}/` with a View + Hook split:

- `{PageName}.tsx` — View component. Exports a named `View` (for testing with mock props) and a default export wired to the hook (for routing).
- `use{PageName}.ts` — Hook. Owns all state, data fetching, and handlers. Returns a typed object.
- `{PageName}.test.tsx` — View tests. Renders the `View` export with mock props.
- `use{PageName}.test.ts` — Hook tests. Mocks services via `vi.mock`.

### Components

Components live in `src/components/`:

- Named exports (not default)
- Props defined as a separate `interface` with JSDoc
- Tailwind for styling — no inline styles or CSS modules
- Test file alongside: `MyComponent.test.tsx`

### Services

Service functions live in `src/services/` grouped by domain:

- Use the shared `api` client from `api.ts` — don't use `fetch` directly
- Async functions returning typed promises
- Typed input parameters
- Test file alongside, mocking the `api` client

### Testing

- Vitest + @testing-library/react
- Test behaviour, not implementation
- Mock boundaries: views get mock props, hooks mock services, services mock the api client
- Use `screen.getByRole` / `getByText` over `getByTestId`
- Wrap routing-dependent components in `<MemoryRouter>` for tests
