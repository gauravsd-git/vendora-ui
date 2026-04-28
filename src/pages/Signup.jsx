import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "STORE_ADMIN",
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", form);

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup Success");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
      <form onSubmit={signup} className="bg-slate-900 p-8 rounded-2xl w-[420px] space-y-4">
        <h1 className="text-3xl font-bold">Create Store</h1>

        <input name="fullname" placeholder="Full Name" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <input name="email" placeholder="Email" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <input name="phone" placeholder="Phone" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <input type="password" name="password" placeholder="Password" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <button className="w-full bg-blue-600 py-3 rounded">
          Sign Up
        </button>

        <p className="text-center mt-5">
          Already have account?{" "}
          <Link to="/login" className="text-blue-400">Login</Link>
        </p>

        <div className="text-center mt-5">
          <Link to="/" className="text-slate-500 hover:text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}