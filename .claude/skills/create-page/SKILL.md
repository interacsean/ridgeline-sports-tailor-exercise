# Create Page

## Convention

Pages live in `src/pages/{domain}/{PageName}/` and follow this pattern:

```
src/pages/sales-orders/
├── SalesOrderList/
│   ├── SalesOrderList.tsx        # View component (renders UI)
│   ├── useSalesOrderList.ts      # Hook (state, handlers, data fetching)
│   ├── SalesOrderList.test.tsx   # View tests (mock the hook)
│   └── useSalesOrderList.test.ts # Hook tests (mock services)
```

## Page Component Pattern

Pages are split into a **View** component and a **hook**:

### Hook (`use{PageName}.ts`)

Owns all state, data fetching, and event handlers. Returns a typed object the View consumes.

```tsx
import { useState, useEffect } from "react";

export interface UseSalesOrderListReturn {
  orders: SalesOrder[];
  isLoading: boolean;
  error: string | null;
}

export const useSalesOrderList = (): UseSalesOrderListReturn => {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // data fetching, handlers, etc.

  return { orders, isLoading, error };
};
```

### View (`{PageName}.tsx`)

Pure rendering. Receives everything from the hook. Exported as `View` for testing and as a default export wired to the hook for routing.

```tsx
import { useSalesOrderList, type UseSalesOrderListReturn } from "./useSalesOrderList";

type SalesOrderListViewProps = UseSalesOrderListReturn;

export const View: FC<SalesOrderListViewProps> = ({ orders, isLoading, error }) => {
  // render UI
};

const SalesOrderList = () => {
  const props = useSalesOrderList();
  return <View {...props} />;
};

export default SalesOrderList;
```

## Why This Pattern

- **Testability**: View tests mock the hook, hook tests mock services. No integration complexity.
- **Separation of concerns**: UI logic stays out of rendering. Easy to refactor either side independently.
- **Readability**: New engineers can understand the page by reading the hook's return type.

## Rules

- One hook per page. If a page needs multiple data sources, the page hook should compose them.
- Register new pages in `App.tsx` router.
- Use the service layer (`src/services/`) for API calls — don't fetch directly in hooks.
