import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Store,
  Clock3,
  LogOut,
  KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/users/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error);

      const localUser = localStorage.getItem("user");

      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center text-xl">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="text-slate-400 text-lg mt-2">
          Manage your account details and access information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Card */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-5">
              <User size={42} />
            </div>

            <h2 className="text-2xl font-bold">
              {user?.fullname || "Vendora User"}
            </h2>

            <p className="text-slate-400 mt-1">
              {user?.email || "No email"}
            </p>

            <div className="mt-5 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm font-semibold">
              {user?.role || "USER"}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button className="w-full bg-[#1e293b] hover:bg-[#273449] transition p-4 rounded-2xl flex items-center gap-3">
              <KeyRound size={18} />
              Change Password
            </button>

          <div className="p-4">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard
                icon={<User size={18} />}
                label="Full Name"
                value={user?.fullname}
              />

              <InfoCard
                icon={<Mail size={18} />}
                label="Email"
                value={user?.email}
              />

              <InfoCard
                icon={<Phone size={18} />}
                label="Phone"
                value={user?.phone}
              />

              <InfoCard
                icon={<Shield size={18} />}
                label="Role"
                value={user?.role}
              />
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Account Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard
                icon={<Clock3 size={18} />}
                label="Joined"
                value={formatDate(user?.createDateAt)}
              />

              <InfoCard
                icon={<Clock3 size={18} />}
                label="Last Login"
                value={formatDate(user?.lastLogin)}
              />

              <InfoCard
                icon={<Store size={18} />}
                label="Store Access"
                value="Assigned"
              />

              <InfoCard
                icon={<Shield size={18} />}
                label="Status"
                value="Active"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#1e293b] rounded-2xl p-5">
      <div className="flex items-center gap-2 text-slate-400 mb-3">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-lg font-semibold break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}