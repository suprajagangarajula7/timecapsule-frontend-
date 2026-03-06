import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function Header({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);


  /* FETCH USER */

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


  /* CLOSE PROFILE DROPDOWN */

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
      document.removeEventListener("mousedown", handler);

  }, []);


  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();

  };


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

border-b border-[#ece6df] dark:border-gray-700

shadow-sm

px-4 sm:px-6 md:px-10

py-3 sm:py-4

flex flex-wrap items-center justify-between

gap-3

transition-colors duration-300

">

{/* LOGO */}

<h1
onClick={() => navigate("/dashboard")}
className="

text-xl sm:text-2xl md:text-4xl

font-serif font-bold

text-[#3b2a21] dark:text-white

cursor-pointer

hover:scale-105

transition

"
>
⏳ Retrospect
</h1>



{/* NAVIGATION */}

<div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">

<Link
to="/dashboard"
className="

px-3 sm:px-4

py-1.5 sm:py-2

rounded-full

text-sm sm:text-base

bg-white dark:bg-gray-800

text-[#3b2a21] dark:text-white

border border-[#e5ddd5] dark:border-gray-600

hover:shadow-md

hover:scale-105

transition

"
>
Dashboard
</Link>



<button
onClick={() => navigate("/journal")}
className="

px-4 sm:px-6

py-2 sm:py-2.5

rounded-full

text-white

text-sm sm:text-base

bg-gradient-to-r

from-[#7a5c4d]

to-[#5a3e32]

shadow-md

hover:scale-105

transition

"
>
📔 Journal
</button>



{/* PROFILE */}

<div
className="relative"
ref={profileRef}
>

<div
onClick={() => setShowProfile(!showProfile)}
className="

flex items-center

gap-2

bg-white dark:bg-gray-800

px-2 sm:px-3

py-1

rounded-full

shadow

cursor-pointer

hover:shadow-lg

hover:scale-105

transition

"
>

<img
src={`https://ui-avatars.com/api/?background=b08968&color=fff&name=${avatarName}`}
className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
/>

<span className="hidden sm:block text-sm text-[#3e2f26] dark:text-white font-medium">
{fullName}
</span>

</div>



{/* DROPDOWN */}

{showProfile && (

<div className="

absolute right-0 mt-3

w-64 sm:w-72

bg-white dark:bg-gray-900

rounded-xl

shadow-xl

border border-gray-200 dark:border-gray-700

p-4

z-50

">

<h3 className="font-semibold text-[#3b2a21] dark:text-white">
Account
</h3>

<p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
{fullName}
</p>

<p className="text-sm text-gray-600 dark:text-gray-300">
{user?.email}
</p>

<hr className="my-3 border-gray-200 dark:border-gray-700" />


{/* PROFILE BUTTON */}

<button
onClick={() => navigate("/profile")}
className="

w-full

text-left

py-2

text-[#3b2a21] dark:text-gray-200

hover:opacity-70

transition

"
>
👤 Profile
</button>



{/* DARK MODE */}

<button
onClick={() => setDarkMode(!darkMode)}
className="

w-full

text-left

py-2

text-[#3b2a21] dark:text-gray-200

hover:opacity-70

transition

"
>
{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>



{/* LOGOUT */}

<button
onClick={handleLogout}
className="

w-full

text-left

py-2

text-red-500

hover:text-red-600

transition

"
>
Logout
</button>

</div>

)}

</div>

</div>

</header>

  );

}
