# [FE-142] Implement Create Sales Order Form

**Priority**: High
**Assignee**: [You]
**Labels**: `feature`, `sales-orders`, `console`

## Description

We need to add the ability to create new Sales Orders from the Sales Orders page in Console. A Figma design has been provided for the form layout.

The Sales Orders listing page already exists at `/sales-orders`.

The API endpoint is accessible on https://sales-order-mock-api.ridgeline-sports-tailor.workers.dev (no auth, this is our test environment).

## Acceptance Criteria

- [ ] "Create Sales Order" button navigates to a create form
- [ ] Form matches the provided Figma design
- [ ] User can add line items with product selection, quantity, and pricing
- [ ] Form submits to `POST /sales-orders/` via the existing service layer
- [ ] On success: redirect to `/sales-orders/:id` and show a success toast
- [ ] On error: display meaningful error feedback to the user
- [ ] Products are fetched from `GET /products/` for selection

## Technical Notes

- See `API_DOCS.md` for endpoint documentation
- The service layer in `services/salesOrders.ts` is already bootstrapped
- Base components are available in `components/` — use and extend as needed

## Design

[Link to Figma file]
