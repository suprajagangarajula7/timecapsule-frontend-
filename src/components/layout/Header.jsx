import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

export default function Header({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [showProfile, setShowProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving,setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  });

  const profileRef = useRef(null);

  /* ================= FETCH USER ================= */

  useEffect(()=>{

    const fetchUser = async()=>{

      try{

        const res = await api.get("/auth/me");

        setUser(res.data);

        setFormData({
          firstName:res.data.firstName || "",
          lastName:res.data.lastName || "",
          email:res.data.email || "",
          password:""
        });

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

      }catch{
        console.log("User fetch failed");
      }

    };

    fetchUser();

  },[]);

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(()=>{

    const handler=(e)=>{

      if(
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ){
        setShowProfile(false);
        setEditMode(false);
      }

    };

    document.addEventListener("mousedown",handler);

    return () =>
      document.removeEventListener("mousedown",handler);

  },[]);

  /* ================= INPUT ================= */

  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };

  /* ================= UPDATE PROFILE ================= */

  const handleUpdate=async()=>{

    try{

      setSaving(true);

      const res = await api.put(
        "/auth/update",
        formData
      );

      setUser(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      setEditMode(false);

    }catch{
      alert("Update failed");
    }

    setSaving(false);

  };

  /* ================= LOGOUT ================= */

  const handleLogout=()=>{

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
border-b border-[#ece6df]
dark:border-gray-700
shadow-sm px-6 md:px-10 py-4
flex justify-between items-center
transition-colors duration-300
">

{/* LOGO */}

<h1
onClick={()=>navigate("/dashboard")}
className="
text-2xl md:text-4xl font-serif font-bold
text-[#3b2a21]
dark:text-white
cursor-pointer
hover:scale-105
transition
"
>
⏳ Retrospect
</h1>

<div className="flex items-center gap-3 md:gap-4">

<Link
to="/dashboard"
className="
px-4 py-2 rounded-full
bg-white dark:bg-gray-800
dark:text-white border
hover:shadow-md
hover:scale-105
transition
"
>
Dashboard
</Link>

<Link
to="/create"
className="
px-4 py-2 rounded-full
bg-white dark:bg-gray-800
dark:text-white border
hover:shadow-md
hover:scale-105
transition
"
>
Lock a Memory
</Link>

{/* PROFILE */}

<div
className="relative"
ref={profileRef}
>

<div
onClick={()=>setShowProfile(!showProfile)}
className="
flex items-center gap-2
bg-white dark:bg-gray-800
px-3 py-1 rounded-full
shadow cursor-pointer
hover:shadow-lg
hover:scale-105
transition
"
>

<img
src={`https://ui-avatars.com/api/?background=b08968&color=fff&name=${avatarName}`}
className="
w-8 h-8 rounded-full
transition
hover:rotate-6
"
/>

<span className="
text-sm
text-[#3e2f26]
dark:text-white
font-medium
">
{fullName}
</span>

</div>

{/* DROPDOWN */}

{showProfile && (

<div className="
absolute right-0 mt-3 w-72
bg-white/95 dark:bg-gray-900/95
backdrop-blur-md
rounded-xl shadow-xl
border p-4 z-50
animate-[fadeIn_.25s_ease]
">

<h3 className="font-semibold dark:text-white">
Account Details
</h3>

{/* VIEW MODE */}

{!editMode && (

<>

<p className="text-sm mt-2 dark:text-gray-300">
Name: {fullName}
</p>

<p className="text-sm dark:text-gray-300">
Email: {user?.email}
</p>

<p className="text-sm dark:text-gray-300">
Password: ********
</p>

<button
onClick={()=>navigate("/profile")}
className="
mt-3 text-blue-500
text-sm font-medium
hover:underline
"
>
Edit Profile
</button>

</>

)}

{/* EDIT MODE */}

{editMode && (

<div className="space-y-3 mt-3">

<input
name="firstName"
value={formData.firstName}
onChange={handleChange}
placeholder="First Name"
className="
w-full border rounded-lg
p-2 text-sm
focus:ring-2
focus:ring-[#b08968]
outline-none
dark:bg-gray-800
"
/>

<input
name="lastName"
value={formData.lastName}
onChange={handleChange}
placeholder="Last Name"
className="
w-full border rounded-lg
p-2 text-sm
focus:ring-2
focus:ring-[#b08968]
outline-none
dark:bg-gray-800
"
/>

<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email"
className="
w-full border rounded-lg
p-2 text-sm
focus:ring-2
focus:ring-[#b08968]
outline-none
dark:bg-gray-800
"
/>

<input
name="password"
type="password"
value={formData.password}
onChange={handleChange}
placeholder="New Password"
className="
w-full border rounded-lg
p-2 text-sm
focus:ring-2
focus:ring-[#b08968]
outline-none
dark:bg-gray-800
"
/>

<button
onClick={handleUpdate}
className="
w-full bg-gradient-to-r
from-[#b08968]
to-[#a07155]
text-white py-2
rounded-lg
hover:opacity-90
transition
"
>

{saving ? "Saving..." : "Save Changes"}

</button>

</div>

)}

<hr className="my-3" />

<button
onClick={()=>setDarkMode(!darkMode)}
className="w-full text-left py-2 hover:opacity-70 transition"
>
{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

<button
onClick={handleLogout}
className="
w-full text-left py-2
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