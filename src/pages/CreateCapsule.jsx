import { useState, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { v4 as uuidv4 } from "uuid";

export default function CreateCapsule() {

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

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

  /* FILE UPLOAD */
  const handleFileChange = (e) => {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
  };

  /* 🎙 START RECORDING */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        if (blob.size === 0) {
          alert("Recording failed.");
          return;
        }

        const recordedFile = new File(
          [blob],
          `recording-${Date.now()}.webm`,
          { type: "audio/webm" }
        );

        setFiles(prev => [...prev, recordedFile]);
      };

      mediaRecorder.start();
      setRecording(true);

    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  /* 📍 Capture Location */
  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        alert("Location captured ✅");
      },
      () => alert("Location permission denied")
    );
  };

  const submitCapsule = async () => {

    if (loading) return;
    if (recording) {
      alert("Stop recording before saving.");
      return;
    }

    try {
      setLoading(true);

      let image_urls = [];
      let video_urls = [];
      let audio_urls = [];

      for (const file of files) {

        let folder;

        if (file.type.startsWith("image")) folder = "images";
        else if (file.type.startsWith("video")) folder = "videos";
        else if (file.type.includes("audio")) folder = "audios";
        else continue;

        const filePath = `${folder}/${uuidv4()}-${file.name}`;

        const { error } = await supabase.storage
          .from("capsule-images")
          .upload(filePath, file);

        if (error) {
          alert(error.message);
          setLoading(false);
          return;
        }

        const { data } = supabase.storage
          .from("capsule-images")
          .getPublicUrl(filePath);

        if (folder === "images") image_urls.push(data.publicUrl);
        if (folder === "videos") video_urls.push(data.publicUrl);
        if (folder === "audios") audio_urls.push(data.publicUrl);
      }

      await api.post("/capsules", {
        ...form,
        images: image_urls,
        videos: video_urls,
        audios: audio_urls,
        is_public: isPublic,
        password: isPublic ? null : password,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null
      });

      navigate("/dashboard");

    } catch (err) {
      alert("Capsule creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen flex justify-center px-6 py-12
      bg-gradient-to-b from-[#f8f5f1] to-[#f1e7dd]
      dark:from-[#121212] dark:to-[#1c1c1c]
    ">

      <div className="
        w-full max-w-3xl
        bg-gradient-to-br from-[#fff7ef] to-[#f8f5f1]
        dark:from-[#1f1f1f] dark:to-[#2a2a2a]
        border border-[#ece6df]
        dark:border-gray-700
        rounded-3xl shadow-2xl p-6 md:p-10
      ">

        <h1 className="text-3xl font-serif text-center mb-8 dark:text-white">
          Seal a Memory in Retrospect 💌
        </h1>

        <input
          name="title"
          placeholder="Memory Title"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        <textarea
          name="message"
          placeholder="Write your memory..."
          rows="5"
          onChange={handleChange}
          className="w-full mb-5 p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        {/* 🔐 Public Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <span className="dark:text-white font-medium">
            Make Capsule Public
          </span>

          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`
              w-14 h-8 flex items-center rounded-full p-1 transition
              ${isPublic ? "bg-green-500" : "bg-gray-400"}
            `}
          >
            <div
              className={`
                bg-white w-6 h-6 rounded-full shadow-md transform transition
                ${isPublic ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>

        {/* 🔑 Password (Only if Private) */}
        {!isPublic && (
          <input
            type="password"
            placeholder="Set Password (Optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />
        )}

        {/* 📍 Location */}
        <button
          type="button"
          onClick={captureLocation}
          className="
            w-full mb-6 py-3 rounded-xl
            bg-gradient-to-r from-[#b08968] to-[#a07155]
            text-white shadow-md hover:scale-[1.02] transition
          "
        >
          📍 Capture Location
        </button>

        {/* Upload */}
        <input
          type="file"
          multiple
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
          className="mb-6 dark:text-white"
        />

        {/* Recording */}
        <div className="mb-6">
          {!recording ? (
            <button
              onClick={startRecording}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-[#b08968] to-[#a07155]
                text-white shadow-md hover:scale-[1.02] transition
              "
            >
              🎙 Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-red-500 to-red-700
                animate-pulse text-white shadow-md
              "
            >
              ⏹ Recording... Click to Stop
            </button>
          )}
        </div>

        {/* Date Time */}
        <input
          type="datetime-local"
          name="unlock_at"
          onChange={handleChange}
          className="
            w-full mb-8 p-3 rounded-xl border
            bg-white text-gray-800
            dark:bg-gray-800 dark:text-white
            focus:ring-2 focus:ring-[#b08968]
          "
        />

        <button
          onClick={submitCapsule}
          disabled={loading || recording}
          className="
            w-full py-3 rounded-full text-white
            bg-gradient-to-r from-[#b08968] to-[#a07155]
            disabled:opacity-60 hover:scale-[1.02] transition
          "
        >
          {loading ? "Sealing Memory..." : "Seal Memory"}
        </button>

      </div>
    </div>
  );
}