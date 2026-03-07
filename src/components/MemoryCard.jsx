import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [time, setTime] = useState(
    getRemainingTime(capsule.unlock_at)
  );

  /* ---------- TIMER ---------- */
  useEffect(() => {

    const timer = setInterval(() => {
      const remaining = getRemainingTime(capsule.unlock_at);
      setTime(remaining);
    }, 1000);

    return () => clearInterval(timer);

  }, [capsule.unlock_at]);

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
      w-full
      bg-gradient-to-br
      from-[#fff7ef] to-[#f8f5f1]
      dark:from-[#1f1f1f] dark:to-[#2a2a2a]
      border border-[#ece6df]
      dark:border-gray-700
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition duration-300
      p-4 sm:p-5 md:p-6
      hover:-translate-y-1
      flex flex-col
      gap-3
    "
    >

      {/* TITLE */}
      <h2
        className="
        text-lg sm:text-xl md:text-2xl
        font-serif
        text-[#3e2f26]
        dark:text-white
        break-words
      "
      >
        {capsule.title}
      </h2>

      {/* DATE */}
      <p
        className="
        text-xs sm:text-sm
        text-[#7a5c4d]
        dark:text-gray-400
      "
      >
        Unlocks on{" "}
        {new Date(capsule.unlock_at).toLocaleString()}
      </p>

      {/* TIMER */}
      <div>

        {time.total > 0 ? (
          <p
            className="
            font-medium
            text-xs sm:text-sm
            text-[#a07155]
            dark:text-[#d4a373]
          "
          >
            🔒 {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </p>
        ) : (
          <button
            onClick={() => navigate(`/capsule/${capsule.id}`)}
            className="
              px-4 py-2
              text-xs sm:text-sm
              rounded-full
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              text-white
              hover:scale-105
              transition
              w-fit
            "
          >
            Open Memory
          </button>
        )}

      </div>

      {/* ACTIONS */}
      <div
        className="
        flex
        flex-wrap
        gap-2
        mt-2
      "
      >

        <button
          onClick={() => onDelete(capsule.id)}
          className="
            px-3 py-1.5
            text-xs sm:text-sm
            rounded-full
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
            px-3 py-1.5
            text-xs sm:text-sm
            rounded-full
            bg-gradient-to-r
            from-[#b08968]
            to-[#a07155]
            text-white
            hover:scale-105
            transition
          "
        >
          Share
        </button>

      </div>

    </div>

  );
}

