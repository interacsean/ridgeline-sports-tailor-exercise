import { describe, it, expect, vi, beforeEach } from "vitest";
import { getSalesOrders, getSalesOrder, getProducts } from "./salesOrders";
import { api } from "./api";

vi.mock("./api");

describe("salesOrders service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getSalesOrders calls GET /sales-orders", async () => {
    const mockOrders = [{ id: "so_001", orderNumber: "SO-001" }];
    vi.mocked(api.get).mockResolvedValue(mockOrders);

    const result = await getSalesOrders();

    expect(api.get).toHaveBeenCalledWith("/sales-orders");
    expect(result).toEqual(mockOrders);
  });

  it("getSalesOrder calls GET /sales-orders/:id", async () => {
    const mockOrder = { id: "so_001", orderNumber: "SO-001" };
    vi.mocked(api.get).mockResolvedValue(mockOrder);

    const result = await getSalesOrder("so_001");

    expect(api.get).toHaveBeenCalledWith("/sales-orders/so_001");
    expect(result).toEqual(mockOrder);
  });

  it("getProducts calls GET /products", async () => {
    const mockProducts = [{ id: "prod_001", name: "Trail Shoes" }];
    vi.mocked(api.get).mockResolvedValue(mockProducts);

    const result = await getProducts();

    expect(api.get).toHaveBeenCalledWith("/products");
    expect(result).toEqual(mockProducts);
  });
});
