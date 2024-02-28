import { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleMessageSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">
          Welcome to DoctorTalks AI Bot!
        </h1>
        <p className="text-gray-600">
          Hi there! I&apos;m DoctorTalks, your AI assistant. How can I assist
          you today?
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-12">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block bg-gray-300 rounded-lg p-2">
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-400 rounded-md py-2 px-4 mr-2 focus:outline-none focus:ring focus:border-blue-300"
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
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
