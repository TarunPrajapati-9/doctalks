import { useContext, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import SessionCard from "../Component/SessionCard";
import UserContext from "../Context/UserContext";
import axios from "axios";

const Booking = () => {
 
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  // const { SessionInfo } = UserStore();
  const { openModal, sessionDetail } = useContext(UserContext);
  const makePayment = async () => {


    console.log("make payment ");
    const headers = {
      "Content-Type": "application/json"
    };






    try {

      // createa axios post request to create a checkout session
      // axios.post("http://localhost:3000/user/create-checkout-session", body, { headers: headers });axios.post(url, body, { headers: headers }) 
      const response = await axios.post('http://localhost:3000/user/create-checkout-session', {
        ...sessionDetail
      }, {
        headers: headers
      })




      console.log(response);
      // navigate(response.data.url);
      window.location.href = response.data.url;
      // get url form seesion response and redirect to tat page


      // console.log(session);
    } catch (error) {
      console.log(error);
    }
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


        <div className="flex flex-row flex-wrap gap-10 border justify-center md:justify-start p-4 ">

          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>
          <SessionCard title={"cold session"} price={"99rs"} duration={" 1 Am to 2 Am  22/3/2024"} doctorname={"milanbhai"}></SessionCard>



        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure for purchasing this Session in 99!</h3>
            <p className="py-4">After payment it is not refundable </p>
            <div className="modal-action">
              <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn mr-2">No</button>
                <button className="btn ml-2 " onClick={() => { openModal(); makePayment() }}>YEs</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
    </>
  );
};

export default Booking;
