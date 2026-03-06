import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const res = await api.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);

      alert("Welcome 🎉");

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      px-6 py-10
      bg-gradient-to-b
      from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
    ">

      <form
        onSubmit={registerUser}
        className="
          w-full max-w-md
          bg-gradient-to-br
          from-[#fff7ef] to-[#f8f5f1]
          dark:from-[#1f1f1f] dark:to-[#2a2a2a]
          border border-[#ece6df]
          dark:border-gray-700
          rounded-3xl
          shadow-2xl
          p-6 sm:p-8
          space-y-5
        "
      >

        <h2 className="
          text-2xl sm:text-3xl
          font-serif
          text-center
          text-[#3e2f26]
          dark:text-white
        ">
          Create Account
        </h2>

        {/* FIRST + LAST NAME */}
        <div className="flex flex-col sm:flex-row gap-3">

          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#b08968]
            "
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#b08968]
            "
          />

        </div>

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="
            w-full p-3 rounded-xl border
            bg-white text-gray-800
            dark:bg-gray-800 dark:text-white
            focus:ring-2 focus:ring-[#b08968]
          "
        />

        {/* PASSWORD */}
        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#b08968]
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute right-3 top-3
              text-sm text-gray-500
            "
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">

          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="
              w-full p-3 rounded-xl border
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-white
              focus:ring-2 focus:ring-[#b08968]
            "
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="
              absolute right-3 top-3
              text-sm text-gray-500
            "
          >
            {showConfirm ? "Hide" : "Show"}
          </button>

        </div>

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3
            rounded-full
            text-white
            bg-gradient-to-r
            from-[#b08968]
            to-[#a07155]
            shadow-md
            hover:scale-[1.02]
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* LOGIN LINK */}
        <p className="
          text-center text-sm
          text-[#7a5c4d]
          dark:text-gray-400
        ">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="
              cursor-pointer
              font-medium
              text-[#a07155]
              hover:underline
            "
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}