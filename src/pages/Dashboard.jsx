import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  Sparkles,
  RefreshCw,
  Plus,
  Users,
  Building2,
  Clock,
  CheckCircle2,
  Calendar,
  Bell,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const { activeRole, user } = useAuth();

  const getMetrics = () => {
    switch (activeRole) {
      case "Head of Department":
        return [
          { title: "Total Faculty", value: "47", label: "Across 8 departments", icon: Users, color: "from-blue-500 to-indigo-600" },
          { title: "Departments", value: "8", label: "Active this semester", icon: Building2, color: "from-purple-500 to-pink-600" },
          { title: "Pending Approvals", value: "5", label: "Requires review", icon: Clock, color: "from-amber-500 to-orange-600" },
          { title: "Active Tasks", value: "23", label: "5 high priority", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
          { title: "Meetings Today", value: "3", label: "Next: 10:00 AM", icon: Calendar, color: "from-cyan-500 to-blue-600" },
          { title: "Announcements", value: "12", label: "3 pinned", icon: Bell, color: "from-violet-500 to-purple-600" },
        ];
      case "Dept. Coordinator":
        return [
          { title: "Department Members", value: "14", label: "Active faculty", icon: Users, color: "from-blue-500 to-indigo-600" },
          { title: "Assigned Tasks", value: "12", label: "4 pending review", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
          { title: "Upcoming Meetings", value: "2", label: "Today", icon: Calendar, color: "from-cyan-500 to-blue-600" },
          { title: "Documents Uploaded", value: "38", label: "This month", icon: Building2, color: "from-purple-500 to-pink-600" },
        ];
      case "Faculty Member":
        return [
          { title: "My Tasks", value: "7", label: "2 due today", icon: CheckCircle2, color: "from-emerald-500 to-teal-600" },
          { title: "Classes / Meetings", value: "4", label: "Scheduled today", icon: Calendar, color: "from-cyan-500 to-blue-600" },
          { title: "Announcements", value: "8", label: "Unread", icon: Bell, color: "from-violet-500 to-purple-600" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar Header */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              Dashboard
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            {activeRole} Overview
          </h2>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks, documents, faculty..."
              className="w-full pl-9 pr-10 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-indigo-600/20">
              {user.avatar}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-8 text-white shadow-xl shadow-indigo-500/10">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md text-indigo-100 border border-white/10 mb-3">
                {user.dept}
              </span>
              <h1 className="text-3xl font-black tracking-tight">
                Good day, {user.name} 👋
              </h1>
              <p className="text-indigo-100/80 text-sm mt-1">
                Here is what is happening across your workspace today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold transition-all border border-white/10">
                <RefreshCw className="w-3.5 h-3.5" /> Sync
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 text-xs font-bold transition-all shadow-lg">
                <Plus className="w-4 h-4" /> Quick Action
              </button>
            </div>
          </div>

          {/* Decorative background glow circle */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>

        {/* Metric Cards Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Key Metrics
            </h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Real-time update
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getMetrics().map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {metric.value}
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mt-1">
                      {metric.title}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {metric.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}