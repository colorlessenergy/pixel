(function () {
  'use strict'

  const socketController = window.app.socket;
  const socket = socketController.getSocketObject();

  const canvas = document.querySelector('#canvas');
  canvas.width = 500;
  canvas.height = 500;
  
  let PIXEL_SIZE = 25;
  let points = [];

  
  
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = PIXEL_SIZE;
  ctx.lineJoin = ctx.lineCap = 'round';
  
  const brushSizeSlider = document.querySelector('#brushSize');

  brushSizeSlider.addEventListener('input', function (ev) {
    let displayBrushSizeValue = document.querySelector('#currentBrushSize');
    let sliderValue = ev.target.value;

    displayBrushSizeValue.textContent = sliderValue;
    PIXEL_SIZE = sliderValue;
  });

  canvas.addEventListener('mousemove', paintCanvas);
  canvas.addEventListener('mouseout', resetPoints)
  canvas.addEventListener('touchmove', function (ev) {
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
  });
  
  
  socket.on('transmit pixel data', function (data) {
    data = data.pixelData;
    points.push(data);
    colorCanvas();
  });

  canvas.addEventListener('touchend', resetPoints);
  
  function colorCanvas () {
    console.log(points)
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineWidth = points[i].pixelSize;
      ctx.lineStyle = points[i].color;
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.closePath();
  }

  function paintCanvas(ev) {
    let pixelData = getMousePos(canvas, ev);
    pixelData.color = window.app.color;
    pixelData.pixelSize = PIXEL_SIZE;
    points.push(pixelData);
    colorCanvas();
    
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

  function resetPoints () {
    points = [];
  }

})();