
import { useEffect, useState } from "react";
import api from "../services/api";
import MemoryCard from "../components/MemoryCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifiedCapsules, setNotifiedCapsules] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchCapsules();
    }

    if ("Notification" in window) {
      Notification.requestPermission();
    }

  }, []);

  const fetchCapsules = async () => {
    try {
      const res = await api.get("/capsules");
      setCapsules(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCapsule = async (id) => {
    try {
      await api.delete(`/capsules/${id}`);
      fetchCapsules();
    } catch (error) {
      console.error(error);
    }
  };

  const playTimerSound = () => {
    const audio = new Audio("/timer-end.mp3");
    audio.play().catch(() => {});
  };


  const checkUnlockedCapsules = async () => {

    try {

      const res = await api.get("/capsules");

      res.data.forEach((capsule) => {

        const now = new Date();
        const unlockTime = new Date(capsule.unlock_at);

        if (
          now >= unlockTime &&
          !notifiedCapsules.includes(capsule.id)
        ) {

          playTimerSound();
          showUnlockNotification(capsule.title);

          setNotifiedCapsules(prev => [...prev, capsule.id]);

        }

      });

    } catch (err) {
      console.log(err);
    }

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading memories...</p>
      </div>
    );
  }

  return (

<div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] dark:from-[#1c1c1c] dark:to-[#121212] px-4 sm:px-6 md:px-10 py-8">

{/* HEADER */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

<h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#3e2f26] dark:text-white">
Your Memories 💌
</h2>

<button
onClick={() => navigate("/create")}
className="
px-6 py-2.5
rounded-full
text-white
bg-gradient-to-r
from-[#b08968]
to-[#a07155]
hover:scale-105
transition
shadow-md
w-full sm:w-auto
"
>
+ Create Memory
</button>

</div>

{/* EMPTY */}

{capsules.length === 0 ? (

<div className="text-center mt-20">

<p className="text-gray-700 dark:text-gray-300 text-lg">
No memories created yet ✨
</p>

<button
onClick={() => navigate("/create")}
className="
mt-6
px-6 py-3
rounded-full
text-white
bg-gradient-to-r
from-[#b08968]
to-[#a07155]
hover:scale-105
transition
shadow-md
"
>
Create Your First Memory
</button>

</div>

) : (

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-6
">

{capsules.map((capsule) => (

<MemoryCard
key={capsule.id}
capsule={capsule}
onDelete={deleteCapsule}
/>

))}

</div>

)}

</div>

);

}

