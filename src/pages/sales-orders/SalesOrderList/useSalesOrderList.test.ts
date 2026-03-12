import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSalesOrderList } from "./useSalesOrderList";
import * as salesOrdersService from "@/services/salesOrders";
import type { SalesOrder } from "@/types";

vi.mock("@/services/salesOrders");

const mockOrder: SalesOrder = {
  id: "so_001",
  orderNumber: "SO-001",
  customerId: "cust_001",
  customer: { id: "cust_001", name: "Ridgeline Sports" },
  orderDate: "2025-01-10T00:00:00Z",
  deliveryDueDate: "2025-01-10T00:00:00Z",
  status: "confirmed",
  notes: "",
  lineItems: [],
  totalAmount: { currency: "USD", value: 311976 },
  createdAt: "2025-01-10T08:30:00Z",
  updatedAt: "2025-01-10T08:30:00Z",
};

describe("useSalesOrderList", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts in a loading state", () => {
    vi.mocked(salesOrdersService.getSalesOrders).mockReturnValue(
      new Promise(() => {}) // never resolves
    );

    const { result } = renderHook(() => useSalesOrderList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("fetches orders and returns them", async () => {
    vi.mocked(salesOrdersService.getSalesOrders).mockResolvedValue([mockOrder]);

    const { result } = renderHook(() => useSalesOrderList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.orders).toEqual([mockOrder]);
    expect(result.current.error).toBeNull();
  });

  it("sets an error when the fetch fails", async () => {
    vi.mocked(salesOrdersService.getSalesOrders).mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() => useSalesOrderList());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to load sales orders");
    expect(result.current.orders).toEqual([]);
  });
});
