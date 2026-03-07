import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  });

  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

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

    // logout user and go to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  } catch (err) {

    console.error(err);
    alert("Update failed");

  }

  setSaving(false);
};


  if(loading)
    return (
      <div className="p-10 text-center dark:text-white">
        Loading profile...
      </div>
    );


  const avatarName = `${formData.firstName}+${formData.lastName}`;

  return (

<div className="
min-h-screen
bg-gradient-to-b
from-[#f8f5f1] to-[#f1e7dd]
dark:from-[#121212] dark:to-[#1c1c1c]
px-4 sm:px-6
py-10
">

<div className="
max-w-xl
mx-auto
bg-white
dark:bg-gray-900
p-6 sm:p-8
rounded-3xl
shadow-xl
border border-[#ece6df]
dark:border-gray-700
">

<h2 className="
text-2xl sm:text-3xl
font-serif
font-bold
mb-6
text-[#3b2a21]
dark:text-white
text-center
">
Edit Profile
</h2>

{/* Avatar */}

<div className="flex justify-center mb-6">

<img
src={`https://ui-avatars.com/api/?background=b08968&color=fff&name=${avatarName}`}
className="w-20 h-20 rounded-full shadow"
/>

</div>

<form
onSubmit={handleSubmit}
className="space-y-4"
>

{/* FIRST + LAST NAME */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<input
name="firstName"
value={formData.firstName}
onChange={handleChange}
placeholder="First Name"
className="
w-full p-3 border rounded-xl
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>

<input
name="lastName"
value={formData.lastName}
onChange={handleChange}
placeholder="Last Name"
className="
w-full p-3 border rounded-xl
focus:ring-2 focus:ring-[#b08968]
outline-none
dark:bg-gray-800
dark:text-white
"
/>

</div>


{/* EMAIL */}

<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email"
className="
w-full p-3 border rounded-xl
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
w-full p-3 border rounded-xl
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
rounded-full
font-medium
hover:scale-[1.02]
transition
shadow-md
"
>

{saving ? "Saving..." : "Save Changes"}

</button>

</form>

</div>

</div>

  );

}