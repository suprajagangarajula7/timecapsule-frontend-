import { useEffect, useState } from "react";
import api from "../services/api";
import MemoryCard from "../components/MemoryCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ FIX
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchCapsules();
    }
  }, []);

  const fetchCapsules = async () => {
    try {
      const res = await api.get("/capsules");
      setCapsules(res.data);
    } catch (error) {
      console.error("Error fetching capsules:", error);
    } finally {
      setLoading(false); // ✅ stop loading AFTER fetch
    }
  };

  const deleteCapsule = async (id) => {
    try {
      await api.delete(`/capsules/${id}`);
      fetchCapsules();
    } catch (error) {
      console.error("Error deleting capsule:", error);
    }
  };

  /* ✅ PREVENT FLICKER */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]">
        <p className="text-[#7a5c4d] text-lg">
          Loading capsules...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] px-10 py-10">

      {/* TITLE */}
      <h2 className="text-3xl font-serif text-[#3e2f26] mb-8">
        Your Capsules 💌
      </h2>

      {/* EMPTY STATE */}
      {capsules.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-center">

          <p className="text-[#7a5c4d] text-lg">
            No capsules created yet ✨
          </p>

          <button
            onClick={() => navigate("/create")}
            className="
              mt-6
              px-8 py-3
              rounded-full
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              text-white
              shadow-md
              hover:scale-105
              transition
            "
          >
            Create Your First Capsule
          </button>

        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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