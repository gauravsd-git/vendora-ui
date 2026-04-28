import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart3,
  User,
  Store,
  LogOut,
  BriefcaseBusiness,
  Users,
} from "lucide-react";

const MENU_BY_ROLE = {
  ADMIN: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Stores", path: "/stores", icon: Store },
    { name: "Profile", path: "/profile", icon: User },
  ],
  STORE_ADMIN: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Cashiers", path: "/cashiers", icon: Users },
    { name: "Profile", path: "/profile", icon: User },
  ],
  CASHIER: [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Profile", path: "/profile", icon: User },
  ],
};

export default function MainLayout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user?.role || "CASHIER";

  const menu = MENU_BY_ROLE[role] || MENU_BY_ROLE.CASHIER;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-screen bg-slate-950 text-white flex overflow-hidden">
      <aside className="w-72 bg-[#0f172a] border-r border-slate-800 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
              <BriefcaseBusiness size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Vendora</h2>
              <p className="text-slate-400 text-sm">Retail SaaS</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-semibold text-lg">
              {user.fullname || "User"}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {role}
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-[#1e293b]"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-slate-800 bg-[#020817] flex items-center justify-between px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold">Vendora Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Manage store operations from one place
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
            Active
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}