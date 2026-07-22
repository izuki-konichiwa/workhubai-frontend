import React from "react";
import { useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function MainApp() {
  const { isAuthenticated } = useAuth();

  // If user is not logged in, show the Login / Sign Up screen
  if (!isAuthenticated) {
    return <Login />;
  }

  // Otherwise, render the main dashboard app layout
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}