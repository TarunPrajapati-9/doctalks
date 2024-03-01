import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../utils/datGetter";
import toast from "react-hot-toast";
import Loader from "./Loader";

const DocCard = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  if (isError) {
    toast.error(`Error in Fetching Doctor! ${error.message}`);
  }
  return (
    <div className="flex flex-wrap justify-center">
      {isLoading && <Loader />}
      {data?.map((doctor) => (
        <div
          key={doctor._id}
          className="inline-flex w-96 h-44 max-w-xs bg-base-100 shadow-xl flex-col rounded-lg m-3 select-none"
        >
          <div className="flex items-center gap-4 ml-4 mt-4 mr-4 mb-1">
            <img
              src={doctor.image ? doctor.image : "/images/github.png"}
              alt="profile"
              className="h-12 w-12 rounded-full pointer-events-none"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <h5 className="block text-lg font-semibold">{doctor.d_name}</h5>
                <div className="flex items-center">
                  <div className="rating rating-sm">
                    {[...Array(doctor.d_rating).keys()].map((index) => (
                      <input
                        key={index}
                        type="radio"
                        name={`rating-${doctor._id}`}
                        className={`mask mask-star ${doctor.d_rating ? "checked" : ""
                        }`}
                        disabled
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="block text-sm">{doctor.d_specialization}</p>
            </div>
          </div>
          <div className="flex flex-row ml-20 mb-3 mr-4 gap-3 justify-between">
            <div className="flex flex-col">
              <p className="block text-sm">
                Fees: {doctor.fees ? doctor.fees : "0"}₹
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="btn btn-sm btn-outline btn-accent place-self-center mr-2"
              onClick={() => {
                handleClick(`${doctor._id}`);
              }}
            >
              About doctor
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-outline btn-accent place-self-center ml-2"
              onClick={() => {
                handleClick(`${doctor._id}`);
              }}
            >
              Book
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocCard;
