import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function Header({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );



  const [showProfile, setShowProfile] =
    useState(false);

  const profileRef = useRef(null);

  /* ===== FETCH USER ===== */
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");

        setUser(res.data);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

      } catch {
        console.log("User fetch failed");
      }
    };

    fetchUser();

  }, []);



  /* ===== CLOSE OUTSIDE CLICK ===== */
  useEffect(() => {

    const handler = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );

  }, []);

  /* ===== LOGOUT ===== */
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    window.location.reload();
  };

  /* ✅ FULL NAME */
  const fullName =
    user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`
      : "User";

  const avatarName =
    user?.firstName
      ? `${user.firstName}+${user.lastName || ""}`
      : user?.email || "User";

  return (
    <header className="
      bg-[#f8f5f1] dark:bg-[#1c1c1c]
      border-b border-[#ece6df]
      dark:border-gray-700
      shadow-sm px-10 py-4
      flex justify-between items-center
    ">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="
        text-4xl font-serif font-bold
        text-[#3b2a21]
        dark:text-white
        cursor-pointer
      ">
        ⏳ Retrospect
      </h1>

      <div className="flex items-center gap-4">

        <Link
          to="/dashboard"
          className="px-5 py-2 rounded-full
          bg-white dark:bg-gray-800
          dark:text-white border">
          Dashboard
        </Link>

        <Link
          to="/create"
          className="px-5 py-2 rounded-full
          bg-white dark:bg-gray-800
          dark:text-white border">
          Create Capsule
        </Link>

        {/* PROFILE */}
        <div
          className="relative"
          ref={profileRef}
        >

          <div
            onClick={() =>
              setShowProfile(!showProfile)
            }
            className="
            flex items-center gap-2
            bg-white dark:bg-gray-800
            px-3 py-1 rounded-full
            shadow cursor-pointer"
          >

            <img
              src={`https://ui-avatars.com/api/?background=b08968&color=fff&name=${avatarName}`}
              className="w-8 h-8 rounded-full"
              alt="profile"
            />

            <span className="
              text-sm
              text-[#3e2f26]
              dark:text-white">
              {fullName}
            </span>
          </div>

          {/* DROPDOWN */}
          {showProfile && (
            <div className="
              absolute right-0 mt-3 w-72
              bg-white dark:bg-gray-900
              rounded-xl shadow-xl
              border p-4 z-50
            ">

              <h3 className="font-semibold dark:text-white">
                Account Details
              </h3>

              {/* ✅ NAME ADDED */}
              <p className="text-sm mt-2 dark:text-gray-300">
                Name: {fullName}
              </p>

              <p className="text-sm dark:text-gray-300">
                Email: {user?.email || "Not Available"}
              </p>

              <p className="text-sm dark:text-gray-300">
                Password: ********
              </p>

              <hr className="my-3" />

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-full text-left py-2">
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={handleLogout}
                className="
                w-full text-left py-2
                text-red-500">
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}