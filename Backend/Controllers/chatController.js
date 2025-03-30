import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Message from "../Models/messagemodel.js";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});
export const generateChatResponse = async (req, res) => {
  
  try {
    const { message } = req.body; 
    console.log(message)

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message, 
    });
    const messagefromai= new Message({
      message:  response.text,
    })
    console.log(messagefromai);
    console.log("Hi");
    await messagefromai.save();

    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
