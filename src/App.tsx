import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { ToastProvider } from "@/components/ToastAlert";
import SalesOrderList from "@/pages/sales-orders/SalesOrderList/SalesOrderList";
import SalesOrderDetail from "@/pages/sales-orders/SalesOrderDetail/SalesOrderDetail";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="px-4 py-5">
          <span className="text-lg font-semibold text-gray-900">Console</span>
        </div>
        <nav className="space-y-1 px-2">
          <NavLink
            to="/sales-orders"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Sales Orders
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">{children}</main>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/sales-orders" replace />} />
            <Route path="/sales-orders" element={<SalesOrderList />} />
            <Route path="/sales-orders/:id" element={<SalesOrderDetail />} />
          </Routes>
        </SidebarLayout>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
