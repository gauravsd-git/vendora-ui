import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import {
  ShoppingCart,
  Plus,
  Trash2,
  Receipt,
  Package,
  User,
  IndianRupee,
} from "lucide-react";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qty, setQty] = useState(1);

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  // ===============================
  // LOAD DATA SAFELY
  // ===============================
  const loadInitial = async () => {
    setLoading(true);

    // products
    try {
      const res = await api.get("/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Products load failed", err);
      setProducts([]);
    }

    // orders
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Orders load failed", err);
      setOrders([]);
    }

    setLoading(false);
  };

  // ===============================
  // ADD ITEM TO CART
  // ===============================
  const addItem = () => {
    if (!selectedProductId) {
      alert("Select product");
      return;
    }

    if (Number(qty) < 1) {
      alert("Quantity must be greater than 0");
      return;
    }

    const product = products.find(
      (p) => p.id === Number(selectedProductId)
    );

    if (!product) {
      alert("Product not found");
      return;
    }

    if (product.quantity < Number(qty)) {
      alert("Not enough stock");
      return;
    }

    const existing = cart.find(
      (item) => item.productId === product.id
    );

    if (existing) {
      const updatedQty =
        existing.quantity + Number(qty);

      if (updatedQty > product.quantity) {
        alert("Stock limit exceeded");
        return;
      }

      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: updatedQty,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: Number(qty),
        },
      ]);
    }

    setSelectedProductId("");
    setQty(1);
  };

  // ===============================
  // REMOVE ITEM
  // ===============================
  const removeItem = (productId) => {
    setCart(
      cart.filter(
        (item) => item.productId !== productId
      )
    );
  };

  // ===============================
  // TOTAL
  // ===============================
  const grandTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  // ===============================
  // CREATE ORDER
  // ===============================
  const createOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setCreating(true);

      const payload = {
        customerName:
          customerName.trim() || "Walk-in",
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      await api.post("/api/orders", payload);

      alert("Order Created Successfully");

      setCustomerName("");
      setCart([]);
      setSelectedProductId("");
      setQty(1);

      loadInitial();
    } catch (err) {
      console.error(err);

      const msg =
        err?.response?.data?.message ||
        "Order creation failed";

      alert(msg);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <ShoppingCart className="text-blue-400" />
          Orders & Billing
        </h1>

        <p className="text-slate-400 mt-2">
          Create customer orders and manage billing flow.
        </p>
      </div>

      {/* TOP GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CREATE ORDER */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-5">
            Create New Order
          </h2>

          {/* customer */}
          <input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Customer Name"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none mb-4"
          />

          {/* row */}
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={selectedProductId}
              onChange={(e) =>
                setSelectedProductId(
                  e.target.value
                )
              }
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            >
              <option value="">
                Select Product
              </option>

              {products.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} ({item.quantity})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) =>
                setQty(e.target.value)
              }
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              onClick={addItem}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-3 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Item
            </button>
          </div>

          {/* CART */}
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-3">
              Cart Items
            </h3>

            {cart.length === 0 ? (
              <p className="text-slate-400">
                No items added
              </p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-slate-800 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-400">
                        {item.quantity} × ₹
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">
                        ₹
                        {item.quantity *
                          item.price}
                      </span>

                      <button
                        onClick={() =>
                          removeItem(
                            item.productId
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BILL SUMMARY */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
            <Receipt size={20} />
            Bill Summary
          </h2>

          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Customer</span>
              <span>
                {customerName ||
                  "Walk-in"}
              </span>
            </div>

            <div className="border-t border-slate-700 pt-4 flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <button
            onClick={createOrder}
            disabled={creating}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 py-3 rounded-xl text-white font-semibold"
          >
            {creating
              ? "Creating..."
              : "Confirm Order"}
          </button>
        </div>
      </div>

      {/* ORDER TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 text-xl font-semibold text-white">
          Recent Orders
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            Loading...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No Orders Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-left text-white">
                <tr>
                  <th className="p-4">
                    ID
                  </th>
                  <th className="p-4">
                    Customer
                  </th>
                  <th className="p-4">
                    Amount
                  </th>
                  <th className="p-4">
                    Status
                  </th>
                  <th className="p-4">
                    Items
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="p-4 text-white">
                      {order.id}
                    </td>

                    <td className="p-4 text-white flex items-center gap-2">
                      <User size={15} />
                      {order.customerName ||
                        "Walk-in"}
                    </td>

                    <td className="p-4 text-white">
                      ₹
                      {order.totalAmount}
                    </td>

                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 text-white">
                      <span className="flex items-center gap-2">
                        <Package size={15} />
                        {order.items
                          ?.length || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}