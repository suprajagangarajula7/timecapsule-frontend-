import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  });

  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  /* ================= FETCH USER ================= */

  useEffect(()=>{

    const fetchUser = async()=>{

      try{

        const res = await api.get("/auth/me");

        setFormData({
          firstName:res.data.firstName || "",
          lastName:res.data.lastName || "",
          email:res.data.email || "",
          password:""
        });

      }catch{

        alert("Failed to load profile");

      }

      setLoading(false);

    };

    fetchUser();

  },[]);


  /* ================= INPUT CHANGE ================= */

  const handleChange=(e)=>{

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  };


  /* ================= UPDATE PROFILE ================= */

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      setSaving(true);

      const res = await api.put(
        "/auth/update-profile",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Updated Successfully 🎉");

      window.location.reload();

    }catch{

      alert("Update failed");

    }

    setSaving(false);

  };


  /* ================= LOADING ================= */

  if(loading)
    return (
      <div className="p-10 text-center dark:text-white">
        Loading profile...
      </div>
    );


  /* ================= UI ================= */

  return (

<div className="min-h-screen bg-[#f8f5f1] dark:bg-[#121212] transition-colors duration-300">

<div className="max-w-xl mx-auto mt-14 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">

<h2 className="text-3xl font-serif font-bold mb-6 text-[#3b2a21] dark:text-white">
Edit Profile
</h2>


<form
onSubmit={handleSubmit}
className="space-y-5"
>

{/* FIRST NAME */}

<input
name="firstName"
value={formData.firstName}
onChange={handleChange}
placeholder="First Name"
className="
w-full p-3 border rounded-lg
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>


{/* LAST NAME */}

<input
name="lastName"
value={formData.lastName}
onChange={handleChange}
placeholder="Last Name"
className="
w-full p-3 border rounded-lg
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>


{/* EMAIL */}

<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email"
className="
w-full p-3 border rounded-lg
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>


{/* PASSWORD */}

<input
name="password"
type="password"
value={formData.password}
onChange={handleChange}
placeholder="New Password (optional)"
className="
w-full p-3 border rounded-lg
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>


{/* SAVE BUTTON */}

<button
type="submit"
className="
w-full py-3
bg-gradient-to-r
from-[#b08968]
to-[#9c6644]
text-white
rounded-lg
font-medium
hover:opacity-90
transition
"
>

{saving ? "Saving..." : "Save Changes"}

</button>

</form>

</div>

</div>

  );

}