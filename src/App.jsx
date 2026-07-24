import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Tasks from "./pages/Tasks";
import AiKnowledge from "./pages/AiKnowledge";
import Login from "./pages/Login";

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 1. Unauthenticated users always see Login
  if (!isAuthenticated) {
    return <Login />;
  }

  // 2. Authenticated users see the Layout + Sidebar + Topbar + Pages
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Toggleable Sidebar */}
      {sidebarOpen && <Sidebar />}

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar receives toggle function */}
        <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Page Content View */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/ai-knowledge" element={<AiKnowledge />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}