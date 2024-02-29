import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useMutation } from "@tanstack/react-query";
import { run } from "../utils/datGetter";

const ChatBot = () => {
  // State variables for messages, user input, and loading state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: run,
    onSuccess: (response) => {
      setMessages([...messages, { text: response, sender: "ai" }]);
    },
  });

  const handleMessageSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      console.log("Input:", input);
      mutate(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header section */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">
          Welcome to DoctorTalks AI Bot!
        </h1>
        <p className="text-gray-600">
          Hi there! I&apos;m DoctorTalks, your AI assistant. How can I assist
          you today?
        </p>
      </div>

      {/* Message display section */}
      <div
        className="flex-1 overflow-y-auto px-4 py-12"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {messages.map((message, index) => (
          <div
            className={`chat opacity-70 mb-4 ${
              message.sender === "user" ? "chat-end" : "chat-start"
            }`}
            key={index}
          >
            <div className="chat-bubble">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
          </div>
        )}
      </div>

      {/* Input section */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex items-center">
        <textarea
          className="max-h-40 min-h-12 flex-1 border border-gray-400 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleMessageSend(); // Handle message send on Enter key press
            }
          }}
          placeholder="Type your message..."
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleMessageSend}
          disabled={isPending}
        >
          {isPending && <span className="loading loading-spinner" />}
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
