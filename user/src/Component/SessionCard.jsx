import { useContext, useEffect } from "react";
// import UserStore from "../store/UserStore";
import UserContext from "../Context/UserContext";



export default function EventCard({ duration, title, price, doctorname }) {

    const { openModal, setsessionDetail } = useContext(UserContext);


    const handleOnClick = (duration, title, price, doctorname) => {

        openModal(),
            setsessionDetail({ "duration": duration, "title": title, "price": 0, "doctorname": doctorname });

    }
    return (
        <div className=''>

            <div className="px-4 md:px-8 py-6 bg-gray-100 rounded-lg shadow-2xl max-w-xl">

                <h1 className="text-lg mb-2">
                    {duration}
                    <br></br>
                    <span className="text-2xl font-semibold">  {title} </span>
                    <span className="text-3xl font-semibold text-blue-700">Book?</span>
                    <br></br>
                </h1>

                <div className="flex flex-col justify-center w-full text-center mt-4 gap-6 sm:flex-row text-lg font-semibold">
                    <a
                        className="flex flex-row justify-center  py-2 h-12 w-32 border border-blue-700 rounded-lg hover:shadow-2xl hover:text-blue-700 shadow-lg">
                        {price}
                    </a>
                    <a onClick={() => handleOnClick(duration, title, price, doctorname)}
                        className="flex flex-row justify-center bg-blue-600 h-12 w-32 sm:w-32 py-2 rounded-lg text-white hover:bg-blue-700 shadow-lg">
                        Book Now
                    </a>
                </div>

            </div>
        </div>
    )
}
