import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  /* ✅ FORM STATE */
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

  /* ✅ INPUT CHANGE */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ✅ REGISTER USER */
  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Fill all fields");
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
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">

      <form
        onSubmit={registerUser}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        {/* FIRST + LAST NAME */}
        <div className="flex gap-3">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />
        </div>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        {/* PASSWORD */}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full py-3 rounded"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

      </form>
    </div>
  );
}