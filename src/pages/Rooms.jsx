import React, { useState, useEffect } from "react";
import { useTheme } from "../App";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Rooms() {
  const { theme } = useTheme();
  const { problemId } = useParams();
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
      className={`flex flex-col md:flex-row max-w-5xl mx-auto mt-10 rounded-2xl shadow-2xl transition-colors duration-300 border-2 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-gray-800"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900 border-blue-200"
      }`}
      style={{ minHeight: "70vh" }}
    >
      {/* Sidebar */}
      <div
        className={`md:w-1/4 w-full border-b-2 md:border-b-0 md:border-r-2 p-6 flex flex-col ${
          theme === "dark"
            ? "bg-gray-700/70 border-gray-800"
            : "bg-white/70 border-blue-200"
        } rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none backdrop-blur-md`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <h3 className="text-lg font-bold mb-4 tracking-wide text-blue-900 dark:text-blue-300">
          Users in Room
        </h3>
        <ul className="mb-6">
          {users.map((u, i) => (
            <li
              key={i}
              className="flex items-center mb-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition"
            >
              <span className="text-2xl mr-2">{u.avatar}</span>
              <span className="font-semibold">{u.name}</span>
            </li>
          ))}
        </ul>
        {/* Show problem topics if available */}
        {problem && problem.topics && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">
              Problem Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {problem.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-semibold shadow"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="mt-auto flex flex-col gap-2">
          <button
            className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 font-semibold shadow transition"
            onClick={handleLeaveRoom}
          >
            Leave Room
          </button>
          <button
            className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-700 text-white hover:from-blue-500 hover:to-blue-800 font-semibold shadow transition"
            onClick={handleCopyLink}
          >
            Copy Room Link
          </button>
          <button
            className={`w-full px-3 py-2 rounded-lg font-semibold shadow transition ${
              muted
                ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:from-yellow-400 hover:to-yellow-600"
                : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white hover:from-gray-400 hover:to-gray-500 dark:hover:from-gray-800 dark:hover:to-gray-900"
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
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-900 dark:text-blue-200">
              Interactive Room
            </h2>
            {/* Show problem title if available */}
            {problem && (
              <div className="text-sm opacity-80 mt-1">
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                  Problem:
                </span>{" "}
                <span className="font-semibold">{problem.title}</span>
              </div>
            )}
          </div>
          <span className="text-sm opacity-70 bg-blue-100 dark:bg-gray-800 px-3 py-1 rounded-full font-mono">
            Room ID: <span className="font-bold">{problemId || "12345"}</span>
          </span>
        </div>
        {/* Chat Area */}
        <div
          className="flex-1 overflow-y-auto mb-4 rounded-xl p-4 shadow-inner border-2 border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
          style={{
            backdropFilter: "blur(10px)",
            minHeight: "200px",
            maxHeight: "300px",
          }}
        >
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === loggedInUser?.username
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 ml-auto w-fit"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white mr-auto w-fit"
                }`}
                style={{ maxWidth: "80%" }}
              >
                <span className="font-bold">{msg.sender}: </span>
                <span>{msg.message}</span>
              </div>
            ))
          )}
        </div>
        {/* Message Input */}
        <div className="flex mt-2">
          <input
            className={`flex-1 px-4 py-2 rounded-l-lg border-2 outline-none transition-colors duration-300 shadow ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-blue-200 text-gray-900"
            }`}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={muted}
          />
          <button
            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-2 rounded-r-lg font-semibold shadow hover:from-blue-800 hover:to-blue-950 transition"
            onClick={handleSend}
            disabled={muted}
          >
            Send
          </button>
        </div>
        {muted && (
          <div className="text-yellow-400 mt-2 text-sm font-semibold text-center">
            Notifications are muted. You won't receive new message alerts.
          </div>
        )}
      </div>
    </div>
  );
}
