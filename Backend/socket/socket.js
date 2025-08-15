import express from "express";
import http from "http";
// import { createServer } from 'node:http';
import { Server } from "socket.io";

const app = express();
// const server = createServer(app);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export const userSocketMap={}
export const getReceiverSocketId=(receiver)=>{
    return userSocketMap[receiver]
}
io.on("connection", (socket) => {
    const userId=socket.handshake.query.userId
    if(userId!=undefined){
       userSocketMap[userId]=socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))


  socket.on("disconnect", () => {
   delete userSocketMap[userId]
   io.emit("getOnlineUsers",Object.keys(userSocketMap))
  });
});

export { app, server, io };
