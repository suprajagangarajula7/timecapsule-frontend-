import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthHome from "./pages/AuthHome";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import MemoryDetails from "./pages/MemoryDetails";

import SharedCapsule from "./pages/SharedCapsule";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import Profile from "./pages/Profile";
import Journal from "./pages/Journal";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  /* ✅ GLOBAL THEME STATE */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* ✅ APPLY THEME TO HTML */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>

      {/* GLOBAL BACKGROUND */}
      <div className="min-h-screen bg-[#f8f5f1] dark:bg-[#1a1a1a] transition-colors duration-300">

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<AuthHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

          {/* SHARE CAPSULE */}
          <Route
            path="/share/:token"
            element={
              <ProtectedRoute>
                <SharedCapsule />
              </ProtectedRoute>
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />

          {/* MEMORY DETAILS */}
          <Route
            path="/capsule/:id"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <MemoryDetails />
                </>
              </ProtectedRoute>
            }
          />

          {/* CREATE CAPSULE */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <CreateCapsule />
                </>
              </ProtectedRoute>
            }
          />

          {/* JOURNAL PAGE */}
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <Journal />
                </>
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <>
                  <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                  <Profile
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />
                </>
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}
