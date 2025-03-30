import Message from "../Models/messagemodel.js";

export const getUserMessages = async (req, res) => {
    try {
      const { username } = req.params;
      
      const userMessages = await Message.find({ username });
  
      if (!userMessages.length) {
        return res.status(404).json({ message: "No messages found for this user" });
      }
  
      res.status(200).json(userMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    }
  };
  