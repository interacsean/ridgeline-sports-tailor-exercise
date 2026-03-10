# Create Test

## Convention

Tests live alongside the file they test:

```
MyComponent.tsx       → MyComponent.test.tsx
useSalesOrderList.ts  → useSalesOrderList.test.ts
salesOrders.ts        → salesOrders.test.ts
```

## Test Runner

This project uses **vitest** with `@testing-library/react` for component tests and `renderHook` for hook tests.

## Component Tests

Mock the page hook (if testing a View), render the component, assert on output:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { View } from "./SalesOrderList";

describe("SalesOrderList View", () => {
  it("renders a list of orders", () => {
    render(
      <MemoryRouter>
        <View
          orders={[{ id: "1", orderNumber: "SO-001", customerName: "Acme" }]}
          isLoading={false}
          error={null}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("SO-001")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <MemoryRouter>
        <View orders={[]} isLoading={true} error={null} />
      </MemoryRouter>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
```

## Hook Tests

Mock the service layer, test state transitions:

```tsx
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useSalesOrderList } from "./useSalesOrderList";
import * as salesOrdersService from "@/services/salesOrders";

vi.mock("@/services/salesOrders");

describe("useSalesOrderList", () => {
  it("fetches orders on mount", async () => {
    vi.mocked(salesOrdersService.getSalesOrders).mockResolvedValue([
      { id: "1", orderNumber: "SO-001" },
    ]);

    const { result } = renderHook(() => useSalesOrderList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.orders).toHaveLength(1);
  });
});
```

## Service Tests

Mock the base `api` client:

```tsx
import { describe, it, expect, vi } from "vitest";
import { getSalesOrder } from "./salesOrders";
import { api } from "./api";

vi.mock("./api");

describe("getSalesOrder", () => {
  it("calls the correct endpoint", async () => {
    vi.mocked(api.get).mockResolvedValue({ id: "1", orderNumber: "SO-001" });

    const result = await getSalesOrder("1");
    expect(api.get).toHaveBeenCalledWith("/sales-orders/1");
    expect(result.id).toBe("1");
  });
});
```

## Mock Boundaries

- **View tests** → mock the hook (pass props directly to `View`)
- **Hook tests** → mock the service layer (`vi.mock("@/services/...")`)
- **Service tests** → mock the api client (`vi.mock("./api")`)

## Rules

- Test **behaviour**, not implementation details
- Use `screen.getByRole` / `getByText` over `getByTestId` where possible
- Each test should be independent — no shared mutable state between tests
- Wrap components that use `<Link>` or routing in `<MemoryRouter>`
