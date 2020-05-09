import colorPicker from './colorpicker.js';
import socketController from './socket-controller.js';

(function () {
  'use strict'
  const socket = socketController.getSocketObject();

  const canvas = document.querySelector('#canvas');
  canvas.width = 500;
  canvas.height = 500;
  
  let PIXEL_SIZE = 25;
  
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = PIXEL_SIZE;

  // to make brush round
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const brushSizeSlider = document.querySelector('#brushSize');

  brushSizeSlider.addEventListener('input', function (ev) {
    let displayBrushSizeValue = document.querySelector('#currentBrushSize');
    let sliderValue = ev.target.value;

    displayBrushSizeValue.textContent = sliderValue;
    PIXEL_SIZE = sliderValue;
  });

  canvas.addEventListener('mousemove', paintCanvas);
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
    colorCanvas(data.pixelData);
  });

  /**
  *
  * @param {Object} data - holds the position X, Y, color and size for drawing on the canvas
  * @param {Number} data.x - the x position of the input
  * @param {Number} data.y - the y position of the input
  * @param {String} data.color - the color of the input
  * @param {pixelSize} data.pixelSize - the size of the input
  *
  *
  * takes in data to draw on the canvas.
  * 
  * We use moveTo(data.x, data.y) lineTo with the same value but add
  * a small number to make the brush round.
  */

  function colorCanvas (pixelData) {
    ctx.lineWidth = pixelData.pixelSize;
    ctx.strokeStyle = pixelData.color;
    ctx.beginPath();
    ctx.moveTo(pixelData.x, pixelData.y);
    ctx.lineTo(pixelData.x + Number.MIN_VALUE, pixelData.y + Number.MIN_VALUE);
    ctx.stroke();
    ctx.closePath();
  }

  function paintCanvas(ev) {
    let pixelData = getMousePos(canvas, ev);
    pixelData.color = window.app.color;
    pixelData.pixelSize = PIXEL_SIZE;
    colorCanvas(pixelData);
    socketController.sendPixelData(pixelData);
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