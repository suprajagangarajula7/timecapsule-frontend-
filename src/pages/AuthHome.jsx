import { useNavigate, Link } from "react-router-dom";

export default function AuthHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] text-gray-800">

      {/* ================= HEADER ================= */}
      <header
        className="
          w-full
          bg-[#f8f5f1]
          border-b border-[#ece6df]
          shadow-sm
          px-4 sm:px-6 md:px-10
          py-4
          flex flex-col sm:flex-row
          gap-4
          sm:gap-0
          justify-between
          items-center
        "
      >

        {/* ===== LOGO ===== */}
        <h1
          className="
            text-2xl sm:text-3xl md:text-4xl
            font-bold
            font-serif
            text-[#4b2e2a]
            tracking-wide
            cursor-pointer
          "
        >
          ⏳ Retrospect
        </h1>

        {/* ===== NAVIGATION ===== */}
        <nav className="flex items-center gap-3 sm:gap-4">

          <button
            onClick={() => alert("About section coming soon")}
            className="
              px-4 sm:px-5
              py-2
              rounded-full
              bg-white
              border border-[#ece6df]
              text-[#4b2e2a]
              hover:bg-[#f1e7dd]
              transition
              text-sm sm:text-base
            "
          >
            About
          </button>

          <button
            onClick={() => navigate("/login")}
            className="
              px-4 sm:px-5
              py-2
              rounded-full
              border border-[#b08968]
              text-[#4b2e2a]
              hover:bg-[#f1e7dd]
              transition
              text-sm sm:text-base
            "
          >
            Login
          </button>

        </nav>

      </header>

      {/* ================= LEGACY SECTION ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-[#b08968] via-[#a07155] to-[#7a5c4d] text-white border-b border-[#ece6df]">

        <div className="max-w-4xl mx-auto text-center space-y-10">

          <p className="text-lg sm:text-xl md:text-2xl font-medium">
            We built this so that anyone can tell their stories and have their legacy live on for generations to come.
            Because life is too short, and one day they'll need your messages more than ever.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold animate-pulse">
              "What if I'm not there for their graduation?"
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold animate-pulse delay-150">
              "What if I never get to say goodbye?"
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold animate-pulse delay-300">
              "What if they forget my voice?"
            </p>
          </div>

        </div>

      </section>

      {/* ================= HERO SECTION ================= */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12 sm:py-16">

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-[#3e2f26]">
              Preserve today.
              <br /> Deliver tomorrow.
            </h2>

            <p className="text-gray-700 text-base sm:text-lg">
              Retrospect lets you store meaningful memories and send them into the future — for birthdays, milestones, or simply because it matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b08968] to-[#a07155] text-white font-medium hover:scale-105 transition transform shadow-lg"
              >
                Start Your Journey
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-full border border-[#b08968] text-[#b08968] font-medium hover:bg-[#f1e7dd] transition shadow-sm"
              >
                Login
              </button>

            </div>

          </div>

          {/* Right Card */}
          <div className="bg-gradient-to-br from-[#fff7ef] to-[#f8f5f1] rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-[#ece6df] transform hover:-translate-y-2 transition duration-500">

            <div className="text-5xl sm:text-6xl mb-4 animate-bounce">💌</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-[#b08968] mb-2">
              A Message for the Future
            </h3>

            <p className="text-gray-600 text-sm sm:text-base">
              Write it today. Lock it safely. Deliver it when the time feels right.
            </p>

          </div>

        </div>

      </main>

      {/* ================= OUR VISION ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">

        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center space-y-4">

            <h2 className="text-3xl sm:text-4xl font-serif text-[#3e2f26]">
              Our Vision
            </h2>

            <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg">
              Our vision is a future where every individual can effortlessly pass on their living essence, their voice, wisdom, and stories, to loved ones across generations.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

            <div className="bg-gradient-to-br from-[#fdf6f0] to-[#f8f5f1] p-8 rounded-3xl shadow-lg border border-[#ece6df] hover:scale-105 transition transform">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-[#b08968] mb-2">Living Essence</h3>
              <p className="text-gray-700">
                Capture the true spirit of who you are.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#fdf6f0] to-[#f8f5f1] p-8 rounded-3xl shadow-lg border border-[#ece6df] hover:scale-105 transition transform">
              <div className="text-5xl mb-4">📜</div>
              <h3 className="text-xl font-semibold text-[#b08968] mb-2">Timeless Wisdom</h3>
              <p className="text-gray-700">
                Share knowledge across generations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#fdf6f0] to-[#f8f5f1] p-8 rounded-3xl shadow-lg border border-[#ece6df] hover:scale-105 transition transform">
              <div className="text-5xl mb-4">🕊</div>
              <h3 className="text-xl font-semibold text-[#b08968] mb-2">Lasting Legacy</h3>
              <p className="text-gray-700">
                Ensure your memories survive forever.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#e5ded6] bg-[#f8f5f1]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">

          <p>© 2026 Retrospect. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#b08968]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#b08968]">Terms</Link>
            <Link to="/contact" className="hover:text-[#b08968]">Contact</Link>
          </div>

        </div>

      </footer>

    </div>
  );
}