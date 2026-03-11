import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SalesOrderList from "@/pages/sales-orders/SalesOrderList/SalesOrderList";
import SalesOrderDetail from "@/pages/sales-orders/SalesOrderDetail/SalesOrderDetail";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-56 shrink-0 border-r bg-card">
        <div className="px-4 py-5">
          <span className="text-lg font-semibold">Console</span>
        </div>
        <nav className="space-y-1 px-2">
          <NavLink
            to="/sales-orders"
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`
            }
          >
            Sales Orders
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-background p-8">{children}</main>
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/sales-orders" replace />} />
          <Route path="/sales-orders" element={<SalesOrderList />} />
          <Route path="/sales-orders/:id" element={<SalesOrderDetail />} />
        </Routes>
      </SidebarLayout>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
