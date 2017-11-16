console.log('Hello world');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';

var posX = 295;
var posY = 295;
var sizeX = 10;
var sizeY = 10;

var i = 0;
function timeout() {
  setTimeout(function() {
    if (i < 295) {
      console.log('Looppi: ' + i++);
      ctx.clearRect(0, 0, 600, 600);
      ctx.fillRect(posX, posY - i, sizeX, sizeY);
      timeout();
    } else {
      //  i = 0;
      //   timeout();
      alert('Game over');
    }
  }, 10);
}

timeout();
