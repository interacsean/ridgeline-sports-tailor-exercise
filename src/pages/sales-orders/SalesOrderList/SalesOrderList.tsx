import { type FC } from "react";
import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
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
        <Heading as="h1">Sales Orders</Heading>
        <Button disabled={true}>Create Sales Order</Button>
      </div>

      {isLoading && (
        <div className="py-12">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && (
        <p className="text-sm text-gray-500 py-8 text-center">
          No sales orders yet.
        </p>
      )}

      {!isLoading && !error && orders.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order: SalesOrder) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/sales-orders/${order.id}`}
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">
                    {formatCurrency(order.totalAmount.value, order.totalAmount.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const statusColors: Record<SalesOrder["status"], string> = {
  draft: "bg-gray-100 text-gray-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-yellow-100 text-yellow-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const StatusBadge: FC<{ status: SalesOrder["status"] }> = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[status]}`}
  >
    {status}
  </span>
);

const SalesOrderList = () => {
  const props = useSalesOrderList();
  return <View {...props} />;
};

export default SalesOrderList;
