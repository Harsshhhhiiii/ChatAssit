import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";

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
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    const getGroups = async () => {
      const response = await fetch("http://localhost:3001/api/groups");
      const data = await response.json();
      setGroups(data.groups);
    };
    getGroups();

    const getTasks = async () => {
      const response = await fetch("http://localhost:3001/api/tasks");
      const data = await response.json();
      console.log(data.tasks.Tasks)
      const taskArray = data.tasks.Tasks.filter((e) => e.assignedTo == 101);
      
      setTasks(taskArray);
    };
    getTasks();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, user: "You" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/api/information?question=${input}`);
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

  const handleClick = (groupName) => {
    // You can change the path or logic here to navigate based on `groupName`
    navigate(`/groups/${groupName}`);
  };


  return (
    <div className="flex h-screen w-full bg-gray-100 p-4">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-md p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <FiLogOut
            className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
            onClick={() => navigate("/logout")}
          />
        </div>
        <ul className="space-y-4">
          <li className="p-3 rounded-lg cursor-pointer bg-green-100 text-green-700 font-semibold">Dashboard</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Insights</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Tasks</li>
          <li className="p-3 cursor-pointer hover:bg-gray-200 rounded-lg">Sales</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white shadow-lg rounded-lg ml-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Good Morning, {authUser?.username || "User"}!</h1>
        </div>

        {/* Groups, Tasks, Escalations */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-700 mb-2">Groups</h2>
            <ul>
              {groups.map((group, i) => {
                return (
                  <div onClick={() => handleClick(group)} key={i}>
                    <li className="p-2 bg-red-100 rounded-md mb-1 cursor-pointer hover:bg-red-200">{group}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-700 mb-2">Tasks</h2>
            <ul>
              {tasks.map((task, i) => {
                return (
                  <li className="p-2 bg-gray-100 rounded-md mb-1" key={i}>
                    {task.taskName}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-700 mb-2">Escalations ⚠️</h2>
            <ul>
              <li className="p-2 bg-red-100 rounded-md mb-1">Playground issue</li>
              <li className="p-2 bg-gray-100 rounded-md">Bug report</li>
            </ul>
          </div>
        </div>

        {/* Chat Messages */}
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

        {/* Input Section */}
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
