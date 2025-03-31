import React from "react";
import useGetData from "../Hooks/useGetData";
import { motion } from "framer-motion";

const ChatHistory = () => {
  const { messages, loading } = useGetData();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
        AI Chat History
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-lg max-h-96 overflow-y-auto border border-gray-200">
        {loading ? (
          <p className="text-gray-500 animate-pulse text-center">Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-3 bg-blue-50 rounded-lg mb-2 shadow-sm border border-gray-300">
              <p className="text-lg text-gray-800">{msg.messages}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default ChatHistory;
