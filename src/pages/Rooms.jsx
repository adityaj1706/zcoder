import React, { useState } from "react";
import { useTheme } from "../App";

export default function Rooms() {
  const { theme } = useTheme();
  const [users] = useState(["Alice", "Bob", "Charlie"]);
  const [messages, setMessages] = useState([
    { user: "Alice", text: "Hi everyone!" },
    { user: "Bob", text: "Hello Alice!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { user: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row max-w-5xl mx-auto mt-10 rounded shadow transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      style={{ minHeight: "60vh" }}
    >
      {/* Users List */}
      <div
        className={`md:w-1/4 w-full border-b md:border-b-0 md:border-r p-6
        ${
          theme === "dark"
            ? "bg-gray-950 border-gray-800"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        <h3 className="text-lg font-bold mb-4">Users in Room</h3>
        <ul>
          {users.map((u, i) => (
            <li key={i} className="mb-2">
              {u}
            </li>
          ))}
        </ul>
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-2xl font-semibold mb-4">Interactive Room</h2>
        <div
          className="flex-1 overflow-y-auto mb-4 bg-opacity-50 rounded p-4"
          style={{
            background: theme === "dark" ? "#23272e" : "#f3f4f6",
            minHeight: "200px",
            maxHeight: "300px",
          }}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <span className="font-bold">{msg.user}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className={`flex-1 px-4 py-2 rounded-l border outline-none transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700 font-semibold transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
