import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { View } from "./SalesOrderList";
import type { SalesOrder } from "@/types";

const mockOrder: SalesOrder = {
  id: "so_001",
  orderNumber: "SO-001",
  customerId: "cust_001",
  customer: { id: "cust_001", name: "Ridgeline Sports" },
  orderDate: "2025-01-10T00:00:00Z",
  deliveryDueDate: "2025-01-10T00:00:00Z",
  status: "confirmed",
  notes: "",
  lineItems: [
    {
      id: "li_001",
      productId: "prod_001",
      productName: "Trail Running Shoes",
      sku: "TRS-M-001",
      quantity: 24,
      price: { currency: "USD", value: 12999 },
      lineTotal: { currency: "USD", value: 311976 },
    },
  ],
  totalAmount: { currency: "USD", value: 311976 },
  createdAt: "2025-01-10T08:30:00Z",
  updatedAt: "2025-01-10T08:30:00Z",
};

const renderView = (props: Parameters<typeof View>[0]) =>
  render(
    <MemoryRouter>
      <View {...props} />
    </MemoryRouter>
  );

describe("SalesOrderList View", () => {
  it("renders a loading spinner when loading", () => {
    renderView({ orders: [], isLoading: true, error: null });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders an error message", () => {
    renderView({ orders: [], isLoading: false, error: "Failed to load" });
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("renders an empty state when there are no orders", () => {
    renderView({ orders: [], isLoading: false, error: null });
    expect(screen.getByText("No sales orders yet.")).toBeInTheDocument();
  });

  it("renders a list of orders", () => {
    renderView({ orders: [mockOrder], isLoading: false, error: null });
    expect(screen.getByText("SO-001")).toBeInTheDocument();
    expect(screen.getByText("Ridgeline Sports")).toBeInTheDocument();
  });

  it("renders the Create Sales Order button as disabled", () => {
    renderView({ orders: [mockOrder], isLoading: false, error: null });
    expect(screen.getByRole("button", { name: /create sales order/i })).toBeDisabled();
  });
});
