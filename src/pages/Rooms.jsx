import React, { useState, useEffect } from "react";
import { useTheme } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Rooms() {
  const { theme } = useTheme();
  const { problemId } = useParams(); // Get problemId from URL
  const navigate = useNavigate();

  // Read logged in user from localStorage
  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

  // Redirect to /profile if user is not logged in
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/profile") ;
    }
  }, [navigate, loggedInUser]);

  const [users] = useState([
    { name: "Alice", avatar: "🦉" },
    { name: "Bob", avatar: "🦁" },
    { name: "Charlie", avatar: "🐼" },
  ]);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [muted, setMuted] = useState(false);
  const [problem, setProblem] = useState(null);

  // Fetch chats from backend (on mount and when loggedInUser changes)
  const fetchChats = async () => {
    try {
      const response = await fetch("/api/rooms");
      if (response.ok) {
        const chats = await response.json();
        setMessages(chats);
      } else {
        console.error("Error fetching chats");
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch problem details when problemId changes
  useEffect(() => {
    if (problemId) {
      fetch(`http://localhost:3000/api/problems/${problemId}`)
        .then((res) => res.json())
        .then((data) => setProblem(data));
    }
  }, [problemId]);

  useEffect(() => {
    if (loggedInUser) {
      fetchChats();
    }
  }, [loggedInUser]);

  // Set up Socket.IO client to listen for new chat messages
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("chat message", (msg) => {
      // Append new message to state
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const newMsg = {
        sender: loggedInUser.username,
        message: input,
      };
      try {
        // POST the new message to backend.
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMsg),
        });
        if (!response.ok) {
          alert("Error sending message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setInput("");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Room link copied!");
  };

  const handleLeaveRoom = () => {
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col md:flex-row max-w-5xl mx-auto mt-10 rounded shadow transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ minHeight: "70vh" }}
    >
      {/* Sidebar */}
      <div
        className={`md:w-1/4 w-full border-b md:border-b-0 md:border-r p-6 flex flex-col ${
          theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-gray-100 border-gray-200"
        }`}
      >
        <h3 className="text-lg font-bold mb-4">Users in Room</h3>
        <ul className="mb-6">
          {users.map((u, i) => (
            <li key={i} className="flex items-center mb-3">
              <span className="text-2xl mr-2">{u.avatar}</span>
              <span>{u.name}</span>
            </li>
          ))}
        </ul>
        {/* Show problem topics if available */}
        {problem && problem.topics && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Problem Topics</h4>
            <div className="flex flex-wrap gap-2">
              {problem.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-semibold shadow-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-2">
          <button
            className="w-full px-3 py-2 rounded bg-blue-900 text-white hover:bg-blue-950 font-semibold transition"
            onClick={handleLeaveRoom}
          >
            Leave Room
          </button>
          <button
            className="w-full px-3 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 font-semibold transition"
            onClick={handleCopyLink}
          >
            Copy Room Link
          </button>
          <button
            className={`w-full px-3 py-2 rounded font-semibold transition ${
              muted
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
            onClick={() => setMuted((m) => !m)}
          >
            {muted ? "Unmute Notifications" : "Mute Notifications"}
          </button>
        </div>
      </div>
      {/* Main Room */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Interactive Room</h2>
            {/* Show problem title if available */}
            {problem && (
              <div className="text-sm opacity-70">
                Problem: <span className="font-semibold">{problem.title}</span>
              </div>
            )}
          </div>
          <span className="text-sm opacity-70">
            Room ID: <span className="font-mono">{problemId || "12345"}</span>
          </span>
        </div>
        {/* Chat Area */}
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
              <span className="font-bold">{msg.sender}: </span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
        {/* Message Input */}
        <div className="flex">
          <input
            className={`flex-1 px-4 py-2 rounded-l border outline-none transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={muted}
          />
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-r hover:bg-blue-950 font-semibold transition"
            onClick={handleSend}
            disabled={muted}
          >
            Send
          </button>
        </div>
        {muted && (
          <div className="text-yellow-400 mt-2 text-sm font-semibold">
            Notifications are muted. You won't receive new message alerts.
          </div>
        )}
      </div>
    </div>
  );
}