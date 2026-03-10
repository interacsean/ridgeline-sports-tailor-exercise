# Create Component

## Convention

Components live in `src/components/` and follow this pattern:

```
src/components/
├── MyComponent.tsx
└── MyComponent.test.tsx
```

## Component Pattern

```tsx
import { type FC } from "react";

interface MyComponentProps {
  /** Brief description of the prop */
  label: string;
  /** Optional props should have defaults or be clearly optional */
  variant?: "default" | "primary" | "danger";
  children?: React.ReactNode;
}

export const MyComponent: FC<MyComponentProps> = ({
  label,
  variant = "default",
  children,
}) => {
  return (
    <div className="...">
      {/* implementation */}
    </div>
  );
};
```

## Rules

- Export named components (not default exports)
- Define props as a separate `interface` above the component, with JSDoc comments on each prop
- Use Tailwind utility classes for styling — no inline styles or CSS modules
- Compose from existing components in `src/components/` where possible
- Keep components focused — if it does two things, split it
- Include a test file that renders the component and asserts key behaviour (see `create-test` skill)
