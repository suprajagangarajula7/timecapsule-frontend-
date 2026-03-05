import { useEffect, useState } from "react";
import api from "../services/api";
import MemoryCard from "../components/MemoryCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-b
        from-[#f8f5f1] to-[#f1e7dd]
        dark:from-[#121212] dark:to-[#1c1c1c]
      ">
        <p className="text-[#7a5c4d] dark:text-gray-300 text-lg animate-pulse">
          Loading memories...
        </p>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="
      min-h-screen
      px-4 sm:px-6 md:px-10
      py-8
      bg-gradient-to-b
      from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
      transition-colors duration-300
    ">

      {/* HEADER */}
      <div className="
        flex flex-col md:flex-row
        md:items-center md:justify-between
        gap-4
        mb-10
      ">

        <h2 className="
          text-2xl sm:text-3xl
          font-serif
          text-[#3e2f26]
          dark:text-white
        ">
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
            shadow-md
            hover:scale-105
            transition
            w-full sm:w-auto
          "
        >
          + Create Memory
        </button>

      </div>

      {/* EMPTY STATE */}

      {capsules.length === 0 ? (

        <div className="
          flex flex-col items-center
          justify-center
          mt-20
          text-center
        ">

          <p className="
            text-[#7a5c4d]
            dark:text-gray-300
            text-lg
          ">
            No memories created yet ✨
          </p>

          <button
            onClick={() => navigate("/create")}
            className="
              mt-6
              px-8 py-3
              rounded-full
              text-white
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              shadow-md
              hover:scale-105
              transition
            "
          >
            Create Your First Memory
          </button>

        </div>

      ) : (

        /* CAPSULE GRID */

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          items-start
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