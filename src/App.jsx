import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Tasks from "./pages/Tasks";
import AiKnowledge from "./pages/AiKnowledge";
import Login from "./pages/Login";

function MainApp() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
    <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/ai-knowledge" element={<AiKnowledge />} />
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