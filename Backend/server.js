import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authroute from './Routes/authroute.js';
import chatroute from './Routes/chatroute.js'
import messageroute from './Routes/messageroute.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://chat-assit.vercel.app",  
  credentials: true  
}));

 app.get('/', (req, res) => {
  
    res.json({x:'Hello World!'});
});
app.use('/api/auth',authroute);
app.use('/api/chat',chatroute);
app.use('/api/message',messageroute);


const mongoURI=process.env.MONGODB_URI;


  
  mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  }).catch(err => {
    console.error("MongoDB connection error:", err);
  });


app.listen(PORT, () => {
   
    console.log(`Server is running on http://localhost:${PORT}`);
});