import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from "uuid";

export default function CreateCapsule() {

  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    unlock_at: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ✅ MULTIPLE FILE SUPPORT */
  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const submitCapsule = async () => {

    if (loading) return;

    try {
      setLoading(true);

      let image_urls = [];

      /* ✅ Upload ALL images safely */
      for (const image of images) {

        const fileName =
          `${uuidv4()}-${image.name}`;

        const { error } =
          await supabase.storage
            .from("capsule-images")
            .upload(fileName, image);

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }

        const { data } =
          supabase.storage
            .from("capsule-images")
            .getPublicUrl(fileName);

        image_urls.push(data.publicUrl);
      }

      /* ✅ Save capsule */
      await api.post("/capsules", {
        ...form,
        images: image_urls,
      });

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Capsule creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd] flex justify-center px-6 py-12">

      <div className="w-full max-w-3xl bg-gradient-to-br from-[#fff7ef] to-[#f8f5f1]
        border border-[#ece6df] rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-serif text-[#3e2f26] mb-8 text-center">
          Create Your Time Capsule 💌
        </h1>

        <input
          name="title"
          placeholder="Capsule Title"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-xl border"
        />

        <textarea
          name="message"
          placeholder="Write your memory..."
          rows="5"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-xl border"
        />

        {/* ✅ MULTIPLE IMAGE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-6"
        />

        <input
          type="datetime-local"
          name="unlock_at"
          onChange={handleChange}
          className="w-full mb-8 p-3 rounded-xl border"
        />

        <button
          onClick={submitCapsule}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white
          bg-gradient-to-r from-[#b08968] to-[#a07155]
          ${loading && "opacity-60"}`}
        >
          {loading
            ? "Creating Capsule..."
            : "Lock Memory"}
        </button>

      </div>
    </div>
  );
}