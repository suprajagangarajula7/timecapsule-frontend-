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

    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] dark:from-[#1c1c1c] dark:to-[#121212] flex justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

        {/* LEFT PAGE — MEMORY */}

        <div className="bg-white dark:bg-[#1f1f1f] shadow-xl rounded-3xl p-6 border border-[#ece6df] dark:border-gray-700 flex flex-col justify-between">

          <div>

            <h2 className="text-2xl font-serif mb-6 text-[#3e2f26] dark:text-white">
              📖 Your Journal
            </h2>

            {current ? (

              <div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {new Date(current.created_at).toDateString()}
                </p>

                <p className="whitespace-pre-line text-gray-700 dark:text-gray-200 leading-relaxed text-base sm:text-lg">
                  {current.content}
                </p>

              </div>

            ) : (

              <p className="text-gray-500 dark:text-gray-400">
                No Journal entries  yet.
              </p>

            )}

          </div>

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


        {/* RIGHT PAGE — WRITE ENTRY */}

        <div className="bg-white dark:bg-[#1f1f1f] shadow-xl rounded-3xl p-6 border border-[#ece6df] dark:border-gray-700">

          <h2 className="text-2xl font-serif mb-6 text-[#3e2f26] dark:text-white" >
            ✍️ Write Today's memory
          </h2>

          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write today's memory..."
            className="
            w-full
            h-56
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

        </div>

      </div>

    </div>

  );

}