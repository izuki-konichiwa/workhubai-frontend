import React, { useState } from "react";
import { Search, Mail, Phone, Filter, UserPlus, MoreVertical, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Faculty() {
  const { activeRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const facultyMembers = [
    { id: 1, name: "Dr. Aris Thorne", role: "Associate Professor", dept: "Computer Science", email: "a.thorne@workhub.edu", tasks: 4, status: "Active" },
    { id: 2, name: "Prof. Elena Rostova", role: "Assistant Professor", dept: "Data Science", email: "e.rostova@workhub.edu", tasks: 2, status: "Active" },
    { id: 3, name: "Dr. Marcus Vance", role: "Senior Lecturer", dept: "Cybersecurity", email: "m.vance@workhub.edu", tasks: 6, status: "On Leave" },
    { id: 4, name: "Prof. Sarah Jenkins", role: "Dept. Coordinator", dept: "Computer Science", email: "s.jenkins@workhub.edu", tasks: 3, status: "Active" },
  ];

  const filteredFaculty = facultyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Faculty Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage department staff, workload distribution, and role assignments.
          </p>
        </div>

        {activeRole === "Head of Department" && (
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all">
            <UserPlus className="w-4 h-4" /> Add Faculty Member
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500/40 transition-all shadow-sm flex items-start justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-base shadow-md">
                {member.name.split(" ")[1]?.[0] || member.name[0]}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      member.status === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {member.role} · {member.dept}
                </p>
                <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {member.email}
                  </span>
                </div>
              </div>
            </div>

            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}