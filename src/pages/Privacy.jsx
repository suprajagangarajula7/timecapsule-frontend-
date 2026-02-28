import { useState } from "react";

export default function Privacy() {

  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8f5f1] px-6 py-16 text-gray-800">

      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-serif text-[#3e2f26]">
          Privacy Settings
        </h1>

        {/* Description */}
        <div className="space-y-4 text-gray-600 leading-relaxed">

          <p>
            We use privacy-first, cookieless analytics to understand how our website is used.
          </p>

          <p>
            We collect anonymous, cookieless analytics data to understand website
            usage and improve your experience. No personal data is stored or tracked
            across sessions.
          </p>

        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-md border border-[#ece6df] p-8 space-y-6">

          {/* What we collect */}
          <div>
            <h2 className="text-lg font-semibold text-[#7a5c4d] mb-3">
              What we collect:
            </h2>

            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li>Page views and navigation patterns</li>
              <li>Anonymized IP addresses</li>
              <li>Device type and browser information</li>
            </ul>
          </div>

          {/* What we don't collect */}
          <div>
            <h2 className="text-lg font-semibold text-[#7a5c4d] mb-3">
              What we don't collect:
            </h2>

            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li>Cookies or persistent identifiers</li>
              <li>Personal information</li>
              <li>Cross-site tracking data</li>
            </ul>
          </div>

        </div>

        {/* Toggle Section */}
        <div className="bg-[#f1e7dd] rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h3 className="font-medium text-[#3e2f26]">
              Analytics Status:
            </h3>
            <p className="text-sm text-gray-600">
              {analyticsEnabled ? "Analytics is currently enabled." : "Analytics is currently disabled."}
            </p>
          </div>

          <div className="flex gap-4">

            <button
              onClick={() => setAnalyticsEnabled(false)}
              className={`px-5 py-2 rounded-full border transition ${
                !analyticsEnabled
                  ? "bg-[#b08968] text-white"
                  : "border-[#b08968] text-[#b08968] hover:bg-white"
              }`}
            >
              Disable Analytics
            </button>

            <button
              onClick={() => setAnalyticsEnabled(true)}
              className={`px-5 py-2 rounded-full border transition ${
                analyticsEnabled
                  ? "bg-[#b08968] text-white"
                  : "border-[#b08968] text-[#b08968] hover:bg-white"
              }`}
            >
              Enable Analytics
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}