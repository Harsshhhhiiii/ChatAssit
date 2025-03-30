import React, { useEffect, useState } from "react";
import useGetData from "../Hooks/useGetData";

const ChatHistory = () => {
  const { messages, loading } = useGetData();



  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">AI Chat History</h1>

      <div className="bg-white shadow-lg rounded-lg p-4 w-96 max-h-96 overflow-y-auto">
        {loading && <p className="text-gray-500">Loading...</p>}
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="p-2 border-b last:border-b-0">
              <p className="text-lg text-gray-800">{msg.messages}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500">No  messages found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
