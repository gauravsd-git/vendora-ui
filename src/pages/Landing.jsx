import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Store, Smartphone, BarChart3, Package, Users, CreditCard } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: Store,
      title: "Multi-Store SaaS",
      desc: "Run multiple independent stores from one centralized platform with tenant-wise data isolation.",
    },
    {
      icon: ShieldCheck,
      title: "JWT Security",
      desc: "Role-based authentication for Admin, Store Admin, and Cashier with protected APIs.",
    },
    {
      icon: Package,
      title: "Inventory Control",
      desc: "Track stock, reduce quantity on sales, and keep product data synced in real time.",
    },
    {
      icon: CreditCard,
      title: "Billing & Payments",
      desc: "Fast order creation, payment handling, and clean checkout flow for daily business operations.",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      desc: "View sales summaries, top products, and store performance insights from one dashboard.",
    },
    {
      icon: Users,
      title: "Employee Access",
      desc: "Create cashier accounts and control access based on business roles and permissions.",
    },
  ];

  const stats = [
    { value: "3", label: "Core Roles" },
    { value: "100%", label: "Tenant Separation" },
    { value: "JWT", label: "Secure Login" },
    { value: "Real-time", label: "Stock Updates" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),radial-gradient(circle_at_right,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(to_bottom,_#020617,_#0f172a_55%,_#020617)]" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/20 ring-1 ring-blue-400/30 backdrop-blur">
            <Store className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Vendora</h1>
            <p className="text-xs text-slate-400">Enterprise POS SaaS</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Login
          </a>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
          >
            Sign Up <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 pb-16 pt-8 lg:grid-cols-2 lg:items-center lg:px-8 lg:pt-14">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-200"
          >
            <Smartphone className="h-4 w-4" />
            Modern retail management for multiple stores
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Manage stores, sales, products, and employees from one platform.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            Vendora is a multi-tenant Point of Sale SaaS built for retail and service businesses.
            It gives every store secure access, live inventory tracking, billing, payment handling,
            and analytics in a clean cloud-based workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Access Dashboard
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="relative">
          <div className="absolute -inset-8 rounded-[2rem] bg-blue-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Platform Snapshot</h3>
                <p className="text-sm text-slate-400">Dashboard preview for store operations</p>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                Live Mode
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Stores", "Centralized management"],
                ["Products", "Tenant-wise catalog"],
                ["Orders", "Daily billing flow"],
                ["Analytics", "Revenue & top products"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-slate-400">{title}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-500/20 p-3">
                  <ShieldCheck className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Secure Multi-Role Access</h4>
                  <p className="text-sm text-slate-300">
                    Admin • Store Admin • Cashier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-300/80">
              Why Vendora
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Built for practical store operations
            </h3>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-blue-400/30 hover:bg-white/8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 ring-1 ring-blue-400/20">
                  <Icon className="h-6 w-6 text-blue-300" />
                </div>
                <h4 className="mt-5 text-lg font-semibold text-white">{feature.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Vendora • Enterprise POS SaaS
      </footer>
    </div>
  );
}
