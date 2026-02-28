import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ Send only required fields to backend
      const res = await api.post("/auth/register", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);

      alert("Welcome to Retrospect 🎉");
      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:flex flex-1 items-center justify-center px-12">
        <div className="max-w-lg space-y-8">

          <h1 className="text-5xl font-serif text-[#3e2f26] leading-tight">
            Your stories are safe,
            <br /> your memories are secure.
          </h1>

          <p className="text-gray-700 text-lg">
            Create your vault and preserve memories for the future.
          </p>

          <div className="space-y-6">
            <div className="bg-white/70 rounded-2xl p-6 shadow-md border border-[#ece6df]">
              <p className="italic text-[#7a5c4d] font-medium">
                “Preserve the Voice of Your Life”
              </p>
            </div>

            <div className="bg-white/70 rounded-2xl p-6 shadow-md border border-[#ece6df]">
              <p className="italic text-[#7a5c4d] font-medium">
                “How would you feel if you received one?”
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SIGNUP CARD ================= */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <form
          onSubmit={registerUser}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#ece6df] p-8 space-y-5"
        >

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-serif text-[#3e2f26]">
              Create Account
            </h2>
            <p className="text-sm text-gray-500">
              Begin your Retrospect journey
            </p>
          </div>

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#e5ded6] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#b08968] outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-[#e5ded6] rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-[#b08968]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              👁
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-[#e5ded6] rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-[#b08968]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3"
            >
              👁
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b08968] to-[#a07155] text-white font-medium hover:scale-[1.02] transition shadow-md disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#b08968] cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}