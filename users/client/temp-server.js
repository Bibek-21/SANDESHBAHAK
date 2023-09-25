const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('login', (userId) => {
        userSocketMap[userId] = socket.id;
      });
    // Handle messages when a user sends one
    socket.on('send-message', (data) => {
        const receiverSocketId = userSocketMap[data.receiverId]
      // Save the message to the database
      io.to(receiverSocketId).emit('receive-message', data.message);
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      
        // Remove the user's mapping on disconnection
        for (const userId in userSocketMap) {
          if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            break;
          }
        }
      
      });
      
  });
  
// Start your Express server
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// client ley send-message ma receiver socketid ra data pathauxa
//code for client side is
/*

const socket = io.connect('http://localhost:3000'); // Replace with your server URL

// Send a message to the server
socket.emit('send-message', {
  recipientSocketId: 'socket_id_of_recipient', //receiverId
  message: 'Hello, this is a message!',
});

// Receive messages from the server
socket.on('receive-message', (message) => {
  // Handle and display the received message in your UI
});

 */