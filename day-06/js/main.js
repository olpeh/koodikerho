console.log('Hello world');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Madon suhteellinen nopeus
var speedFactor = 1 / 5;

var gameOver = false;
var score = 0;

var gameSize = {
  w: 400,
  h: 400
};

var snake = {
  speed: {
    x: 0,
    y: -1
  },
  position: {
    x: 200,
    y: 200
  },
  size: {
    x: 15,
    y: 15
  },
  color: 'blue'
};

var apple = {
  position: {
    x: 50,
    y: 50
  },
  size: {
    x: 10,
    y: 10
  },
  color: 'green'
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
  if (
    x <= 0 ||
    y <= 0 ||
    x >= gameSize.w - snake.size.x ||
    y >= gameSize.h - snake.size.y
  ) {
    gameOver = true;
  }
}

function render() {
  // Tyhjennetään kenttä
  ctx.clearRect(0, 0, gameSize.w, gameSize.h);

  // Piirretään mato
  ctx.fillStyle = snake.color;
  ctx.fillRect(snake.position.x, snake.position.y, snake.size.x, snake.size.y);

  // Piirretään omena
  ctx.fillStyle = apple.color;
  ctx.fillRect(apple.position.x, apple.position.y, apple.size.x, apple.size.y);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function moveApple() {
  apple.position.x = getRandomNumber(0, gameSize.w - apple.size.x);
  apple.position.y = getRandomNumber(0, gameSize.h - apple.size.y);
}

function checkCollitions() {
  var x = snake.position.x - apple.position.x;
  var y = snake.position.y - apple.position.y;
  var distance = Math.sqrt(x * x + y * y);

  // Jos mato osuu omenaan
  if (distance <= snake.size.x || distance <= apple.size.x) {
    // Kasvatetaan pisteitä
    score++;
    // Näytetään oikea score
    document.querySelector('.score').innerHTML = score;
    // Siirretään omena uuteen paikkaan
    moveApple();
  }
}

function game() {
  // Lasketaan madon seuraava sijainti
  update();
  // Päivitetään näkymä
  render();
  // Tsekataan onko mato kentän sisällä, jatkuuko peli
  checkGameConditions();
  // Tsekataan törmaykset
  checkCollitions();
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

document.addEventListener('keydown', event => {
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
