export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f5f1] text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-4xl font-serif text-center text-[#3e2f26]">
          We'd Love to Hear From You
        </h1>

        <p className="text-center text-gray-600">
          Have questions about preserving your memories?
          We're here to help.
        </p>

        <div className="bg-white p-10 rounded-2xl shadow border space-y-6">

          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            rows="5"
            placeholder="Tell us how we can help..."
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            className="bg-[#b08968] text-white px-6 py-3 rounded-full hover:bg-[#a07155] transition"
            onClick={() => alert("Message sent (dummy)!")}
          >
            Send Message 💜
          </button>

        </div>

      </div>
    </div>
  );
}