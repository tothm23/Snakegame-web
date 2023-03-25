const playBoard = document.querySelector(".playBoard");

let foodX, foodY;
let snakeBody = [];
let snakeX = 25,
  snakeY = 25;

let velocityX = 0,
  velocityY = 0;

let gamemOver = false;
let setIntervalGame;

const changeFoodPosition = () => {
  // Passes the random values (1-50) as food position
  foodX = Math.floor(Math.random() * 50) + 1;
  foodY = Math.floor(Math.random() * 50) + 1;
};

const handleGamemOver = () => {
  // Stops the game frame
  clearInterval(setIntervalGame);

  // Informs about the gam is over
  alert("GAME OVER");

  // Reloades the page
  window.location.reload();
};

const initGame = () => {
  if (gamemOver) {
    return handleGamemOver();
  }

  // Updates the snakes head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  // Checks if hte snake hits the food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();

    // Pushes the food position to the snakeBody
    snakeBody.push([foodX, foodY]);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    // Shifts the forward values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  // The 1st element of the snakeBody must be the current snake position
  snakeBody[0] = [snakeX, snakeY];

  // sets values for grid items start and end lines
  // creates a food div and inserts it in the playBoard element
  let htmlElement = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  for (let i = 0; i < snakeBody.length; i++) {
    // Adds a div for each part of the snakeBody
    htmlElement += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // Checks if the snake body hits the snake head
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gamemOver = true;
    }
  }

  // Inserts the food div to the playBoard
  playBoard.innerHTML = htmlElement;
};

changeFoodPosition();

document.body.addEventListener("keyup", (event) => {
  // Changes velocity value based on key press
  if (event.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }

  initGame();
});

// the head will move after every 100 miliseconds
setIntervalGame = setInterval(initGame, 100);
