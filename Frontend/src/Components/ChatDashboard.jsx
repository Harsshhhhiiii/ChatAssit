import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

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
  const [userId,setUserId]=useState()

  const navigate = useNavigate();

  // Save messages to localStorage on state update
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    const storedUser = localStorage.getItem("chat-user");
    const username = storedUser ? JSON.parse(storedUser).username : authUser?.username;
    setUserId(username)
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
    <div className="flex h-screen w-full bg-gradient-to-b from-blue-50 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <ul className="mt-4 space-y-2">
          <li 
            className={`p-2 rounded cursor-pointer ${activePage === "Dashboard" ? "bg-blue-200" : ""}`}
            onClick={() => handleNavigation("Dashboard")}
          >
            Dashboard
          </li>
          <li className="p-2 cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
            Settings
          </li>
          {showSettings && (
            <ul className="ml-4 mt-2 space-y-2">
              <li 
                className="p-2 bg-red-100 rounded cursor-pointer" 
                onClick={() => handleNavigation("Logout")}
              >
                Logout
              </li>
            </ul>
          )}
          <li 
            className={`p-2 cursor-pointer ${activePage === "View Previous Chats" ? "bg-blue-200" : ""}`}
            onClick={() => handleNavigation("View Previous Chats")}
          >
            View Previous Chats
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">
            Hello <span>{authUser?.username || "Guest"}</span> !!
          </h1>
          <div className="flex space-x-4">
            <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Chat with AI</h2>
          <div className="space-y-2 mt-4 max-h-96 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg ${msg.user === "You" ? "bg-blue-100 text-right" : "bg-gray-100"}`}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex mt-4 border-t pt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-3 border rounded-lg"
            />
            <button 
              onClick={sendMessage} 
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;
