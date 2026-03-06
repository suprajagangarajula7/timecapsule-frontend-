import { useState } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      navigate(from, { replace: true });

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="
      min-h-screen flex
      bg-gradient-to-b
      from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
    ">

      {/* ================= LEFT SIDE ================= */}
      <div className="
        hidden lg:flex flex-1
        items-center justify-center
        px-12
      ">
        <div className="max-w-lg space-y-8">

          <h1 className="
            text-4xl xl:text-5xl
            font-serif
            text-[#3e2f26]
            dark:text-white
            leading-tight
          ">
            Your stories are safe,
            <br /> your memories are secure.
          </h1>

          <p className="
            text-gray-700
            dark:text-gray-300
            text-lg
          ">
            Log in to preserve or receive the moments that matter most.
          </p>

          <div className="space-y-6">

            <div className="
              bg-white/70 dark:bg-gray-800/60
              backdrop-blur
              rounded-2xl
              p-6
              shadow-md
              border border-[#ece6df]
              dark:border-gray-700
            ">
              <p className="
                italic
                text-[#7a5c4d]
                dark:text-gray-300
                font-medium
              ">
                “Preserve the voice of your life.”
              </p>
            </div>

            <div className="
              bg-white/70 dark:bg-gray-800/60
              backdrop-blur
              rounded-2xl
              p-6
              shadow-md
              border border-[#ece6df]
              dark:border-gray-700
            ">
              <p className="
                italic
                text-[#7a5c4d]
                dark:text-gray-300
                font-medium
              ">
                “How would you feel if you received one?”
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= LOGIN CARD ================= */}
      <div className="
        flex flex-1
        items-center justify-center
        px-6 py-10
      ">

        <form
          onSubmit={handleLogin}
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
            space-y-6
          "
        >

          {/* Title */}
          <div className="text-center space-y-2">

            <h2 className="
              text-2xl sm:text-3xl
              font-serif
              text-[#3e2f26]
              dark:text-white
            ">
              Welcome Back
            </h2>

            <p className="
              text-gray-500
              dark:text-gray-400
              text-sm
            ">
              Continue your journey with Retrospect
            </p>

          </div>

          {/* Google Button */}
          <button
            type="button"
            className="
              w-full
              border border-gray-300
              dark:border-gray-600
              rounded-xl
              py-3
              flex items-center justify-center gap-3
              hover:bg-gray-50
              dark:hover:bg-gray-700
              transition
            "
          >
            🌐 Continue with Google
          </button>

          {/* Divider */}
          <div className="
            flex items-center gap-3
            text-sm text-gray-400
          ">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"/>
            OR CONTINUE WITH
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"/>
          </div>

          {/* Email */}
          <div className="space-y-1">

            <label className="
              text-sm
              text-gray-600
              dark:text-gray-300
            ">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border border-[#e5ded6]
                dark:border-gray-600
                rounded-xl
                px-4 py-3
                bg-white
                dark:bg-gray-800
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-[#b08968]
              "
            />

          </div>

          {/* Password */}
          <div className="space-y-1">

            <div className="flex justify-between text-sm">

              <label className="
                text-gray-600
                dark:text-gray-300
              ">
                Password
              </label>

              <button
                type="button"
                className="
                  text-[#b08968]
                  hover:underline
                "
              >
                Forgot Password?
              </button>

            </div>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  border border-[#e5ded6]
                  dark:border-gray-600
                  rounded-xl
                  px-4 py-3 pr-12
                  bg-white
                  dark:bg-gray-800
                  dark:text-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#b08968]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-3
                  text-gray-400
                "
              >
                👁
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-full
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              text-white
              font-medium
              hover:scale-[1.02]
              transition
              shadow-md
            "
          >
            Log In
          </button>

          {/* Footer */}
          <p className="
            text-center text-sm
            text-gray-500
            dark:text-gray-400
          ">
            New here?{" "}
            <span
              onClick={() => navigate("/register")}
              className="
                text-[#b08968]
                cursor-pointer
                hover:underline
              "
            >
              Create an account
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}