console.log('Hello world');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';

// Madon suhteellinen nopeus
var speedFactor = 1 / 20;

var gameOver = false;

var gameSize = {
  w: 600,
  h: 600
};

var snake = {
  speed: {
    x: 0,
    y: -1
  },
  position: {
    x: 295,
    y: 295
  },
  size: {
    x: 10,
    y: 10
  }
};

var previousTime = performance.now();

function update() {
  var timeNow = performance.now();
  var timeDiff = timeNow - previousTime;
  // Lasketaan varsinaiset nopeudet X ja Y suunnassa
  var actualSpeedX = snake.speed.x * speedFactor;
  var actualSpeedY = snake.speed.y * speedFactor;

  // v = s / t -> s = vt
  // Lasketaan kuljettu matka X ja Y suunnassa
  var distanceX = actualSpeedX * timeDiff;
  var distanceY = actualSpeedY * timeDiff;

  // Päivitetään madon tuleva sijainti
  snake.position.x += distanceX;
  snake.position.y += distanceY;

  // Päivitetään edelliseksi ajaksi ttämän kierroksen aika
  previousTime = timeNow;
}

function checkGameConditions() {
  var x = snake.position.x;
  var y = snake.position.y;

  // Tarkistetaan onko mato vielä kentän sisällä vai ei
  if (x <= 0 || y <= 0 || x >= gameSize.w || y >= gameSize.h) {
    gameOver = true;
  }
}

function render() {
  ctx.clearRect(0, 0, gameSize.w, gameSize.h);
  ctx.fillRect(snake.position.x, snake.position.y, snake.size.x, snake.size.y);
}

function game() {
  // Lasketaan madon seuraava sijainti
  update();
  // Tsekataan onko mato kentän sisällä, jatkuuko peli
  checkGameConditions();
  // Päivitetään näkymä
  render();
}

// Start the game
function timeout() {
  setTimeout(function() {
    if (!gameOver) {
      game();
      timeout();
    } else {
      alert('Alert game over');
    }
  }, 10);
}

timeout();

document.addEventListener('keypress', event => {
  const keyName = event.key;
  console.log(keyName);
  if (keyName === 'ArrowLeft') {
    snake.speed = {
      x: -1,
      y: 0
    };
  }

  if (keyName === 'ArrowRight') {
    snake.speed = {
      x: 1,
      y: 0
    };
  }

  if (keyName === 'ArrowUp') {
    snake.speed = {
      x: 0,
      y: -1
    };
  }

  if (keyName === 'ArrowDown') {
    snake.speed = {
      x: 0,
      y: 1
    };
  }
});
