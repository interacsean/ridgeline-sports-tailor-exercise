import { api } from "./api";
import type {
  SalesOrder,
  Product,
} from "@/types";

export const getSalesOrders = async (): Promise<SalesOrder[]> => {
  return api.get<SalesOrder[]>("/sales-orders");
};

export const getSalesOrder = async (id: string): Promise<SalesOrder> => {
  return api.get<SalesOrder>(`/sales-orders/${id}`);
};

export const getProducts = async (): Promise<Product[]> => {
  return api.get<Product[]>("/products");
};
