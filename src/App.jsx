import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import AuthHome from "./pages/AuthHome";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

import SharedCapsule from "./pages/SharedCapsule";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import CreateCapsule from "./pages/CreateCapsule";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

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

      {/* ✅ GLOBAL BACKGROUND */}
      <div className="min-h-screen bg-[#f8f5f1] dark:bg-[#1a1a1a] transition-colors duration-300">

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<AuthHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />

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

          {/* CREATE */}
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

        </Routes>

      </div>

    </BrowserRouter>
  );
}
