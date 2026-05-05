import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import {
  Store,
  ShieldCheck,
  Search,
  RefreshCcw,
  Eye,
  CircleCheckBig,
  CircleX,
  Clock3,
  Trash2,
} from "lucide-react";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/stores");
      setStores(res.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load stores");
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return stores;

    return stores.filter((store) => {
      const brand = store.brand || "";
      const status = store.status || "";
      const type = store.storeType || "";
      const admin = store.storeAdmin?.fullname || "";
      return (
        brand.toLowerCase().includes(q) ||
        status.toLowerCase().includes(q) ||
        type.toLowerCase().includes(q) ||
        admin.toLowerCase().includes(q)
      );
    });
  }, [stores, search]);

  const viewDetails = async (id) => {
    try {
      setDetailLoading(true);
      const res = await api.get(`/api/stores/${id}`);
      setSelectedStore(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load store details");
    } finally {
      setDetailLoading(false);
    }
  };

  const moderateStore = async (id, status) => {
    try {
      await api.put(`/api/stores/${id}/moderate?status=${status}`);
      alert(`Store marked as ${status}`);
      loadStores();

      if (selectedStore?.id === id) {
        const res = await api.get(`/api/stores/${id}`);
        setSelectedStore(res.data);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update store status");
    }
  };

  const deleteStore = async (id) => {
    const ok = confirm("Delete this store?");
    if (!ok) return;

    try {
      await api.delete(`/api/stores/${id}`);
      alert("Store deleted");
      setSelectedStore(null);
      loadStores();
    } catch (error) {
      console.error(error);
      alert("Failed to delete store");
    }
  };

  const statusBadge = (status) => {
    const value = (status || "UNKNOWN").toUpperCase();

    if (value === "ACTIVE") {
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    }
    if (value === "PENDING") {
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    }
    if (value === "REJECTED") {
      return "bg-red-500/15 text-red-400 border-red-500/20";
    }
    return "bg-slate-500/15 text-slate-300 border-slate-500/20";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Store className="text-blue-400" />
            Store Management
          </h1>
          <p className="text-slate-400 mt-2">
            Approve, inspect, and manage all stores in the system.
          </p>
        </div>

        <button
          onClick={loadStores}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 w-fit"
        >
          <RefreshCcw size={18} />
          Refresh
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3 px-3 py-2 bg-[#1e293b] rounded-xl">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search store, admin, status, or type"
            className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols gap-6">
        <div className="xl:col-span-2 bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Stores</h2>
            <span className="text-slate-400 text-sm">
              {filteredStores.length} store(s)
            </span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-400">Loading...</div>
          ) : filteredStores.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              No stores found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e293b] text-left">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Admin</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.map((store) => (
                    <tr
                      key={store.id}
                      className="border-t border-slate-800 hover:bg-slate-800/40"
                    >
                      <td className="p-4">{store.id}</td>
                      <td className="p-4 font-medium">{store.brand || "-"}</td>
                      <td className="p-4">
                        {store.storeAdmin?.fullname || "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full border text-sm ${statusBadge(
                            store.status
                          )}`}
                        >
                          {store.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => viewDetails(store.id)}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg flex items-center gap-2"
                          >
                            <Eye size={15} />
                            View
                          </button>

                          <button
                            onClick={() => moderateStore(store.id, "ACTIVE")}
                            className="bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg flex items-center gap-2"
                          >
                            <CircleCheckBig size={15} />
                            Approve
                          </button>

                          <button
                            onClick={() => moderateStore(store.id, "REJECTED")}
                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg flex items-center gap-2"
                          >
                            <Clock3 size={15} />
                            Hold
                          </button>

                          <button
                            onClick={() => deleteStore(store.id)}
                            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg flex items-center gap-2"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 h-fit">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-5">
            <ShieldCheck className="text-blue-400" size={18} />
            Store Details
          </h2>

          {detailLoading ? (
            <p className="text-slate-400">Loading details...</p>
          ) : selectedStore ? (
            <div className="space-y-4 text-slate-300">
              <div>
                <p className="text-slate-500 text-sm">Brand</p>
                <p className="font-medium text-white">{selectedStore.brand || "-"}</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Store Type</p>
                <p className="font-medium text-white">{selectedStore.storeType || "-"}</p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Description</p>
                <p className="font-medium text-white">
                  {selectedStore.description || "-"}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Status</p>
                <p className="font-medium text-white">
                  {selectedStore.status || "UNKNOWN"}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Admin</p>
                <p className="font-medium text-white">
                  {selectedStore.storeAdmin?.fullname || "N/A"}
                </p>
              </div>

              {selectedStore.contact && (
                <div>
                  <p className="text-slate-500 text-sm">Contact</p>
                  <p className="font-medium text-white">
                    {selectedStore.contact.phone || "-"}
                  </p>
                  <p className="font-medium text-white">
                    {selectedStore.contact.email || "-"}
                  </p>
                  <p className="font-medium text-white">
                    {selectedStore.contact.address || "-"}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-500">
              Select a store to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}