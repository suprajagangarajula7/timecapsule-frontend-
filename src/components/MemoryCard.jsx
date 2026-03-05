import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added

/* ---------- COUNTDOWN ---------- */
const getRemainingTime = (date) => {
  const total = new Date(date).getTime() - Date.now();

  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / 1000 / 60) % 60;
  const hours = Math.floor(total / 1000 / 60 / 60) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

export default function MemoryCard({ capsule, onDelete }) {

  const navigate = useNavigate(); // ✅ added

  const images =
    typeof capsule.images === "string"
      ? JSON.parse(capsule.images)
      : capsule.images || [];

  const [time, setTime] = useState(
    getRemainingTime(capsule.unlock_at)
  );

  const notified = useRef(false);

  /* ---------- NOTIFICATION ---------- */
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  /* ---------- TIMER ---------- */
  useEffect(() => {

    const timer = setInterval(() => {

      const remaining =
        getRemainingTime(capsule.unlock_at);

      setTime(remaining);

      if (
        remaining.total <= 0 &&
        !notified.current &&
        Notification.permission === "granted"
      ) {
        new Notification("🎉 Memory Unlocked!", {
          body: `${capsule.title} is now open!`,
        });

        notified.current = true;
      }

    }, 1000);

    return () => clearInterval(timer);

  }, [capsule.unlock_at, capsule.title]);

  /* ---------- SHARE ---------- */
  const shareCapsule = async () => {

    const link =
      `${window.location.origin}/share/${capsule.share_token}`;

    if (navigator.share) {
      await navigator.share({
        title: capsule.title,
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
      alert("Share link copied ✅");
    }
  };

  return (
    <div
      className="
      bg-gradient-to-br
      from-[#fff7ef] to-[#f8f5f1]
      dark:from-[#1f1f1f] dark:to-[#2a2a2a]
      border border-[#ece6df]
      dark:border-gray-700
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition duration-300
      p-6
      hover:-translate-y-1
    "
    >

      {/* TITLE */}
      <h2 className="
        text-xl font-serif
        text-[#3e2f26]
        dark:text-white
      ">
        {capsule.title}
      </h2>

      {/* DATE */}
      <p className="
        text-sm mt-2
        text-[#7a5c4d]
        dark:text-gray-400
      ">
        Unlocked on{" "}
        {new Date(
          capsule.unlock_at
        ).toLocaleString()}
      </p>

      {/* TIMER */}
      <div className="mt-3">

        {time.total > 0 ? (
          <p className="
            font-medium text-sm
            text-[#a07155]
            dark:text-[#d4a373]
          ">
            🔒 {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </p>
        ) : (
          <button
            onClick={() => navigate(`/capsule/${capsule.id}`)}  // ✅ changed
            className="
              px-4 py-1.5 text-sm rounded-full
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              text-white
              hover:scale-105 transition
            "
          >
            Open Memory
          </button>
        )}

      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-5">

        <button
          onClick={() => onDelete(capsule.id)}
          className="
            px-3 py-1 text-xs rounded-full
            border border-[#d6c3b3]
            dark:border-gray-600
            text-[#7a5c4d]
            dark:text-gray-300
            hover:bg-[#f1e7dd]
            dark:hover:bg-gray-700
            transition
          "
        >
          Delete
        </button>

        <button
          onClick={shareCapsule}
          className="
            px-3 py-1 text-xs rounded-full
            bg-gradient-to-r
            from-[#b08968]
            to-[#a07155]
            text-white
            hover:scale-105 transition
          "
        >
          Share
        </button>

      </div>

    </div>
  );
}