import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Boxes,
  IndianRupee,
} from "lucide-react";

export default function Products() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setEditId(null);
  };

  const saveProduct = async () => {
    if (!name || !price || !quantity) {
      alert("Fill all fields");
      return;
    }

    const body = {
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      if (editId) {
        await api.put(`/api/products/${editId}`, body);
        alert("Product Updated");
      } else {
        await api.post("/api/products", body);
        alert("Product Added");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      alert("Operation failed");
    }
  };

  const editProduct = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    try {
      await api.delete(`/api/products/${id}`);
      alert("Deleted");
      loadProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Package className="text-blue-400" />
            Products Management
          </h1>
          <p className="text-slate-400 mt-2">
            Manage store inventory professionally.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl">
          Total Products:{" "}
          <span className="font-bold text-blue-400">{products.length}</span>
        </div>
      </div>

      {/* Form only for STORE_ADMIN */}
      {role === "STORE_ADMIN" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Plus size={18} />
            {editId ? "Edit Product" : "Add Product"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-5">
            <button
              onClick={saveProduct}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
            >
              {editId ? "Update Product" : "Add Product"}
            </button>

            <button
              onClick={resetForm}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 text-xl font-semibold">
          Product Inventory
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No products found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-left">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  {role === "STORE_ADMIN" && (
                    <th className="p-4 text-center">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40"
                  >
                    <td className="p-4">{item.id}</td>

                    <td className="p-4 font-medium flex items-center gap-2">
                      <Boxes size={16} className="text-blue-400" />
                      {item.name}
                    </td>

                    <td className="p-4">
                      <span className="flex items-center gap-1">
                        <IndianRupee size={14} />
                        {item.price}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.quantity < 5
                            ? "bg-red-600/20 text-red-400"
                            : "bg-green-600/20 text-green-400"
                        }`}
                      >
                        {item.quantity}
                      </span>
                    </td>

                    {role === "STORE_ADMIN" && (
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => editProduct(item)}
                            className="bg-amber-500 hover:bg-amber-600 p-2 rounded-lg"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
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