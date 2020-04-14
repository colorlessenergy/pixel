(function () {
  'use strict'

  const canvas = document.querySelector('#canvas');
  canvas.width = 500;
  canvas.height = 500;
  
  const PIXEL_SIZE = 25;
  
  const ctx = canvas.getContext('2d');
  
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  canvas.addEventListener('mousemove', paintCanvas);
  canvas.addEventListener('touchmove', paintCanvas);

  function paintCanvas(ev) {
    ctx.fillStyle = 'white';
    ctx.fillRect(ev.offsetX - 1, ev.offsetY - 1, PIXEL_SIZE, PIXEL_SIZE)
  }

})();