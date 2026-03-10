import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSalesOrder } from "@/services/salesOrders";
import type { SalesOrder } from "@/types";

export interface UseSalesOrderDetailReturn {
  order: SalesOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const useSalesOrderDetail = (): UseSalesOrderDetailReturn => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchOrder = async () => {
      try {
        const data = await getSalesOrder(id);
        if (!cancelled) {
          setOrder(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load sales order");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { order, isLoading, error };
};
