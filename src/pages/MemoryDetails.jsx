import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function MemoryDetails() {

  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetchCapsule();
  }, []);
  
  useEffect(() => {
  if (capsule) {
    setAuthorized(false);
  }
}, [capsule]);

  useEffect(() => {
    if (!capsule || !capsule.is_locked) return;

    const interval = setInterval(() => {
      const now = new Date();
      const unlock = new Date(capsule.unlock_at);
      const diff = unlock - now;

      if (diff <= 0) {
        clearInterval(interval);
        fetchCapsule();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );

    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

 const fetchCapsule = async () => {
  try {
    const res = await api.get(`/capsules/${id}`);
    console.log("CAPSULE DATA:", res.data); // 👈 ADD THIS
    setCapsule(res.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading)
    return <p className="p-10 dark:text-white">Loading...</p>;

  if (!capsule)
    return <p className="p-10 dark:text-white">Not Found</p>;

  const images = capsule.images || [];
  const videos = capsule.videos || [];
  const audios = capsule.audios || [];

 // 🔒 STILL LOCKED BY TIME
if (capsule.is_locked) {
  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
      px-6
    ">
      <div className="
        bg-white dark:bg-[#1f1f1f]
        p-8 rounded-3xl shadow-2xl
        text-center max-w-md w-full
      ">
        <h2 className="text-2xl font-serif mb-4 dark:text-white">
          🔒 Memory Locked
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Unlocks in:
        </p>

        <div className="text-xl font-bold mb-6 text-[#b08968]">
          {timeLeft}
        </div>
      </div>
    </div>
  );
}

// 🔐 PASSWORD PROTECTION (ONLY AFTER UNLOCK TIME PASSED)
if (!capsule.is_locked && capsule.password && !authorized) {
  return (
    <div className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
      px-6
    ">
      <div className="
        bg-white dark:bg-[#1f1f1f]
        p-8 rounded-3xl shadow-2xl
        max-w-md w-full text-center
      ">
        <h2 className="text-2xl font-serif mb-6 dark:text-white">
          🔐 Enter Password
        </h2>

        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <button
          onClick={() => {
            if (passwordInput === capsule.password) {
              setAuthorized(true);
            } else {
              alert("Incorrect password");
            }
          }}
          className="
            w-full py-3 rounded-full text-white
            bg-gradient-to-r from-[#b08968] to-[#a07155]
            hover:scale-[1.02] transition
          "
        >
          Unlock Memory
        </button>
      </div>
    </div>
  );
}

  /* 🌸 UNLOCKED VIEW */
  return (
    <div className="
      min-h-screen px-6 md:px-16 py-12
      bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
    ">

      <div className="
        max-w-4xl mx-auto
        bg-white dark:bg-[#1f1f1f]
        p-8 md:p-12
        rounded-3xl shadow-2xl
      ">

        <h1 className="text-3xl font-serif mb-6 dark:text-white">
          {capsule.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {capsule.message}
        </p>

        {/* 📍 Location Map */}
        {capsule.latitude !== null && capsule.longitude !== null && (
          <div className="mb-8">
            <h3 className="mb-3 font-semibold dark:text-white">
              📍 Memory Location
            </h3>

            <iframe
              title="map"
              width="100%"
              height="300"
              className="rounded-xl"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${capsule.latitude},${capsule.longitude}&z=15&output=embed`}
            />
          </div>
        )}

        {/* IMAGES */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="rounded-xl shadow-md"
              />
            ))}
          </div>
        )}

        {/* VIDEOS */}
        {videos.length > 0 && (
          <div className="space-y-6 mb-8">
            {videos.map((video, i) => (
              <video
                key={i}
                controls
                className="w-full rounded-xl shadow-md"
              >
                <source src={video} />
              </video>
            ))}
          </div>
        )}

        {/* AUDIOS */}
        {audios.length > 0 && (
          <div className="space-y-6">
            {audios.map((audio, i) => (
              <audio
                key={i}
                controls
                className="w-full"
              >
                <source src={audio} />
              </audio>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}