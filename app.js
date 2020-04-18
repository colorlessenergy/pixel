const express = require('express');
const app = express();

const server = require('http').Server(app);

server.listen(process.env.PORT || 8080, function () {
  console.log('server started');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('pixel data', (data) => {
    socket.broadcast.emit('transmit pixel data', { pixelData: data });
  });
});