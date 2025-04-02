import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { AISuggestion } from "./AISuggestion";
const loadMessages = () => {
  const savedMessages = localStorage.getItem("chatMessages");
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const Insights = ({ aiSuggestions }) => {
  const [messages, setMessages] = useState(loadMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typedMessage,setTypedMessage]=useState()
  const handleTypedMessage=(e)=>{
      e.preventDefault()
      console.log(typedMessage)
      setTypedMessage(e.target.value)
  }
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    const text = typedMessage
    setTypedMessage("")
    console.log(text)
    if (text) {
      const userMessage = { text, user: "You" };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(
          `https://chatassit.onrender.com/api/information?question=${text}`
        );
        if (!response.ok) throw new Error("Failed to fetch response");
        
        const data = await response.json();
        if (data.answer) {
          setMessages(prev => [...prev, { text: data.answer, user: "AI" }]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSuggestionClick = (text) => {
    console.log(text)
    setTypedMessage(text)
    // sendMessage();
  };

 
  return (
    <>
    <div className="h-full flex flex-col">
      {/* AI Suggestions */}
      {messages.length === 0 && (
        <div className="inline-flex items-center gap-6 p-6">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion.text)}>
              <AISuggestion suggestion={suggestion} index={index} />
            </div>
          ))}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 my-2 rounded-lg max-w-lg ${
              msg.user === "You" 
                ? "ml-auto bg-green-200" 
                : "mr-auto bg-gray-200"
            }`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 px-6 pt-2">
          {error}
        </div>
      )}

      {/* Input & Button Container */}
      <div className="p-6 pt-4 border-t border-gray-200">
        <div className="flex gap-4">
          <Input
            value={typedMessage}
            onChange={handleTypedMessage}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything about the group conversations!"
            className="flex-grow rounded-[7px] border-black shadow-[0px_6px_0px_#7f7f7f40] placeholder:text-[#dadada]"
          />
          <Button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-[#9acb34] rounded-[7px] border border-solid border-black hover:bg-[#8ab92f] min-w-[91px] h-[39px]"
          >
            {loading ? "Sending..." : <img className="w-[18px] h-[18px]" alt="Send" src="/group.png" />}
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};
export default Insights