import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSalesOrderDetail } from "./useSalesOrderDetail";
import * as salesOrdersService from "@/services/salesOrders";
import type { SalesOrder } from "@/types";

vi.mock("@/services/salesOrders");
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "so_001" }),
}));

const mockOrder: SalesOrder = {
  id: "so_001",
  orderNumber: "SO-001",
  customerName: "Ridgeline Sports",
  orderDate: "2025-01-10T00:00:00Z",
  status: "confirmed",
  notes: "",
  lineItems: [],
  totalAmount: { currency: "USD", value: 311976 },
  createdAt: "2025-01-10T08:30:00Z",
  updatedAt: "2025-01-10T08:30:00Z",
};

describe("useSalesOrderDetail", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts in a loading state", () => {
    vi.mocked(salesOrdersService.getSalesOrder).mockReturnValue(
      new Promise(() => {})
    );

    const { result } = renderHook(() => useSalesOrderDetail());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.order).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("fetches the order by id and returns it", async () => {
    vi.mocked(salesOrdersService.getSalesOrder).mockResolvedValue(mockOrder);

    const { result } = renderHook(() => useSalesOrderDetail());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(salesOrdersService.getSalesOrder).toHaveBeenCalledWith("so_001");
    expect(result.current.order).toEqual(mockOrder);
    expect(result.current.error).toBeNull();
  });

  it("sets an error when the fetch fails", async () => {
    vi.mocked(salesOrdersService.getSalesOrder).mockRejectedValue(
      new Error("Not found")
    );

    const { result } = renderHook(() => useSalesOrderDetail());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to load sales order");
    expect(result.current.order).toBeNull();
  });
});
