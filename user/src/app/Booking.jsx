import { useContext, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SessionCard from "../Component/SessionCard";
import UserContext from "../Context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { listing } from "../utils/dataPoster";
import { useParams } from "react-router-dom";

const Booking = () => {
  const [date, setdate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setdate(newValue);
    mutate({ doctorID: docId, date: newValue.startDate });
    // console.log(error.response.data.message);
  };

  //
  const { docId } = useParams();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: listing,
  });

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      mutate({ doctorID: docId });
      setHasLoaded(true);
    }
  });

  const getTodayListing = (event) => {
    event.preventDefault(); // Pr
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()); // Incrementing current date by 1 to get tomorrow's date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    mutate({ doctorID: docId, date: formattedDate });
    // console.log(error.response.data.message);
  };
  const getTommmorowListing = (event) => {
    event.preventDefault(); // Pr
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Incrementing current date by 1 to get tomorrow's date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    mutate({ doctorID: docId, date: formattedDate });
  };

  // const { SessionInfo } = UserStore();
  const { openModal } = useContext(UserContext);
  // const makePayment = async () => {
  //   console.log("make payment ");
  //   const headers = {
  //     "Content-Type": "application/json"
  //   };

  //   try {

  //     const response = await axios.post('http://localhost:3000/user/create-checkout-session', {
  //       ...sessionDetail
  //     }, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })

  //     console.log(response);
  //     window.location.href = response.data.url;

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <div className="flex flex-col   items-center md:items-start">
        <div className="flex flex-row m-4">
          <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
            <div className="flex flex-row gap-8">
              <div>
                <button onClick={getTodayListing}>
                  <a
                    className="inline-block w-auto min-w-[150px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-400 hover:bg-gradient-to-b   hover:shadow-2xl hover:shadow-indigo-400 hover:-translate-y-px "
                    href=""
                    disabled={isPending}
                  >
                    Today
                  </a>
                </button>
              </div>

              <div role="button" onClick={getTommmorowListing}>
                <a
                  className="inline-block w-auto min-w-[150px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-400 hover:bg-gradient-to-b   hover:shadow-2xl hover:shadow-indigo-400 hover:-translate-y-px "
                  href=""
                  disabled={isPending}
                >
                  Tomorrow
                </a>
              </div>
            </div>
            <Datepicker
              primaryColor={"while"}
              useRange={false}
              asSingle={true}
              value={date}
              onChange={handleValueChange}
              disabled={isPending}
              style={{ color: "black", backgroundColor: "white" }}
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-10 border justify-center md:justify-start p-4 ">
          {isError && <div>{error.response.data.message}</div>}

          {data?.listings &&
            (data?.listings ?? []).length > 0 &&
            data?.listings.map((listing) => (
              <SessionCard
                key={listing._id} // Using _id as the key for each SessionCard
                title={listing.title}
                price={listing.price + "rs"} // Concatenate "rs" to the price
                duration={`${listing.avg_duration} minutes`} // Assuming avg_duration is in minutes
                doctorname={listing.doctor_id}
                description={listing.description} // You might need to fetch the doctor name from another source based on the doctor_id
              />
            ))}
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure for purchasing this Session in 99!
            </h3>
            <p className="py-4">After payment it is not refundable </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn mr-2">No</button>
                {/* <button className="btn ml-2 " onClick={() => { openModal(); makePayment() }}>YEs</button> */}
                <button
                  className="btn ml-2 "
                  onClick={() => {
                    openModal();
                  }}
                >
                  Yes
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Booking;
