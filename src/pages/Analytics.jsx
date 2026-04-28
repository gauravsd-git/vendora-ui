import React, { useEffect, useState } from "react";
import { IndianRupee, ShoppingCart, TrendingUp, Package, RefreshCcw } from "lucide-react";
import api from "../api/axios";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrder: 0,
    topCount: 0,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const salesRes = await api.get("/api/analytics/total-sales");
      const topRes = await api.get("/api/analytics/top-products");

      const revenue = salesRes.data.totalRevenue || 0;
      const orders = salesRes.data.totalOrders || 0;

      setStats({
        totalRevenue: revenue,
        totalOrders: orders,
        avgOrder: orders > 0 ? Math.round(revenue / orders) : 0,
        topCount: topRes.data.length || 0,
      });

      setProducts(topRes.data || []);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        avgOrder: 0,
        topCount: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const card =
    "bg-[#0f1c3a] border border-white/10 rounded-2xl p-6 shadow-lg";

  return (
    <div className="min-h-screen bg-[#050b1f] text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-2 text-lg">
            Revenue, orders and top-selling products overview.
          </p>
        </div>

        <button
          onClick={loadAnalytics}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2 font-semibold"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className={card}>
          <div className="flex justify-between">
            <p className="text-gray-400">Total Revenue</p>
            <IndianRupee className="text-green-400" />
          </div>
          <h2 className="text-4xl font-bold mt-4">₹{stats.totalRevenue}</h2>
        </div>

        <div className={card}>
          <div className="flex justify-between">
            <p className="text-gray-400">Total Orders</p>
            <ShoppingCart className="text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold mt-4">{stats.totalOrders}</h2>
        </div>

        <div className={card}>
          <div className="flex justify-between">
            <p className="text-gray-400">Avg Order Value</p>
            <TrendingUp className="text-yellow-400" />
          </div>
          <h2 className="text-4xl font-bold mt-4">₹{stats.avgOrder}</h2>
        </div>

        <div className={card}>
          <div className="flex justify-between">
            <p className="text-gray-400">Top Products</p>
            <Package className="text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold mt-4">{stats.topCount}</h2>
        </div>
      </div>

      {/* Bottom Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Revenue Box */}
        <div className="md:col-span-2 bg-[#0f1c3a] rounded-2xl p-8 border border-white/10">
          <h3 className="text-3xl font-bold mb-6">Revenue Snapshot</h3>

          <div className="mb-6">
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Revenue Growth</span>
              <span>100%</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-full bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 text-gray-300">
              <span>Orders Performance</span>
              <span>{stats.totalOrders > 0 ? "100%" : "0%"}</span>
            </div>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  stats.totalOrders > 0 ? "w-full bg-blue-500" : "w-0"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#0f1c3a] rounded-2xl p-8 border border-white/10">
          <h3 className="text-3xl font-bold mb-6">Top Products</h3>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-400">No sales data available</p>
          ) : (
            <div className="space-y-4">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#182847] rounded-xl p-4 flex justify-between"
                >
                  <span>{item[0]}</span>
                  <span className="font-bold">{item[1]} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}