import { type FC } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSalesOrderDetail, type UseSalesOrderDetailReturn } from "./useSalesOrderDetail";
import type { SalesOrder } from "@/types";

type SalesOrderDetailViewProps = UseSalesOrderDetailReturn;

export const View: FC<SalesOrderDetailViewProps> = ({ order, isLoading, error }) => {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value / 100);
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-4">
        <Link to="/sales-orders" className="text-sm text-primary hover:underline">
          &larr; Back to Sales Orders
        </Link>
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error ?? "Order not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/sales-orders" className="text-sm text-primary hover:underline">
          &larr; Back to Sales Orders
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{order.orderNumber}</h1>
        <StatusBadge status={order.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Customer</dt>
              <dd className="font-medium">{order.customerName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Order Date</dt>
              <dd className="font-medium">
                {new Date(order.orderDate).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Total</dt>
              <dd className="font-medium">
                {formatCurrency(order.totalAmount.value, order.totalAmount.currency)}
              </dd>
            </div>
            {order.notes && (
              <div>
                <dt className="text-muted-foreground">Notes</dt>
                <dd>{order.notes}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          {order.lineItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No line items.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.lineItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.price.value, item.price.currency)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.lineTotal.value, item.lineTotal.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
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

const SalesOrderDetail = () => {
  const props = useSalesOrderDetail();
  return <View {...props} />;
};

export default SalesOrderDetail;
