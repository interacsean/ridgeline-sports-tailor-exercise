export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  status: "draft" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes?: string;
  lineItems: LineItem[];
  totalAmount: Price;
  createdAt: string;
  updatedAt: string;
}

export interface LineItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: Price;
  lineTotal: Price;
}

export interface Price {
  currency: string;
  /** Amount in cents (integer) */
  value: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  defaultPrice: Price;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    fields?: string[];
  };
}

export const isApiError = (value: unknown): value is ApiError => {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiError).error?.code === "string"
  );
};
