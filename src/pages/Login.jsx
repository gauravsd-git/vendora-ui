import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
      <form onSubmit={login} className="bg-slate-900 p-8 rounded-2xl w-[420px] space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>

        <input name="email" placeholder="Email" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <input type="password" name="password" placeholder="Password" onChange={change}
          className="w-full p-3 rounded bg-slate-800" />

        <button className="w-full bg-blue-600 py-3 rounded">
          Login
        </button>

        <p className="text-center mt-5">
          No account?{" "}
          <Link to="/signup" className="text-blue-400">Signup</Link>
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