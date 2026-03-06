import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function MemoryDetails() {

  const { id } = useParams();

  const [capsule,setCapsule] = useState(null);
  const [loading,setLoading] = useState(true);
  const [enteredPassword,setEnteredPassword] = useState("");
  const [accessGranted,setAccessGranted] = useState(false);
  const [error,setError] = useState("");
const playUnlockSound = () => {
  const audio = new Audio("/unlock.mp3");
  audio.play();
};

  useEffect(()=>{

    const fetchCapsule = async ()=>{

      try{

        const res = await api.get(`/capsules/${id}`);

        setCapsule(res.data);

        if(!res.data.password){
          setAccessGranted(true);
        }

      }catch(err){
        console.log(err);
      }

      setLoading(false);
    };

    fetchCapsule();

  },[id]);
  useEffect(() => {

  if (!capsule?.is_locked && accessGranted) {
    playUnlockSound();
  }

}, [accessGranted]);

  if(loading)
    return <div className="p-10 text-center">Loading...</div>;

  if(!capsule)
    return <div className="p-10 text-center">Memory not found</div>;

  const handleUnlock = ()=>{

  if(enteredPassword === capsule.password){

    setAccessGranted(true);
    setError("");

    playUnlockSound(); // 🔊 play sound

  }else{
    setError("Incorrect password");
  }

};

  return(

    <div className="min-h-screen flex justify-center items-center px-4 bg-[#f8f5f1] dark:bg-[#121212]">

      <div className="w-full max-w-3xl bg-white dark:bg-[#1f1f1f] shadow-xl rounded-3xl p-6 border border-[#ece6df] dark:border-gray-700">

        <h1 className="text-2xl font-serif mb-4 text-[#3e2f26] dark:text-white">
          {capsule.title}
        </h1>

        {/* LOCKED BY TIME */}
        {capsule.is_locked && (
          <div className="text-red-500 mb-4">
            🔒 This memory unlocks at {new Date(capsule.unlock_at).toLocaleString()}
          </div>
        )}

        {/* PASSWORD SCREEN */}
        {!capsule.is_locked && capsule.password && !accessGranted && (

          <div className="mt-4 bg-gradient-to-br from-[#fff7ef] to-[#f8f5f1] dark:from-[#1f1f1f] dark:to-[#2a2a2a] p-6 rounded-2xl border border-[#ece6df] dark:border-gray-700">

            <p className="text-[#7a5c4d] dark:text-gray-300 mb-4">
              🔑 This capsule is password protected
            </p>

            <input
              type="password"
              placeholder="Enter password"
              value={enteredPassword}
              onChange={(e)=>setEnteredPassword(e.target.value)}
              className="w-full border border-[#e5d5c5] dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-[#1a1a1a] text-[#3e2f26] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b08968]"
            />

            <button
              onClick={handleUnlock}
              className="mt-4 px-6 py-2 rounded-xl text-white bg-gradient-to-r from-[#b08968] to-[#9c6644] hover:scale-105 transition"
            >
              Unlock Memory
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

          </div>
        )}

        {/* CONTENT */}
        {!capsule.is_locked && accessGranted && (

          <div className="space-y-6 mt-4">

            <p className="text-gray-700 dark:text-gray-300">
              {capsule.message}
            </p>

            {/* IMAGES */}
            {capsule.images && capsule.images.map((img,i)=>(
              <img
                key={i}
                src={img}
                alt=""
                className="rounded-xl w-full shadow-md"
              />
            ))}

            {/* VIDEOS */}
            {capsule.videos && capsule.videos.map((vid,i)=>(
              <video
                key={i}
                src={vid}
                controls
                className="w-full rounded-xl shadow-md"
              />
            ))}

            {/* AUDIOS */}
{capsule.audios && capsule.audios.map((aud, i) => (
  <div
    key={i}
    className="
      bg-[#f9f6f2]
      border border-[#e6ddd4]
      rounded-xl
      p-4
      shadow-sm
      hover:shadow-md
      transition
    "
  >
    <p className="text-sm text-[#6b4f3b] mb-2 font-medium">
      🎙 Voice Memory
    </p>

    <audio
      src={aud}
      controls
      className="w-full"
    />
  </div>
))}

            {/* LOCATION */}
            {capsule.latitude && capsule.longitude && (

              <div>

                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  📍 Location
                </p>

                <iframe
                  title="map"
                  width="100%"
                  height="300"
                  className="rounded-xl"
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${capsule.latitude},${capsule.longitude}&z=15&output=embed`}
                ></iframe>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}