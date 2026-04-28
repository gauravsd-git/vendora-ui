import { useEffect, useState } from "react";
import api from "../api/axios";
import { Users, Plus, Trash2 } from "lucide-react";

export default function Cashiers() {
  const [cashiers, setCashiers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadCashiers = async () => {
    try {
      const res = await api.get("/api/users/cashiers");
      setCashiers(res.data);
    } catch (error) {
      alert("Failed to load cashiers");
    }
  };

  useEffect(() => {
    loadCashiers();
  }, []);

  const createCashier = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/api/users/cashier", {
        fullname: name,   // FIXED
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");

      loadCashiers();
    } catch (error) {
      alert("Failed to create cashier");
    }
  };

  const deleteCashier = async (id) => {
    try {
      await api.delete(`/api/users/cashier/${id}`); // FIXED
      loadCashiers();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold flex gap-3 items-center">
          <Users className="text-blue-400" />
          Cashier Management
        </h1>

        <p className="text-slate-400 mt-2">
          Manage store billing staff.
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">
          Add Cashier
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Full Name"
            className="bg-slate-800 p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            type="email"
            className="bg-slate-800 p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            className="bg-slate-800 p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={createCashier}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold flex gap-2 items-center"
        >
          <Plus size={18} />
          Create Cashier
        </button>
      </div>

      {/* Cashier Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 text-xl font-semibold">
          Store Cashiers
        </div>

        {cashiers.length === 0 ? (
          <div className="p-6 text-slate-400 text-center">
            No cashiers found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {cashiers.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">{item.id}</td>

                  <td className="p-4">
                    {item.fullname}
                  </td>

                  <td className="p-4">{item.email}</td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteCashier(item.id)
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}