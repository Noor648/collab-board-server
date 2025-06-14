import express from "express";
import cors from "cors";
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Start http server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Web socket server
// Using server instance to run them at the same port as server
const wss = new WebSocketServer({server})

wss.on("connection", (ws) => {
  ws.on("message", (data)=> {
    console.log("data from client :", data);
    ws.send("Handshake protocol");
  })
})