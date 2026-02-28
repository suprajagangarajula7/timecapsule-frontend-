import { useParams }
from "react-router-dom";
import api from "../services/api";
import { useEffect,useState }
from "react";

export default function SharedCapsule(){

 const { token } = useParams();

 const [data,setData]=useState(null);

 useEffect(()=>{

   api.get(`/capsules/share/${token}`)
   .then(res=>setData(res.data));

 },[token]);

 if(!data)
   return <h2>Loading...</h2>;

 if(data.locked)
   return(
     <h2>
       🔒 Locked until{" "}
       {new Date(
        data.unlock_at
       ).toLocaleString()}
     </h2>
   );

 return(
   <div className="p-10">
     <h1 className="text-2xl font-bold mb-3">
       {data.capsule.title}
     </h1>

     <p className="mb-5">
       {data.capsule.message}
     </p>

     {/* ✅ SHOW MULTIPLE IMAGES */}
     {data.capsule.images && (
       <div className="grid grid-cols-2 gap-4">
         {data.capsule.images.map((img,index)=>(
           <img
             key={index}
             src={img}
             alt="memory"
             className="w-full h-48 object-cover rounded"
           />
         ))}
       </div>
     )}
   </div>
 );
}