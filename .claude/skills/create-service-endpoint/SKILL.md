# Create Service Endpoint

## Convention

Service functions live in `src/services/` grouped by domain:

```
src/services/
├── api.ts              # Base API client (shared)
├── api.test.ts         # Base API client tests
├── salesOrders.ts      # Sales order service functions
└── salesOrders.test.ts # Sales order service tests
```

## Service Function Pattern

```tsx
import { api } from "./api";
import type { SalesOrder, CreateSalesOrderInput } from "@/types";

export const createSalesOrder = async (
  data: CreateSalesOrderInput
): Promise<SalesOrder> => {
  return api.post<SalesOrder>("/sales-orders", data);
};

export const getSalesOrder = async (id: string): Promise<SalesOrder> => {
  return api.get<SalesOrder>(`/sales-orders/${id}`);
};
```

## Error Handling

The API client throws the error body for non-ok responses. Service consumers should catch and handle:

```tsx
import { isApiError } from "@/types";

try {
  const order = await createSalesOrder(data);
} catch (error) {
  if (isApiError(error)) {
    // Typed error from the API — has .error.code, .error.message, .error.fields
  }
  // Unexpected error
}
```

## Rules

- One service file per domain (e.g., `salesOrders.ts`, `products.ts`)
- Functions are `async` and return typed promises
- Use the shared `api` client — don't use `fetch` directly
- Input parameters should be typed (e.g., `CreateSalesOrderInput`)
- Write tests that mock the `api` client (see `create-test` skill)
