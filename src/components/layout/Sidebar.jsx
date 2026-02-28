import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        ⏳ TimeCapsule
      </h1>

      <nav className="flex flex-col gap-5">

        <Link
          to="/dashboard"
          className="hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="hover:text-blue-400"
        >
          Create Capsule
        </Link>

      </nav>

    </div>
  );
}