import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetData = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { authUser } = useAuthContext();
  const storedUser = localStorage.getItem("chat-user");
  const username = storedUser ? JSON.parse(storedUser).username : authUser?.username;

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://chatassit.onrender.com/api/message/previous-chats/${username}`,{
          method:"GET",
          headers: { "Content-Type": "application/json" },
          credentials:"include"
        });
        console.log(response)
        if (!response.ok) {
          throw new Error("No messages found for this user");
        }
        const data = await response.json();
        console.log(data)
        // const aiMessages = data.filter(msg => msg.sender === "AI" || msg.role === "assistant");
        setMessages(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [username]); 

  return { messages, loading };
};

export default useGetData;
