# Sales Order API

Base URL: configured via `VITE_API_BASE_URL` environment variable.

---

## List Sales Orders

`GET /sales-orders`

Returns all sales orders. Each item has the same shape as [Get Sales Order](#get-sales-order).

### Response (200)

Returns an array of [SalesOrder](#salesorder) objects.

---

## Get Sales Order

`GET /sales-orders/:id`

Returns a single sales order by ID.

### Response (200)

#### SalesOrder

| Field         | Type         | Description                                      |
| ------------- | ------------ | ------------------------------------------------ |
| id            | string       | Unique identifier                                |
| orderNumber   | string       | Human-readable order number (e.g. `SO-001`)      |
| customerName  | string       | Customer name                                    |
| orderDate     | string       | ISO 8601 date                                    |
| status        | string       | One of `draft`, `confirmed`, `shipped`, `delivered`, `cancelled` |
| notes         | string       | Optional notes                                   |
| lineItems     | LineItem[]   | Ordered products                                 |
| totalAmount   | Price        | Sum of all line totals                           |
| createdAt     | string       | ISO 8601 timestamp                               |
| updatedAt     | string       | ISO 8601 timestamp                               |

#### LineItem

| Field       | Type   | Description                        |
| ----------- | ------ | ---------------------------------- |
| id          | string | Unique identifier                  |
| productId   | string | Reference to the product           |
| productName | string | Product display name               |
| sku         | string | Product SKU                        |
| quantity    | number | Ordered quantity                   |
| price       | Price  | Unit price                         |
| lineTotal   | Price  | `price.value × quantity`           |

#### Price

| Field    | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| currency | string | ISO 4217 currency code       |
| value    | number | Amount in cents (integer)    |

### Response (404)

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Sales order not found"
  }
}
```

---

## Create Sales Order

`POST /sales-orders`

Creates a new sales order. Returns the created order with a generated `id`.

### Request Body

| Field        | Type       | Required | Description                                                        |
| ------------ | ---------- | -------- | ------------------------------------------------------------------ |
| customerName | string     | Yes      | Customer name                                                      |
| orderDate    | string     | Yes      | ISO 8601 date                                                      |
| status       | string     | No       | One of `draft`, `confirmed`, `shipped`, `delivered`, `cancelled`. Defaults to `draft` |
| notes        | string     | No       | Optional notes                                                     |
| lineItems    | LineItem[] | Yes      | At least one line item required                                    |

**LineItem**

| Field       | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| productId   | string | Yes      | Product ID from the products endpoint     |
| productName | string | Yes      | Product display name                      |
| quantity    | number | Yes      | Must be greater than 0                    |
| price       | number | Yes      | Unit price in cents (integer, no decimals) |

### Response (201)

Returns the created [SalesOrder](#salesorder) object.

### Response (400)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description of what went wrong",
    "fields": ["fieldPath.that.failed"]
  }
}
```

---

## List Products

`GET /products`

Returns all available products.

### Response (200)

#### Product

| Field        | Type   | Description                    |
| ------------ | ------ | ------------------------------ |
| id           | string | Unique identifier              |
| name         | string | Product display name           |
| sku          | string | Stock keeping unit             |
| category     | string | Product category               |
| defaultPrice | Price  | Default unit price             |
