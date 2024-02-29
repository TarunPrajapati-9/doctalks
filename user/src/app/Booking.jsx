import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import EventCard from "../Component/EventCard";

const Booking = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  return (
    <>
      <div className="flex flex-col   items-center md:items-start">
        <div className="flex flex-row m-4">
          <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
            <div className="flex flex-row gap-8">
              <a
                className="inline-block w-auto min-w-[150px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-400 hover:bg-gradient-to-b   hover:shadow-2xl hover:shadow-indigo-400 hover:-translate-y-px "
                href="">Today
              </a>
              <a
                className="inline-block w-auto min-w-[150px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-indigo-500 to-indigo-400 hover:bg-gradient-to-b   hover:shadow-2xl hover:shadow-indigo-400 hover:-translate-y-px "
                href="">Tomorrow
              </a>

            </div>
            <Datepicker
              primaryColor={"while"}
              useRange={false}
              asSingle={true}
              value={value}
              onChange={handleValueChange}
              style={{ color: 'black', backgroundColor: 'white' }}
            />

          </div>
        </div>

        
        <div className="flex flex-row flex-wrap gap-10 border justify-center md:justify-start  ">

          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
        </div>

      </div>
    </>
  );
};

export default Booking;
