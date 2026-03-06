import { useEffect, useState } from "react";
import api from "../services/api";

export default function Journal() {

  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEntries = async () => {

      try {

        const res = await api.get("/journal");
        const data = Array.isArray(res.data) ? res.data : [];

        setEntries(data);

        if (data.length > 0) {
          setPage(data.length - 1);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

    };

    fetchEntries();

  }, []);

  const saveEntry = async () => {

    if (!newEntry.trim()) return;

    try {

      const res = await api.post("/journal", {
        title: "Daily Entry",
        content: newEntry
      });

      const created = Array.isArray(res.data)
        ? res.data[0]
        : res.data;

      const updatedEntries = [...entries, created];

      setEntries(updatedEntries);
      setPage(updatedEntries.length - 1);
      setNewEntry("");

    } catch (err) {
      console.log(err);
    }

  };

  const current = entries[page];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg dark:text-white">
        Loading Journal...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] dark:from-[#1c1c1c] dark:to-[#121212] flex justify-center px-4 sm:px-6 py-10">

      <div className="w-full max-w-3xl bg-white dark:bg-[#1f1f1f] shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-[#ece6df] dark:border-gray-700 transition">

        {/* TITLE */}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-6 text-[#3e2f26] dark:text-white">
          📔 Personal Journal
        </h1>

        {/* ENTRY DISPLAY */}

        {current && (

          <div className="mb-6">

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {new Date(current.created_at).toDateString()}
            </p>

            <p className="whitespace-pre-line text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg">
              {current.content}
            </p>

          </div>

        )}

        {/* TEXT AREA */}

        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write today's memory..."
          className="
          w-full
          h-40 sm:h-44 md:h-48
          border border-[#ece6df]
          dark:border-gray-700
          bg-[#fdf6f0] dark:bg-[#262626]
          text-gray-800 dark:text-white
          rounded-xl
          p-4
          outline-none
          focus:ring-2
          focus:ring-[#b08968]
          resize-none
          transition
          "
        />

        {/* SAVE */}

        <button
          onClick={saveEntry}
          className="
          mt-4
          w-full
          py-3
          rounded-full
          text-white
          font-medium
          bg-gradient-to-r
          from-[#b08968]
          to-[#a07155]
          hover:scale-[1.02]
          transition
          shadow-lg
          "
        >
          Save Entry
        </button>

        {/* NAVIGATION */}

        <div className="flex justify-between mt-6 text-sm sm:text-base">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="text-[#7a5c4d] dark:text-gray-300 disabled:opacity-40"
          >
            ⬅ Previous
          </button>

          <button
            disabled={page === entries.length - 1}
            onClick={() => setPage(page + 1)}
            className="text-[#7a5c4d] dark:text-gray-300 disabled:opacity-40"
          >
            Next ➡
          </button>

        </div>

      </div>

    </div>

  );

}