import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
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

        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-[#f8f5f1]">
                <Header />
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-[#f8f5f1]">
                <Header />
                <CreateCapsule />
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
