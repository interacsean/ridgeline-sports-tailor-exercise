import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { View } from "./SalesOrderDetail";
import type { SalesOrder } from "@/types";

const mockOrder: SalesOrder = {
  id: "so_001",
  orderNumber: "SO-001",
  customerId: "cust_001",
  customer: { id: "cust_001", name: "Ridgeline Sports" },
  orderDate: "2025-01-10T00:00:00Z",
  deliveryDueDate: "2025-01-10T00:00:00Z",
  status: "confirmed",
  notes: "Rush delivery requested",
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

describe("SalesOrderDetail View", () => {
  it("renders a loading spinner when loading", () => {
    renderView({ order: null, isLoading: true, error: null });
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders an error message", () => {
    renderView({ order: null, isLoading: false, error: "Failed to load" });
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("renders order details", () => {
    renderView({ order: mockOrder, isLoading: false, error: null });
    expect(screen.getByText("SO-001")).toBeInTheDocument();
    expect(screen.getByText("Ridgeline Sports")).toBeInTheDocument();
    expect(screen.getByText("confirmed")).toBeInTheDocument();
  });

  it("renders line items", () => {
    renderView({ order: mockOrder, isLoading: false, error: null });
    expect(screen.getByText("Trail Running Shoes")).toBeInTheDocument();
    expect(screen.getByText("TRS-M-001")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("renders order notes when present", () => {
    renderView({ order: mockOrder, isLoading: false, error: null });
    expect(screen.getByText("Rush delivery requested")).toBeInTheDocument();
  });

  it("renders a back link", () => {
    renderView({ order: mockOrder, isLoading: false, error: null });
    expect(screen.getByText(/back to sales orders/i)).toBeInTheDocument();
  });
});
