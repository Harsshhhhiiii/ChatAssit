import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { FaRegCommentDots } from "react-icons/fa";
import Groups from "./Groups";
import Tasks from "./Full_Tasks";
import SideBar from "./SideBar";
import Escalations from "./Escalations";

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

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, user: "You" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://chatassit.onrender.com/api/information?question=${input}`);
        if (!response.ok) throw new Error("Failed to fetch response");

        const data = await response.json();
        console.log(data)
        if (data.answer) {
          setMessages((prevMessages) => [...prevMessages, { text: data.answer, user: "AI" }]);
        }
      } catch (error) {
        setError("Failed to fetch AI response. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex h-screen w-full bg-gray-100 p-4">
    <SideBar/>
      <main className="flex-1 p-8 bg-white shadow-lg rounded-lg ml-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Good Morning, {authUser?.username || "User"}!</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Groups/>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <Tasks/>
          </div>
          <Escalations/>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-md h-[40vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 my-2 rounded-lg max-w-lg ${msg.user === "You" ? "ml-auto bg-green-200" : "mr-auto bg-gray-200"}`}
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
            placeholder="Ask me anything..."
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : <FaRegCommentDots />}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;
