import { useState, useEffect } from "react";
import { getSalesOrders } from "@/services/salesOrders";
import type { SalesOrder } from "@/types";

export interface UseSalesOrderListReturn {
  orders: SalesOrder[];
  isLoading: boolean;
  error: string | null;
}

export const useSalesOrderList = (): UseSalesOrderListReturn => {
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const data = await getSalesOrders();
        if (!cancelled) {
          setOrders(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load sales orders");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  return { orders, isLoading, error };
};
