import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Sparkles, ArrowRight, Lock, Mail, User, Building2, Sun, Moon } from "lucide-react";

export default function Login() {
  const { login, theme, toggleTheme } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Head of Department");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Derive name: Use typed fullName for SignUp, or extract formatted name from email for SignIn
    let derivedName = fullName.trim();
    if (!derivedName && email) {
      const emailPrefix = email.split("@")[0];
      derivedName = emailPrefix
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }

    // Pass structured user object directly to AuthContext
    login({
      name: derivedName || "User",
      email: email,
      role: role,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Theme Switcher floating top-right */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="absolute top-6 right-6 z-50 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-md backdrop-blur-md"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600" />
        )}
      </button>

      {/* Left Decorative Branding Hero Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle grid background accent */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            W
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            WorkHub <span className="text-indigo-400">AI</span>
          </span>
        </div>

        {/* Dynamic Marketing Pitch */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise Workspace
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
            Seamless multi-role department management.
          </h1>
          <p className="text-indigo-200/80 text-sm leading-relaxed">
            Unify Heads of Department, Coordinators, and Faculty into a single intelligent platform with real-time analytics and task management.
          </p>

          {/* Testimonial / Quick Stats */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-bold text-lg">
              8+
            </div>
            <div>
              <p className="text-xs font-bold text-white">Active Academic Departments</p>
              <p className="text-[11px] text-indigo-300/70">Role-Based Permission Controlled</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-indigo-300/60">
          © {new Date().getFullYear()} WorkHub AI System. All rights reserved.
        </div>
      </div>

      {/* Right Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header & Toggle */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isSignUp
                ? "Enter your details to register for WorkHub AI"
                : "Sign in to access your role-based dashboard"}
            </p>
          </div>

          {/* Tab switch between Sign In and Sign Up */}
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                !isSignUp
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-lg transition-all ${
                isSignUp
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field (Only shown on Sign Up) */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="iqra.naaz@workhub.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Select Access Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Select Workspace Role
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-900 dark:text-slate-100 cursor-pointer appearance-none"
                >
                  <option value="Head of Department">Head of Department</option>
                  <option value="Dept. Coordinator">Dept. Coordinator</option>
                  <option value="Faculty Member">Faculty Member</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 mt-2"
            >
              {isSignUp ? "Create Workspace Account" : "Sign In to Workspace"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switch helper message */}
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 text-center">
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
              💡 <b>Demo Mode Active:</b> Enter any credentials and select a role to preview instant RBAC rendering.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}