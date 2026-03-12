import { type FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSalesOrderList, type UseSalesOrderListReturn } from "./useSalesOrderList";
import type { SalesOrder } from "@/types";

type SalesOrderListViewProps = UseSalesOrderListReturn;

export const View: FC<SalesOrderListViewProps> = ({ orders, isLoading, error }) => {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value / 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Sales Orders</h1>
        <Button disabled={true}>Create Sales Order</Button>
      </div>

      {isLoading && (
        <div className="py-12">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No sales orders yet.
        </p>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Delivery Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: SalesOrder) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      to={`/sales-orders/${order.id}`}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer?.name ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.deliveryDueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(order.totalAmount.value, order.totalAmount.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

const statusVariants: Record<SalesOrder["status"], "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  confirmed: "default",
  shipped: "outline",
  delivered: "secondary",
  cancelled: "destructive",
};

const StatusBadge: FC<{ status: SalesOrder["status"] }> = ({ status }) => (
  <Badge variant={statusVariants[status]} className="capitalize">
    {status}
  </Badge>
);

const SalesOrderList = () => {
  const props = useSalesOrderList();
  return <View {...props} />;
};

export default SalesOrderList;
