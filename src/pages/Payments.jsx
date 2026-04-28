import { useEffect, useState } from "react";
import { CreditCard, Wallet, IndianRupee, CheckCircle2 } from "lucide-react";
import api from "../api/axios";

export default function Payments() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const methods = [
    { value: "CASH", label: "Cash", icon: Wallet },
    { value: "UPI", label: "UPI", icon: IndianRupee },
    { value: "CARD", label: "Card", icon: CreditCard },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const payNow = async () => {
    if (!selectedOrder) {
      alert("Select order first");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/api/payments", {
        orderId: Number(selectedOrder),
        paymentMethod,
      });

      setMessage(res.data);
      fetchOrders();
    } catch (error) {
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  const currentOrder = orders.find(
    (item) => item.id === Number(selectedOrder)
  );

  return (
    <div className="min-h-screen bg-[#020817] text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Payments</h1>
        <p className="text-slate-400 text-lg">
          Complete order payments securely.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 bg-[#0f172a] rounded-3xl border border-slate-800 p-8">
          <h2 className="text-2xl font-semibold mb-6">Select Order</h2>

          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1e293b] border border-slate-700 mb-6"
          >
            <option value="">Choose Pending Order</option>

            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                Order #{order.id} - {order.customerName} - ₹
                {order.totalAmount}
              </option>
            ))}
          </select>

          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {methods.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.value}
                  onClick={() => setPaymentMethod(item.value)}
                  className={`p-5 rounded-2xl border transition text-left ${
                    paymentMethod === item.value
                      ? "bg-blue-600 border-blue-500"
                      : "bg-[#1e293b] border-slate-700"
                  }`}
                >
                  <Icon className="mb-3" size={28} />
                  <p className="font-semibold">{item.label}</p>
                </button>
              );
            })}
          </div>

          <button
            onClick={payNow}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-4 rounded-2xl text-xl font-semibold"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

          {message && (
            <div className="mt-6 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-2xl p-4 flex gap-3">
              <CheckCircle2 />
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="bg-[#0f172a] rounded-3xl border border-slate-800 p-8 h-fit">
          <h2 className="text-2xl font-semibold mb-6">Bill Summary</h2>

          {currentOrder ? (
            <div className="space-y-4">
              <div className="flex justify-between text-slate-400">
                <span>Order ID</span>
                <span>#{currentOrder.id}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Customer</span>
                <span>{currentOrder.customerName}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Status</span>
                <span>{currentOrder.status}</span>
              </div>

              <hr className="border-slate-700 my-4" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹{currentOrder.totalAmount}</span>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">Select an order to view summary</p>
          )}
        </div>
      </div>
    </div>
  );
}