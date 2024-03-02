import {
    GoogleGenerativeAI, HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import health from "../Constant/healthConstant";
import axios from "axios";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function run(params) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = params;
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [{ text: "I am a virtual assistant on DocTalks, here to provide information and assistance related to health, medical conditions, and doctors. Ask me anything about symptoms, diseases, treatments, medications, or find doctors near you.Examples of questions you can ask:- What are the symptoms of COVID-19?- How can I manage diabetes?- Can you recommend a cardiologist in New York?- What are the side effects of aspirin?- How do I treat a migraine headache?Feel free to ask any health-related question, and I'll do my best to provide accurate and helpful information." }],
            },
            {
                role: "model",
                parts: [{ text: "**Symptoms of COVID-19:**\n\n* Fever or chills\n* Cough\n* Shortness of breath or difficulty breathing\n* Fatigue\n* Muscle or body aches\n* Headaches\n* New loss of taste or smell\n* Sore throat\n* Nausea or vomiting\n* Diarrhea\n\n**How to Manage Diabetes:**\n\n* Monitor blood glucose levels regularly\n* Follow a healthy diet\n* Exercise regularly\n* Take prescribed medications\n* Make lifestyle changes, such as quitting smoking and reducing stress\n* See your doctor for regular checkups\n\n**Recommended Cardiologist in New York:**\n\nDr. Jane Doe\nABC Cardiology\n123 Main Street, New York, NY 10001\n(123) 456-7890\n\n**Side Effects of Aspirin:**\n\n* Stomach upset\n* Heartburn\n* Nausea\n* Vomiting\n* Bleeding\n* Ringing in the ears (tinnitus)\n\n**How to Treat a Migraine Headache:**\n\n* Take over-the-counter pain relievers, such as ibuprofen or acetaminophen\n* Apply ice packs to the head\n* Rest in a dark, quiet room\n* Drink plenty of fluids\n* Try relaxation techniques, such as yoga or meditation" }],
            },
        ],
    });
    // Check if the prompt contains health-related keywords
    const isHealthRelated = checkIfHealthRelated(prompt);
    if (isHealthRelated) {
        // const result = await model.generateContent(prompt);
        const result = await chat.sendMessage(prompt);
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

export async function getDoctors() {
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/listdoctors`
    )
    return data.data;
}

export async function getOneDoctor(id) {
    // console.log(id);
    const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/user/getonedoctor/${id.id}`
    )
    return data;
}
