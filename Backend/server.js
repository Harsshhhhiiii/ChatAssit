import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authroute from './Routes/authroute.js';
import chatroute from './Routes/chatroute.js';
import messageroute from './Routes/messageroute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://chat-assit.vercel.app",
  "https://chat-assit-git-main-harshits-projects-99ccb490.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,  
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use((req, res, next) => {
  console.log("Cookies received:", req.cookies.jwt); 
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
app.get('/health',(req,res)=>{
  res.status(200).json({
    code:200,
    message:"Server is Healthy"
  })
})
app.use('/api/auth', authroute);
app.use('/api/chat', chatroute);
app.use('/api/message', messageroute);

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
