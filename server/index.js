const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// Cargar certificados generados por vite-plugin-mkcert
const certPath = path.join(process.env.USERPROFILE, '.vite-plugin-mkcert');
const options = {
  key: fs.readFileSync(path.join(certPath, 'dev.pem')),
  cert: fs.readFileSync(path.join(certPath, 'cert.pem'))
};

const server = https.createServer(options, app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const players = {};
const objects = {
  'cube1': { id: 'cube1', x: 0, y: 1.6, z: -2, rx: 0, ry: 0, rz: 0, owner: null }
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // --- PLAYER LOGIC ---
  players[socket.id] = {
    id: socket.id,
    x: 0, y: 0, z: 0,
    rx: 0, ry: 0, rz: 0,
    color: Math.random() * 0xffffff
  };

  // Enviar estado inicial
  socket.emit('current-players', players);
  socket.emit('current-objects', objects);

  // Notificar a los demás
  socket.broadcast.emit('player-joined', players[socket.id]);

  socket.on('player-move', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      players[socket.id].z = data.z;
      players[socket.id].rx = data.rx;
      players[socket.id].ry = data.ry;
      players[socket.id].rz = data.rz;
      socket.broadcast.emit('player-moved', players[socket.id]);
    }
  });

  // --- OBJECT LOGIC ---
  socket.on('object-grab', (data) => {
    if (objects[data.id]) {
      objects[data.id].owner = socket.id;
      socket.broadcast.emit('object-grabbed', { id: data.id, owner: socket.id });
      console.log(`Object ${data.id} grabbed by ${socket.id}`);
    }
  });

  socket.on('object-release', (data) => {
    if (objects[data.id] && objects[data.id].owner === socket.id) {
      objects[data.id].owner = null;
      Object.assign(objects[data.id], data);
      socket.broadcast.emit('object-released', data);
      console.log(`Object ${data.id} released by ${socket.id}`);
    }
  });

  socket.on('object-move', (data) => {
    if (objects[data.id] && objects[data.id].owner === socket.id) {
      Object.assign(objects[data.id], data);
      socket.broadcast.emit('object-moved', data);
    }
  });

  // --- DEBUG LOGIC ---
  socket.on('identify', (type) => {
    console.log(`Client ${socket.id} identified as: ${type}`);
  });

  socket.on('log', (data) => {
    io.emit('log', data);
  });

  socket.on('command', (command) => {
    io.emit('command', command);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // Liberar objetos que tenía agarrados
    Object.keys(objects).forEach(key => {
      if (objects[key].owner === socket.id) {
        objects[key].owner = null;
        io.emit('object-released', objects[key]);
      }
    });

    // Eliminar jugador
    if (players[socket.id]) {
      delete players[socket.id];
      io.emit('player-disconnected', socket.id);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Debug Server running on port ${PORT}`);
});
