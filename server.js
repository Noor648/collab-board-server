import express from "express";
import cors from "cors";
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import indexRoutes from './routes/index.js';
import prisma from './lib/prisma.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Start http server
async function startServer() {
  try {

    // ✅ try connecting to PostgreSQL
    await prisma.$connect();
    console.log("✅ Database connection established!");

    // ✅ try starting server
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // ✅ try starting Web socket server
    // Using server instance to run them at the same port as server
    const wss = new WebSocketServer({server})

    wss.on("connection", (ws) => {
      console.log("🔌 Client connected");
      ws.on("message", (data)=> {
        console.log("data from client %s:", data);
        ws.send("Handshake protocol");
      })
    })

  } catch(err) {

  }
}

startServer();