import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loader from "../Component/Loader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getOneDoctor } from "../utils/datGetter";

export default function Doctordetail() {
  const { docId } = useParams();
  console.log("Doctor ID: "+ docId);
//   const navigate = useNavigate();

  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: getOneDoctor,
  });

  useEffect(() => {
    mutate({ id: docId ,date:null});
  }, [docId, mutate]); // Correctly enclosed within square brackets
  

  
  if (isError) {
    toast.error(`Error Fetching in Doctor Details!`);
    // navigate("/signIn");
  }


  return (
    <>
      <div className=" my-10 mx-5">
        {isPending && <Loader />}
        {data && (
          <div className="bg-white md:mx-auto rounded shadow-xl w-full  overflow-hidden">
            <div className="h-[140px] bg-[#4AD66D]"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
              <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white pointer-events-none select-none">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  className="w-full h-full rounded-full object-center object-cover"
                ></img>
              </div>
              <div className="">
                <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                  {data.d_name}
                </h3>
                <p className="text-sm text-gray-600">{data.d_email}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  {data.d_specialization}
                </span>
              </div>
            
            </div>
          </div>
        )}
      </div>
    </>
  );
}
