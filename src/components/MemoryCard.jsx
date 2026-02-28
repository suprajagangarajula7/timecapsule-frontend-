import { useEffect, useState, useRef } from "react";

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

  /* ✅ FIX: ALWAYS HANDLE MULTIPLE IMAGES */
  const images =
    typeof capsule.images === "string"
      ? JSON.parse(capsule.images)
      : capsule.images || [];

  const [time, setTime] = useState(
    getRemainingTime(capsule.unlock_at)
  );

  const [isOpen, setIsOpen] = useState(false);
  const notified = useRef(false);

  /* ---------- NOTIFICATION ---------- */
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  /* ---------- LIVE TIMER ---------- */
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
      from-[#fff7ef]
      to-[#f8f5f1]
      border border-[#ece6df]
      rounded-3xl
      shadow-lg
      hover:shadow-2xl
      transition
      duration-300
      p-6
      hover:-translate-y-1
    "
    >

      {/* TITLE */}
      <h2 className="text-xl font-serif text-[#3e2f26]">
        {capsule.title}
      </h2>

      {/* DATE */}
      <p className="text-sm text-[#7a5c4d] mt-2">
        Unlocked on{" "}
        {new Date(
          capsule.unlock_at
        ).toLocaleString()}
      </p>

      {/* TIMER / OPEN */}
      <div className="mt-3">

        {time.total > 0 ? (
          <p className="text-[#a07155] font-medium text-sm">
            🔒 {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </p>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              px-4 py-1.5
              text-sm
              rounded-full
              bg-gradient-to-r
              from-[#b08968]
              to-[#a07155]
              text-white
              hover:scale-105
              transition
            "
          >
            {isOpen ? "Close Memory" : "Open Memory"}
          </button>
        )}

      </div>

      {/* MEMORY CONTENT */}
      {isOpen && time.total <= 0 && (
        <div className="mt-4">

          <p className="text-gray-700 mb-4">
            {capsule.message}
          </p>

          {/* ✅ MULTIPLE IMAGES DISPLAY */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`memory-${i}`}
                  className="
                    rounded-xl
                    h-36
                    w-full
                    object-cover
                    shadow-md
                    hover:scale-105
                    transition
                    duration-300
                  "
                />
              ))}
            </div>
          )}

        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-5">

        {/* DELETE */}
        <button
          onClick={() => onDelete(capsule.id)}
          className="
            px-3 py-1
            text-xs
            rounded-full
            border border-[#d6c3b3]
            text-[#7a5c4d]
            hover:bg-[#f1e7dd]
            transition
          "
        >
          Delete
        </button>

        {/* SHARE */}
        <button
          onClick={shareCapsule}
          className="
            px-3 py-1
            text-xs
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