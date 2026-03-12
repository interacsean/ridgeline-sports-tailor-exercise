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

| Field           | Type         | Description                                      |
| --------------- | ------------ | ------------------------------------------------ |
| id              | string       | Unique identifier                                |
| orderNumber     | string       | Human-readable order number (e.g. `SO-001`)      |
| customerId      | string       | Reference to the customer                        |
| customer        | Customer     | Joined customer record                           |
| orderDate       | string       | ISO 8601 date                                    |
| deliveryDueDate | string       | ISO 8601 date                                    |
| status          | string       | One of `draft`, `confirmed`, `shipped`, `delivered`, `cancelled` |
| notes           | string       | Optional notes                                   |
| lineItems       | LineItem[]   | Ordered products                                 |
| totalAmount     | Price        | Sum of all line totals                           |
| createdAt       | string       | ISO 8601 timestamp                               |
| updatedAt       | string       | ISO 8601 timestamp                               |

#### Customer

| Field           | Type   | Description                    |
| --------------- | ------ | ------------------------------ |
| id              | string | Unique identifier (UUID)       |
| name            | string | Customer display name          |
| shippingAddress | string | Optional shipping address      |
| billingAddress  | string | Optional billing address       |

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

> ⚠️ Note: The API is a stateless, mock API only. Successfully "created" SalesOrders will no be persisted serverside, but will be returned in a Response Cookie (`mock_orders`) that serves as a session database.

> Requests to fetch these new SalesOrders from GET:/sales-orders or GET:/sales-orders/:id will respect the SalesOrders contained in the `mock_orders` Request Cookie

### Request Body

| Field           | Type       | Required | Description                                                        |
| --------------- | ---------- | -------- | ------------------------------------------------------------------ |
| customerId      | string     | Yes      | Customer ID from the customers endpoint                            |
| deliveryDueDate | string     | Yes      | ISO 8601 date — validation error if missing                        |
| orderDate       | string     | No       | ISO 8601 date                                                      |
| status          | string     | No       | One of `draft`, `confirmed`, `shipped`, `delivered`, `cancelled`. Defaults to `draft` |
| notes           | string     | No       | Optional notes                                                     |
| lineItems       | LineItem[] | Yes      | At least one line item required                                    |

**LineItem**

| Field       | Type   | Required | Description                               |
| ----------- | ------ | -------- | ----------------------------------------- |
| productId   | string | Yes      | Product ID from the products endpoint     |
| productName | string | Yes      | Product display name                      |
| quantity    | number | Yes      | Must be greater than 0                    |
| price       | number | Yes      | Unit price where value is in cents        |

### Response (201)

Returns the created [SalesOrder](#salesorder) object.

### Response (400)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description of what went wrong",
    "fields": ["fieldPath.that.failed", "arrayFieldPath[0].that.failed"]
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

---

## List Customers

`GET /customers`

Returns all available customers.

### Response (200)

Returns an array of [Customer](#customer) objects.
