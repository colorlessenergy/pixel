(function () {
  'use strict'

  const socketController = window.app.socket;
  const socket = socketController.getSocketObject();

  const canvas = document.querySelector('#canvas');
  canvas.width = 500;
  canvas.height = 500;
  
  const PIXEL_SIZE = 25;
  
  const ctx = canvas.getContext('2d');
  
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  canvas.addEventListener('mousemove', paintCanvas);
  canvas.addEventListener('touchmove', paintCanvas);


  socket.on('transmit pixel data', function (data) {
    data = data.pixelData;
    colorCanvas(data);
  });

  function colorCanvas (data) {
    ctx.fillStyle = data.color;
    ctx.fillRect(data.x, data.y, PIXEL_SIZE, PIXEL_SIZE);
  }

  function paintCanvas(ev) {
    let pixelData = {
      x: ev.offsetX - 1,
      y: ev.offsetY - 1,
      color: window.app.color
    }

    colorCanvas(pixelData);
    socketController.sendPixelData(pixelData)
  }

})();