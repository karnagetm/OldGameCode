let MENU = 0;
let img2;
let space_x;
let space_y;
let alien_x = [];
let alien_y = [];
let alienSpeed = [];
let numAliens = 5;
let gameover = false;

let score = 0;
let highScore = 0;
let lastUpdateTime = 0;

// Lightning effect variables
let stepSize = 20; // Small step size for detailed lightning
let lastStrikeTime = 0;
let lightningDelay = 500; // Delay in milliseconds

let alienSizes = [];
let alienColors = [];

function preload() {
  img2 = loadImage('https://assets.editor.p5js.org/5fa84292dd8f400024b9e7d8/7316d9ef-a2d2-4587-a9d1-dc41757f9127.jpg');
}

function setup() {
  createCanvas(700, 400);
  space_x = 100;
  space_y = 200;
  lastUpdateTime = millis(); // Initialize the last update time

  // Initialize the properties of each alien
  for (let i = 0; i < numAliens; i++) {
    alien_x[i] = random(width, width * 2); // Start off-screen
    alien_y[i] = random(height);
    alienSpeed[i] = random(2, 5);
    alienSizes[i] = random(20, 50); // Random size
    alienColors[i] = color(random(255), random(255), random(255)); // Random color
  }
}

function draw() {
  if (MENU == 0) {
    background(img2);
    drawMenu();
  } else if (MENU == 1) {
    if (!gameover) {
      background(0);
      startGame();
    } else {
      showGameOver();
    }
  } else if (MENU == 2) {
    background(55, 7, 227);
    showInstructions();
  } else if (MENU == 3) {
    background(0);
    exitGame();
  }
}

function drawMenu() {
  fill(55, 7, 227);
  rect(165, 50, 350, 75, 50);
  rect(250, 200, 200, 75, 50);
  rect(250, 300, 200, 75, 50);

  textSize(50);
  fill(255);
  text('START GAME', 180, 106);
  text('EXIT', 300, 355);

  textSize(26);
  text('INSTRUCTIONS', 255, 248);
}

function showInstructions() {
  textSize(24);
  fill(255);
  textAlign(CENTER);
  text("Use the UP ARROW key to move the spaceship up", width / 2, height / 2 - 20);
  text("Use the DOWN ARROW key to move the spaceship down", width / 2, height / 2 + 10);
  text("Lose the game to return to the main menu", width / 2, height / 2 + 50);
  textAlign(LEFT);
}

function exitGame() {
  MENU = 0;
}

function showGameOver() {
  fill(255);
  textSize(32);
  text("Game Over", width / 2 - 100, height / 2);
  lastUpdateTime = millis();
}

function startGame() {
  updateSpaceship();
  updateAliens();
  handleLightning();
  updateScore();
  displayScore();
}

function updateSpaceship() {
  drawSpaceship(space_x, space_y);

  if (keyIsDown(UP_ARROW) && space_y > 10) {
    space_y -= 3;
  }
  if (keyIsDown(DOWN_ARROW) && space_y < height - 10) {
    space_y += 3;
  }
}

function drawSpaceship(x, y) {
  fill(100);
  ellipse(x, y, 40, 20);
  
  fill(150, 0, 0);
  ellipse(x, y, 20, 10);
  
  drawFire(x - 20, y);
}

function drawFire(x, y) {
  for (let i = 0; i < 5; i++) {
    let fireSize = random(5, 15);
    fill(random(200, 255), random(100, 150), 0, random(100, 200));
    ellipse(x - i * 2, y + random(-5, 5), fireSize, fireSize * 2);
  }
}

function updateScore() {
  let currentTime = millis();
  score = currentTime - lastUpdateTime;
  if (score > highScore) {
    highScore = score;
  }
}

function displayScore() {
  fill(255);
  textSize(18);
  text("Score: " + floor(score / 1000), 10, 20);
  text("High Score: " + floor(highScore / 1000), 10, 40);
}

function updateAliens() {
  for (let i = 0; i < numAliens; i++) {
    drawAlien(i);
    alien_x[i] -= alienSpeed[i];

    if (alien_x[i] < -30) {
      alien_x[i] = random(width, width * 2);
      alien_y[i] = random(height);
      alienSpeed[i] = random(2, 5);
      alienSizes[i] = random(20, 50);
      alienColors[i] = color(random(255), random(255), random(255));
    }

    if (collideRectCircle(space_x, space_y, 40, 20, alien_x[i], alien_y[i], alienSizes[i])) {
      gameover = true;
    }
  }
}

function drawAlien(index) {
  let x = alien_x[index];
  let y = alien_y[index];
  let alienSize = alienSizes[index];
  let alienColor = alienColors[index];

  fill(alienColor);
  ellipse(x, y, alienSize, alienSize);
}

function collideRectCircle(rx, ry, rw, rh, cx, cy, diameter) {
  let testX = cx;
  let testY = cy;

  if (cx < rx) testX = rx;
  else if (cx > rx + rw) testX = rx + rw;
  if (cy < ry) testY = ry;
  else if (cy > ry + rh) testY = ry + rh;

  let distance = dist(cx, cy, testX, testY);

  return distance <= diameter / 2;
}

function handleLightning() {
  if (millis() - lastStrikeTime > lightningDelay) {
    stroke(255);
    lightningBolt(random(width), 0, random(-PI / 6, PI / 6), 20, stepSize);
    lastStrikeTime = millis();
  }
}

function lightningBolt(x, y, angle, numSteps, stepSize) {
  let v = createVector(0, stepSize);
  v.rotate(angle + random(-PI / 6, PI / 6));
  strokeWeight(stepSize / 4);
  line(x, y, x + v.x, y + v.y);

  if (y < height && numSteps > 0) {
    lightningBolt(x + v.x, y + v.y, angle, numSteps - 1, stepSize);

    if (random() < 0.15) {
      lightningBolt(
        x + v.x,
        y + v.y,
        angle + random(-PI / 4, PI / 4),
        numSteps * 0.75,
        stepSize * 0.8
      );
    }
  }
}

function mouseClicked() {
  if (MENU == 0) {
    if (mouseX > 165 && mouseX < 515 && mouseY > 50 && mouseY < 125) {
      MENU = 1;
    }
    else if (mouseX > 250 && mouseX < 450 && mouseY > 200 && mouseY < 275) {
      MENU = 2;
    }
    else if (mouseX > 250 && mouseX < 450 && mouseY > 300 && mouseY < 375) {
      MENU = 3;
    }
  } else if (gameover) {
    gameover = false;
    MENU = 0;
    resetGame();
  }
  return false;
}

function resetGame() {
  space_x = 100;
  space_y = 200;
  score = 0;
  lastUpdateTime = millis();
  for (let i = 0; i < numAliens; i++) {
    alien_x[i] = random(width, width * 2);
    alien_y[i] = random(height);
    alienSpeed[i] = random(2, 5);
    alienSizes[i] = random(20, 50);
    alienColors[i] = color(random(255), random(255), random(255));
  }
  lastStrikeTime = 0;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    lastStrikeTime = millis();
  }
}
