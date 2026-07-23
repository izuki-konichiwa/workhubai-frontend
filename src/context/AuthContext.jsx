import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeRole, setActiveRole] = useState("Head of Department");
  const [theme, setTheme] = useState("dark");

  const [user, setUser] = useState({
    name: "Dr. Sarah Jenkins",
    email: "s.jenkins@workhub.edu",
    avatar: "SJ",
  });

  // --- GLOBAL APP STATE ---
  const [faculty, setFaculty] = useState([
    { id: 1, name: "Dr. Aris Thorne", role: "Associate Professor", dept: "Computer Science", email: "a.thorne@workhub.edu", tasks: 4, status: "Active" },
    { id: 2, name: "Prof. Elena Rostova", role: "Assistant Professor", dept: "Data Science", email: "e.rostova@workhub.edu", tasks: 2, status: "Active" },
    { id: 3, name: "Dr. Marcus Vance", role: "Senior Lecturer", dept: "Cybersecurity", email: "m.vance@workhub.edu", tasks: 6, status: "On Leave" },
    { id: 4, name: "Prof. Sarah Jenkins", role: "Dept. Coordinator", dept: "Computer Science", email: "s.jenkins@workhub.edu", tasks: 3, status: "Active" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Submit Mid-Semester Grades", dueDate: "2026-08-01", priority: "High", status: "Pending", category: "Academic" },
    { id: 2, title: "Curriculum Review Meeting Agenda", dueDate: "2026-07-28", priority: "Medium", status: "In Progress", category: "Department" },
    { id: 3, title: "Approve Faculty Leave Applications", dueDate: "2026-07-25", priority: "High", status: "Pending", category: "Approvals" },
    { id: 4, title: "Upload Course Syllabus PDF", dueDate: "2026-08-10", priority: "Low", status: "Completed", category: "Documentation" },
  ]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = () => setIsAuthenticated(false);

  // Dynamic login accepting user parameters
  const login = (userData) => {
    if (userData) {
      const name = userData.name || "User";

      // Auto-generate avatar initials
      const nameParts = name.trim().split(" ");
      const avatar = nameParts.length > 1 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();

      setUser({
        name: name,
        email: userData.email || `${name.toLowerCase().replace(/\s+/g, ".")}@workhub.ai`,
        avatar: avatar,
      });

      if (userData.role) {
        setActiveRole(userData.role);
      }
    }
    setIsAuthenticated(true);
  };

  // Task actions
  const addTask = (newTask) => setTasks((prev) => [newTask, ...prev]);
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" } : t
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        activeRole,
        setActiveRole,
        theme,
        toggleTheme,
        user,
        setUser,
        logout,
        login,
        faculty,
        setFaculty,
        tasks,
        setTasks,
        addTask,
        toggleTaskStatus,
      }}
    >
      <div className={theme === "dark" ? "dark" : ""}>{children}</div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);