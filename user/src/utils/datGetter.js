import { GoogleGenerativeAI } from "@google/generative-ai";
import health from "../Constant/healthConstant";
import axios from "axios";


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function run(params) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = params;

    // Check if the prompt contains health-related keywords
    const isHealthRelated = checkIfHealthRelated(prompt);

    if (isHealthRelated) {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text;
    } else {
        return "Sorry, as a DoctorTalks ChatBot, I cannot answer this.";
    }
}

function checkIfHealthRelated(prompt) {
    // List of health-related keywords
    const healthKeywords = health;


    // Convert the prompt to lowercase for case-insensitive matching
    const lowerCasePrompt = prompt.toLowerCase();

    // Check if any of the health-related keywords are present in the prompt
    for (const keyword of healthKeywords) {
        if (lowerCasePrompt.includes(keyword)) {
            return true;
        }
    }

    return false;
}

export async function getDoctors(){
    const {data} = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/listdoctors`
    )
    return data.data; 
}

export async function getOneDoctor(id) {
    console.log(id);
    const {data} = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/getonedoctor/${id.id}`
    )
    return data;
}