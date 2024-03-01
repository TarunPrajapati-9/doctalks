import axios from "axios";

export async function signUp(params) {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/register`, params)
    // console.log(data);
    return data;
}

export async function signIn(params) {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, params)
    // console.log(data);
    return data;
}
export async function listing(params) {

    // console.log(params);
    const { data } = await axios.post(`http://localhost:3000/user/listing/${params.doctorID}`, params)
    return data;
}