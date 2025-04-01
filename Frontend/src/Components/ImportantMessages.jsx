import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // Icon for important messages

const ImportantMessages = () => {
  const { groupName } = useParams(); // Get the group name from the URL
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapGrouping={
    Tech:"TechGroupMessages",
    Sales:"SalesGroupMessages",
    Design:"DesignGroupMessages"
  }
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/groups/${groupName}`);
        if (!response.ok) {
          throw new Error(`Error fetching messages for group: ${groupName}`);
        }
        const data = await response.json();
        const x=mapGrouping[groupName]
        console.log(x)
        console.log(data.messages[x])
        setMessages(data.messages[x]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [groupName]);

  return (
    <div className="h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Important Messages: {groupName}</h1>
          <FaExclamationCircle className="text-yellow-500 text-3xl" />
        </div>

        {/* Displaying loading, error, or messages */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">No important messages at the moment.</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-yellow-100 rounded-md shadow-sm hover:bg-yellow-200 cursor-pointer"
                >
                  <div className="font-medium text-gray-800">{msg.sentBy}</div>
                  <p className="text-gray-600">{msg.message}</p>
                  <div className="text-xs text-gray-400 mt-2">{new Date(msg.time).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantMessages;
