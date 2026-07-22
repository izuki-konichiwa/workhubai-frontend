import React from "react";
import { Users, CheckSquare, Clock, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { activeRole, faculty, tasks, toggleTaskStatus } = useAuth();

  // Dynamic calculations based on global state
  const totalFacultyCount = faculty.length;
  const activeFacultyCount = faculty.filter((f) => f.status === "Active").length;
  
  const pendingTasks = tasks.filter((t) => t.status !== "Completed");
  const completedTasks = tasks.filter((t) => t.status === "Completed");
  const highPriorityPending = pendingTasks.filter((t) => t.priority === "High").length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl shadow-indigo-500/10">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md">
            {activeRole} View
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-2">
            Department Overview
          </h1>
          <p className="text-xs text-indigo-100 mt-1">
            Real-time status updates across faculty workloads and pending deadlines.
          </p>
        </div>
      </div>

      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Faculty */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Faculty</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalFacultyCount}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {activeFacultyCount} Active Members
          </p>
        </div>

        {/* Metric 2: Pending Tasks */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Tasks</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {pendingTasks.length}
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            {highPriorityPending} High Priority
          </p>
        </div>

        {/* Metric 3: Completed Deliverables */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completedTasks.length}
          </div>
          <p className="text-[11px] text-slate-400">
            {Math.round((completedTasks.length / (tasks.length || 1)) * 100)}% Completion Rate
          </p>
        </div>

        {/* Metric 4: AI Knowledge Index */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">AI Knowledge Docs</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            142
          </div>
          <p className="text-[11px] text-indigo-500 font-semibold">
            Indexed & Syncing
          </p>
        </div>
      </div>

      {/* Dynamic Task Preview Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Active Tasks Preview ({pendingTasks.length} remaining)
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {pendingTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === "Completed"}
                  onChange={() => toggleTaskStatus(task.id)}
                  className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {task.title}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                Due {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}