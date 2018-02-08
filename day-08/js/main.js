console.log('Hello world');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sound = new Audio('sound.wav');

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
    x: Math.floor(gameSize.w / 2 / 15),
    y: Math.floor(gameSize.h / 2 / 15)
  },
  size: {
    x: 15,
    y: 15
  },
  color: 'blue',
  tail: 3,
  trail: []
};

var apple = {
  position: {
    x: 2,
    y: 2
  },
  size: {
    x: 15,
    y: 15
  },
  color: 'green'
};

function update() {
  // Tallennetaan madon edellinen sijainti "häntään"
  snake.trail.push({
    x: snake.position.x,
    y: snake.position.y
  });

  // Rajoitetaan "hännän" kokoa maksimissaan hännän pituiseksi
  while (snake.trail.length > snake.tail) {
    snake.trail.shift();
  }

  // Päivitetään madon tuleva sijainti
  snake.position.x += snake.speed.x;
  snake.position.y += snake.speed.y;
}

function checkGameConditions() {
  var x = snake.position.x;
  var y = snake.position.y;

  // Tarkistetaan onko mato vielä kentän sisällä vai ei
  if (
    x < 0 ||
    y < 0 ||
    x > Math.floor(gameSize.w / snake.size.x) ||
    y > Math.floor(gameSize.h / snake.size.y)
  ) {
    gameOver = true;
  }

  // Tarkistetaan osuuko mato itseensä
  for (var i = 0; i < snake.trail.length; i++) {
    if (x === snake.trail[i].x && y === snake.trail[i].y) {
      gameOver = true;
    }
  }
}

function render() {
  // Tyhjennetään kenttä
  ctx.clearRect(0, 0, gameSize.w, gameSize.h);

  // Piirretään mato
  ctx.fillStyle = snake.color;
  for (var i = 0; i < snake.trail.length; i++) {
    ctx.fillRect(
      snake.trail[i].x * snake.size.x,
      snake.trail[i].y * snake.size.y,
      snake.size.x - 2,
      snake.size.y - 2
    );
  }

  // Piirretään omena
  ctx.fillStyle = apple.color;
  ctx.fillRect(
    apple.position.x * apple.size.x,
    apple.position.y * apple.size.y,
    apple.size.x - 2,
    apple.size.y - 2
  );
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function moveApple() {
  apple.position.x = getRandomNumber(0, Math.floor(gameSize.w / apple.size.x));
  apple.position.y = getRandomNumber(0, Math.floor(gameSize.h / apple.size.y));

  for (var i = 0; i < snake.trail.length; i++) {
    if (
      apple.position.x === snake.trail[i].x &&
      apple.position.y === snake.trail[i].y
    ) {
      moveApple();
      break;
    }
  }
}

function checkCollitions() {
  // Jos mato osuu omenaan
  if (
    apple.position.x === snake.position.x &&
    apple.position.y === snake.position.y
  ) {
    // Kasvatetaan pisteitä
    score++;
    // Soitetaan ääni
    sound.play();
    // Kasvatetaan madon kokoa
    snake.tail++;
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
      var name = prompt("Game over. What's your name?");
      console.log(name);
      if (name) {
        writeScore(name, score);
        getTopScores();
      }
    }
  }, 1000 / 15);
}

timeout();

document.addEventListener('keydown', event => {
  const keyName = event.key;
  if (keyName === 'ArrowLeft') {
    setSpeedIfAllowed(snake.speed, {
      x: -1,
      y: 0
    });
  }

  if (keyName === 'ArrowRight') {
    setSpeedIfAllowed(snake.speed, {
      x: 1,
      y: 0
    });
  }

  if (keyName === 'ArrowUp') {
    setSpeedIfAllowed(snake.speed, {
      x: 0,
      y: -1
    });
  }

  if (keyName === 'ArrowDown') {
    setSpeedIfAllowed(snake.speed, {
      x: 0,
      y: 1
    });
  }
});

function setSpeedIfAllowed(currentSpeed, newSpeed) {
  // Jos uusi nopeus olisi vastakkainen suunta, ei se ole sallittu
  if (currentSpeed.x !== 0 && currentSpeed.x !== -newSpeed.x) {
    snake.speed = newSpeed;
  } else if (currentSpeed.y !== 0 && currentSpeed.y !== -newSpeed.y) {
    snake.speed = newSpeed;
  }
}
