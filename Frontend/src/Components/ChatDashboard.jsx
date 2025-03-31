import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const loadMessages = () => {
  const savedMessages = localStorage.getItem("chatMessages");
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const ChatDashboard = () => {
  const [messages, setMessages] = useState(loadMessages());
  const { authUser } = useAuthContext();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    const storedUser = localStorage.getItem("chat-user");
    const username = storedUser ? JSON.parse(storedUser).username : authUser?.username;
    setUserId(username);
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, user: "You" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://chatassit.onrender.com/api/chat/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();
        if (data.reply) {
          setMessages((prevMessages) => [...prevMessages, { text: data.reply, user: "AI" }]);
        }
      } catch (error) {
        setError("Failed to fetch AI response. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    if (page === "Logout") {
      navigate("/logout");
    } else if (page === "View Previous Chats") {
      navigate(`/previous-chats/${userId}`);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-300 p-6">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 rounded-lg relative">
        <FiLogOut 
          className="absolute top-4 left-4 text-red-500 text-2xl cursor-pointer hover:text-red-700"
          onClick={() => navigate("/logout")}
        />
        <h2 className="text-lg font-semibold text-center text-gray-700">Menu</h2>
        <ul className="mt-6 space-y-4">
          <li 
            className={`p-3 rounded-lg cursor-pointer text-gray-700 font-semibold ${activePage === "Dashboard" ? "bg-blue-300 text-white" : "hover:bg-gray-200"}`}
            onClick={() => handleNavigation("Dashboard")}
          >
            Dashboard
          </li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg" onClick={() => setShowSettings(!showSettings)}>
            Settings
          </li>
          {showSettings && (
            <ul className="ml-4 mt-2 space-y-2">
              <li 
                className="p-3 bg-red-300 text-white rounded-lg cursor-pointer hover:bg-red-400" 
                onClick={() => handleNavigation("Logout")}
              >
                Logout
              </li>
            </ul>
          )}
          <li 
            className={`p-3 cursor-pointer rounded-lg text-gray-700 font-semibold ${activePage === "View Previous Chats" ? "bg-blue-300 text-white" : "hover:bg-gray-200"}`}
            onClick={() => handleNavigation("View Previous Chats")}
          >
            View Previous Chats
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello, <span className="text-indigo-600">{authUser?.username || "Guest"}</span>!
          </h1>
        </div>

        {/* Chat Interface */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md max-h-[70vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`p-4 my-2 rounded-lg w-fit max-w-lg ${msg.user === "You" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 text-gray-800"}`}
            >
              <strong className="block mb-1">{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="flex mt-4 border-t pt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={sendMessage} 
            className="ml-2 px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;
