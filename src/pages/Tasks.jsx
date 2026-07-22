import React, { useState } from "react";
import { CheckCircle2, Clock, Plus, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const { tasks, addTask, toggleTaskStatus } = useAuth();
  const [newTitle, setNewTitle] = useState("");

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      id: Date.now(),
      title: newTitle,
      dueDate: "2026-08-15",
      priority: "Medium",
      status: "Pending",
      category: "General",
    });

    setNewTitle("");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Task Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Tasks: {tasks.length} | Pending: {tasks.filter(t => t.status !== "Completed").length}
          </p>
        </div>
      </div>

      {/* Quick Add Task Form */}
      <form onSubmit={handleCreateTask} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task title..."
          className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </form>

      {/* Interactive Tasks Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  task.status === "Completed"
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                {task.status === "Completed" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </button>

              <div>
                <h3 className={`text-sm font-bold ${task.status === "Completed" ? "line-through text-slate-400" : "text-slate-900 dark:text-white"}`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {task.dueDate}</span>
                  <span>•</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{task.category}</span>
                </div>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
              task.priority === "High" ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            }`}>
              {task.priority} Priority
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}