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

  canvas.addEventListener("touchmove", function (ev) {
    // prevent scrolling
    if (ev.target == canvas) {
      ev.preventDefault();
    }

    var touch = ev.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, false);


  socket.on('transmit pixel data', function (data) {
    data = data.pixelData;
    colorCanvas(data);
  });

  /**
   * 
   * @param {Object} data - holds the position X, Y and color for drawing on the canvas
   * @param {Number} data.x - the x position of the input
   * @param {Number} data.Y - the Y position of the input
   * 
   * 
   * takes in data to draw on the canvas
   */

  function colorCanvas (data) {
    ctx.fillStyle = data.color;
    ctx.fillRect(data.x, data.y, PIXEL_SIZE, PIXEL_SIZE);
  }

  function paintCanvas(ev) {
    let pixelData = getMousePos(canvas, ev);
    pixelData.color = window.app.color;
    
    colorCanvas(pixelData);
    socketController.sendPixelData(pixelData)
  }

  // Get the position of the mouse relative to the canvas
  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };

  }

})();