import { Link } from "react-router-dom";

export default function AuthHome() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5f1]">

      {/* HEADER */}
      <header
        className="
        w-full
        bg-[#f8f5f1]
        border-b border-[#ece6df]
        shadow-sm
        px-6 md:px-10 py-4
        flex flex-col md:flex-row
        justify-between items-center
        gap-4
      "
      >
        <h1
          className="
          text-3xl md:text-4xl
          font-bold font-serif
          text-[#4b2e2a]
          tracking-wide
        "
        >
          ⏳ Retrospect
        </h1>

        <nav className="flex gap-4">
          <Link
            to="/login"
            className="
            px-5 py-2 rounded-full
            border border-[#b08968]
            text-[#4b2e2a]
            hover:bg-[#b08968] hover:text-white
            transition
          "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
            px-5 py-2 rounded-full
            bg-[#b08968]
            text-white
            hover:bg-[#a07155]
            transition
          "
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        className="
        flex-1
        flex flex-col
        items-center
        justify-center
        text-center
        px-6 md:px-10
        py-16
      "
      >
        <h2
          className="
          text-4xl md:text-5xl
          font-bold
          text-[#4b2e2a]
          leading-tight
        "
        >
          Preserve Your Memories for the Future
        </h2>

        <p
          className="
          mt-6
          text-gray-600
          max-w-xl
          text-lg
        "
        >
          Create digital time capsules filled with photos, messages, and
          memories that unlock at a chosen time in the future.
        </p>

        <div
          className="
          mt-8
          flex flex-col sm:flex-row
          gap-4
        "
        >
          <Link
            to="/register"
            className="
            px-8 py-3
            rounded-full
            text-white
            bg-gradient-to-r from-[#b08968] to-[#a07155]
            hover:scale-105
            transition
          "
          >
            Create Capsule
          </Link>

          <Link
            to="/login"
            className="
            px-8 py-3
            rounded-full
            border border-[#b08968]
            text-[#4b2e2a]
            hover:bg-[#b08968] hover:text-white
            transition
          "
          >
            View Memories
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="
        bg-white
        py-16
        px-6 md:px-10
      "
      >
        <h3
          className="
          text-2xl md:text-3xl
          font-bold
          text-center
          text-[#4b2e2a]
        "
        >
          Why Use Retrospect?
        </h3>

        <div
          className="
          mt-10
          grid
          gap-8
          md:grid-cols-3
        "
        >
          <div className="bg-[#f8f5f1] p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-[#4b2e2a]">
              📸 Store Memories
            </h4>
            <p className="mt-2 text-gray-600">
              Upload photos, messages, and personal notes safely in your
              capsule.
            </p>
          </div>

          <div className="bg-[#f8f5f1] p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-[#4b2e2a]">
              ⏳ Time Lock
            </h4>
            <p className="mt-2 text-gray-600">
              Lock your memories and open them in the future at a specific
              date.
            </p>
          </div>

          <div className="bg-[#f8f5f1] p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-[#4b2e2a]">
              🔐 Secure
            </h4>
            <p className="mt-2 text-gray-600">
              Protect your capsules with passwords and privacy settings.
            </p>
          </div>
        </div>
      </section>

      {/* LEGACY SECTION */}
      <section
        className="
        py-16
        px-6 md:px-10
        text-center
      "
      >
        <h3
          className="
          text-xl md:text-3xl
          font-bold
          text-[#4b2e2a]
        "
        >
          Leave a Digital Legacy
        </h3>

        <p
          className="
          mt-4
          text-gray-600
          max-w-xl
          mx-auto
        "
        >
          Write messages to your future self, family, or friends. Capture
          today’s emotions and let them be rediscovered years later.
        </p>
      </section>

      {/* FOOTER */}
      <footer
        className="
        bg-[#4b2e2a]
        text-white
        text-center
        py-6
        px-6
      "
      >
        <p className="text-sm">
          © {new Date().getFullYear()} Retrospect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}