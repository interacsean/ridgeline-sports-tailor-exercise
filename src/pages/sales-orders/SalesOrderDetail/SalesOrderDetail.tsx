import { type FC } from "react";
import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
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
        <Link to="/sales-orders" className="text-sm text-blue-600 hover:text-blue-800">
          &larr; Back to Sales Orders
        </Link>
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error ?? "Order not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/sales-orders" className="text-sm text-blue-600 hover:text-blue-800">
          &larr; Back to Sales Orders
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <Heading as="h1">{order.orderNumber}</Heading>
        <StatusBadge status={order.status} />
      </div>

      {/* Order Details Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Heading as="h3" className="mb-4">
          Order Details
        </Heading>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-gray-500">Customer</dt>
            <dd className="font-medium text-gray-900">{order.customerName}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Order Date</dt>
            <dd className="font-medium text-gray-900">
              {new Date(order.orderDate).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Total</dt>
            <dd className="font-medium text-gray-900">
              {formatCurrency(order.totalAmount.value, order.totalAmount.currency)}
            </dd>
          </div>
          {order.notes && (
            <div>
              <dt className="text-gray-500">Notes</dt>
              <dd className="text-gray-900">{order.notes}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Line Items Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Heading as="h3" className="mb-4">
          Line Items
        </Heading>
        {order.lineItems.length === 0 ? (
          <p className="text-sm text-gray-500">No line items.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="pb-2 text-left font-medium text-gray-500">Product</th>
                <th className="pb-2 text-left font-medium text-gray-500">SKU</th>
                <th className="pb-2 text-right font-medium text-gray-500">Qty</th>
                <th className="pb-2 text-right font-medium text-gray-500">Unit Price</th>
                <th className="pb-2 text-right font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.lineItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 text-gray-900">{item.productName}</td>
                  <td className="py-2 text-gray-500">{item.sku}</td>
                  <td className="py-2 text-right text-gray-900">{item.quantity}</td>
                  <td className="py-2 text-right text-gray-900">
                    {formatCurrency(item.price.value, item.price.currency)}
                  </td>
                  <td className="py-2 text-right font-medium text-gray-900">
                    {formatCurrency(item.lineTotal.value, item.lineTotal.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
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
    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[status]}`}
  >
    {status}
  </span>
);

const SalesOrderDetail = () => {
  const props = useSalesOrderDetail();
  return <View {...props} />;
};

export default SalesOrderDetail;
