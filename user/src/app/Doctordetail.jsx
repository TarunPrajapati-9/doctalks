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
    mutate({ id: docId });
  }, [docId, mutate]); // Correctly enclosed within square brackets
  

  if (isError) {
    toast.error(`Error Fetching in Doctor Details!`);
    // navigate("/signIn");
  }

  const handleRegisterClick = () => {
    // navigate(`/${docId}`);
  };
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
              <h4 className="text-md font-medium leading-3 mt-4">Sessions</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
                  <div className="bg-black rounded-badge">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2rem"
                      stroke=""
                      viewBox="0,0,1024,1024"
                    >
                      <g>
                        <rect width="1em" height="1em" fill="#333132" />
                        <path
                          d="M431 574.8c-.8-7.4-6.7-8.2-10.8-10.6-13.6-7.9-27.5-15.4-41.3-23l-22.5-12.3c-8.5-4.7-17.1-9.2-25.6-14.1-10.5-6-21-11.9-31.1-18.6-18.9-12.5-33.8-29.1-46.3-48.1-8.3-12.6-14.8-26.1-19.2-40.4-6.7-21.7-10.8-44.1-7.8-66.8 1.8-14 4.6-28 9.7-41.6 7.8-20.8 19.3-38.8 34.2-54.8 9.8-10.6 21.2-19.1 33.4-26.8 14.7-9.3 30.7-15.4 47.4-19 13.8-3 28.1-4.3 42.2-4.4 89.9-.4 179.7-.3 269.6 0 12.6 0 25.5 1 37.7 4.1 24.3 6.2 45.7 18.2 63 37 11.2 12.2 20.4 25.8 25.8 41.2 7.3 20.7 12.3 42.1 6.7 64.4-2.1 8.5-2.7 17.5-6.1 25.4-4.7 10.9-10.8 21.2-17.2 31.2-8.7 13.5-20.5 24.3-34.4 32.2-10.1 5.7-21 10.2-32 14.3-18.1 6.7-37.2 5-56.1 5.2-17.2.2-34.5 0-51.7.1-1.7 0-3.4 1.2-5.1 1.9 1.3 1.8 2.1 4.3 3.9 5.3 13.5 7.8 27.2 15.4 40.8 22.9 11 6 22.3 11.7 33.2 17.9 15.2 8.5 30.2 17.4 45.3 26.1 19.3 11.1 34.8 26.4 47.8 44.3 9.7 13.3 17.2 27.9 23 43.5 6.1 16.6 9.2 33.8 10.4 51.3.6 9.1-.7 18.5-1.9 27.6-1.2 9.1-2.7 18.4-5.6 27.1-3.3 10.2-7.4 20.2-12.4 29.6-8.4 15.7-19.6 29.4-32.8 41.4-12.7 11.5-26.8 20.6-42.4 27.6-22.9 10.3-46.9 14.4-71.6 14.5-89.7.3-179.4.2-269.1-.1-12.6 0-25.5-1-37.7-3.9-24.5-5.7-45.8-18-63.3-36.4-11.6-12.3-20.2-26.5-26.6-41.9-2.7-6.4-4.1-13.5-5.4-20.4-1.5-8.1-2.8-16.3-3.1-24.5-.6-15.7 2.8-30.9 8.2-45.4 8.2-22 21.7-40.6 40.2-55.2 10-7.9 21.3-13.7 33.1-18.8 16.6-7.2 34-8.1 51.4-8.5 21.9-.5 43.9-.1 65.9-.1 1.9-.1 3.9-.3 6.2-.4zm96.3-342.4c0 .1 0 .1 0 0-48.3.1-96.6-.6-144.9.5-13.5.3-27.4 3.9-40.1 8.7-14.9 5.6-28.1 14.6-39.9 25.8-20.2 19-32.2 42.2-37.2 68.9-3.6 19-1.4 38.1 4.1 56.5 4.1 13.7 10.5 26.4 18.5 38.4 14.8 22.2 35.7 36.7 58.4 49.2 11 6.1 22.2 11.9 33.2 18 13.5 7.5 26.9 15.1 40.4 22.6 13.1 7.3 26.2 14.5 39.2 21.7 9.7 5.3 19.4 10.7 29.1 16.1 2.9 1.6 4.1.2 4.5-2.4.3-2 .3-4 .3-6.1v-58.8c0-19.9.1-39.9 0-59.8 0-6.6 1.7-12.8 7.6-16.1 3.5-2 8.2-2.8 12.4-2.8 50.3-.2 100.7-.2 151-.1 19.8 0 38.3-4.4 55.1-15.1 23.1-14.8 36.3-36.3 40.6-62.9 3.4-20.8-1-40.9-12.4-58.5-17.8-27.5-43.6-43-76.5-43.6-47.8-.8-95.6-.2-143.4-.2zm-30.6 559.7c45.1 0 90.2-.2 135.3.1 18.9.1 36.6-3.9 53.9-11.1 18.4-7.7 33.6-19.8 46.3-34.9 9.1-10.8 16.2-22.9 20.8-36.5 4.2-12.4 7.4-24.7 7.3-37.9-.1-10.3.2-20.5-3.4-30.5-2.6-7.2-3.4-15.2-6.4-22.1-3.9-8.9-8.9-17.3-14-25.5-12.9-20.8-31.9-34.7-52.8-46.4-10.6-5.9-21.2-11.6-31.8-17.5-10.3-5.7-20.4-11.7-30.7-17.4-11.2-6.1-22.5-11.9-33.7-18-16.6-9.1-33.1-18.4-49.8-27.5-4.9-2.7-6.1-1.9-6.4 3.9-.1 2-.1 4.1-.1 6.1v114.5c0 14.8-5.6 20.4-20.4 20.4-47.6.1-95.3-.1-142.9.2-10.5.1-21.1 1.4-31.6 2.8-16.5 2.2-30.5 9.9-42.8 21-17 15.5-27 34.7-29.4 57.5-1.1 10.9-.4 21.7 2.9 32.5 3.7 12.3 9.2 23.4 17.5 33 19.2 22.1 43.4 33.3 72.7 33.3 46.6.1 93 0 139.5 0z"
                          fill="#00f782"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="leading-3">
                    <p className=" text-sm font-bold text-slate-700">
                      Session Description
                    </p>
                    <span className="text-xs text-slate-600">5 years</span>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button
                      type="button"
                      className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={handleRegisterClick(data)}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
