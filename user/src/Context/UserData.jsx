import  { useState } from 'react'
import Usercontext from './UserContext.jsx'




export default function Userdata(props) {

    const [sessionDetail, setsessionDetail] = useState({
        "duration": "",
        "title": "",
        "price": 0,
        "doctorname": ""
    });



    const openModal = () => {
        document.getElementById('my_modal_1').showModal();
    };


    return (
        <Usercontext.Provider value={{

            openModal,
       
            sessionDetail,
            setsessionDetail
        }}>
            {props.children}
        </Usercontext.Provider>
    )
}



