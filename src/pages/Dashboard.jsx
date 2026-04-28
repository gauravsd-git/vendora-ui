import { useEffect, useState } from "react";
import { Package, ShoppingCart, CreditCard, Users, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const role = user?.role || "USER";

  const cards = [
    {
      title: "Products",
      value: role === "STORE_ADMIN" ? "Manage Inventory" : "Available Items",
      icon: Package,
    },
    {
      title: "Orders",
      value: role === "STORE_ADMIN" ? "Store Orders" : "Create Orders",
      icon: ShoppingCart,
    },
    {
      title: "Payments",
      value: "Transactions",
      icon: CreditCard,
    },
    {
      title: "Users",
      value: role === "STORE_ADMIN" ? "Cashiers" : "Profile",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold">
            Welcome, {user?.fullname || "User"}
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            Manage your store operations from a clean dashboard.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 px-5 py-3 rounded-2xl flex items-center gap-3 w-fit">
          <ShieldCheck className="text-green-400" size={18} />
          <span className="font-semibold">{role}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-slate-400">{card.title}</p>
                <Icon className="text-blue-400" size={20} />
              </div>
              <h3 className="mt-4 text-2xl font-bold">{card.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Quick Summary</h3>
          <p className="text-slate-400 leading-7">
            Use the sidebar to navigate through products, orders, payments,
            analytics and profile. Each module is connected to the backend.
          </p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4">Account Info</h3>
          <div className="space-y-3 text-slate-300">
            <p><span className="text-slate-500">Name:</span> {user?.fullname || "N/A"}</p>
            <p><span className="text-slate-500">Email:</span> {user?.email || "N/A"}</p>
            <p><span className="text-slate-500">Role:</span> {role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}