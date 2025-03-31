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

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "https://chat-assit.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,  
  credentials: true,  
  methods: "GET,POST,PUT,DELETE,OPTIONS",  
  allowedHeaders: "Content-Type,Authorization"
}));

// Handle preflight requests
app.options("*", cors()); 

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Routes
app.use('/api/auth', authroute);
app.use('/api/chat', chatroute);
app.use('/api/message', messageroute);

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
