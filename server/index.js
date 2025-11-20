const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permitir conexiones desde cualquier origen (útil para desarrollo local/LAN)
    methods: ["GET", "POST"]
  }
});

// Estado compartido simple (para persistencia básica entre recargas)
let gameState = {
  logs: []
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Identificar tipo de cliente
  socket.on('identify', (type) => {
    console.log(`Client ${socket.id} identified as: ${type}`);
    socket.join(type); // 'game' or 'admin'
  });

  // Recibir logs del juego
  socket.on('game_log', (data) => {
    const logEntry = { timestamp: new Date(), ...data };
    gameState.logs.push(logEntry);
    // Limitar historial
    if (gameState.logs.length > 100) gameState.logs.shift();
    
    // Reenviar a admins
    io.to('admin').emit('new_log', logEntry);
  });

  // Recibir comandos desde admin
  socket.on('admin_command', (command) => {
    console.log('Admin command received:', command);
    // Reenviar al juego
    io.to('game').emit('execute_command', command);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Debug Server running on port ${PORT}`);
});
