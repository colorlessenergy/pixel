(function () {
  'use strict'
  // const socket = io('http://localhost:8080');
  const socket = io('https://pixel1.herokuapp.com/');

  let socketController = {
    sendPixelData: function (pixelData) {
      socket.emit('pixel data', pixelData)
    },
    getSocketObject: function () {
      return socket;
    }
  }

  window.app = window.app || {};

  window.app.socket = socketController;
})();