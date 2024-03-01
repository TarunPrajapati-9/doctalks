import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useMutation } from "@tanstack/react-query";
import { run } from "../utils/datGetter";
import { categories } from "../utils/category";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: run,
    onSuccess: (response) => {
      setMessages([...messages, { text: response, sender: "ai" }]);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages change

  const handleMessageSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      mutate(input);
      setInput("");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-center justify-center py-4 ">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to DoctorTalks AI Bot!
          </h1>
          <p className="text-gray-600">
            Hi there! I&apos;m DoctorTalks, your AI assistant. How can I assist
            you today?
          </p>
        </div>
        <select className="select select-bordered select-sm w-56 max-w-xs absolute float-right right-0 mr-2 mt-2">
          <option disabled selected>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
      </div>
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
        <div ref={messagesEndRef} />
        {isPending && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mt-4"></div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex items-center">
        <textarea
          className="max-h-40 min-h-12 flex-1 border border-gray-400 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleMessageSend();
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
