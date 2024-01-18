let MENU = 0;
let img2;
let space_x;
let space_y;
let alien_x = [];
let alien_y = [];
let alienSpeed = [];
let numAliens = 5;
let gameover = false;

function preload() {
  // Replace this URL with the actual URL of your hosted image
  img2 = loadImage('https://assets.editor.p5js.org/5fa84292dd8f400024b9e7d8/7316d9ef-a2d2-4587-a9d1-dc41757f9127.jpg');
}

function setup() {
  createCanvas(700, 400);
  space_x = 100;
  space_y = 200;

  // Initialize the position and speed of each asteroid
  for (let i = 0; i < numAliens; i++) {
    alien_x[i] = random(width, width * 2); // Start off-screen
    alien_y[i] = random(height);
    alienSpeed[i] = random(2, 5);
  }
}

function draw() {
  if (MENU == 0) {
    // Main Menu
    background(img2); // Use the background image
    drawMenu();
  } else if (MENU == 1 && !gameover) {
    // Start Game
    startGame(); // Call your game's start function
  } else if (MENU == 2) {
    // Instructions
    showInstructions();
  } else if (MENU == 3) {
    // Exit
    exitGame();
  }
  
  if (gameover) {
    showGameOver();
  }
}

function drawMenu() {
  fill(55, 7, 227);
  rect(165, 50, 350, 75, 50); // Start Game button
  rect(250, 200, 200, 75, 50); // Instructions button
  rect(250, 300, 200, 75, 50); // Exit button

  textSize(50);
  fill(255);
  text('START GAME', 180, 106);
  text('EXIT', 300, 355);

  textSize(26);
  text('INSTRUCTIONS', 255, 248);
}

function showInstructions() {
  background(55, 7, 227);
  textSize(40);
  fill(255);
  text('Instructions go here', 100, 100);
  // Add more instruction text as needed
}

function exitGame() {
  // Implement how you want to handle the exit action
  // For now, it just goes back to the main menu
  MENU = 0;
}

function showGameOver() {
  fill(255);
  textSize(32);
  text("Game Over", width / 2 - 100, height / 2);
}

function mouseClicked() {
  if (MENU == 0) {
    // Check if Start Game button is clicked
    if (mouseX > 165 && mouseX < 515 && mouseY > 50 && mouseY < 125) {
      MENU = 1;
    }
    // Check if Instructions button is clicked
    else if (mouseX > 250 && mouseX < 450 && mouseY > 200 && mouseY < 275) {
      MENU = 2;
    }
    // Check if Exit button is clicked
    else if (mouseX > 250 && mouseX < 450 && mouseY > 300 && mouseY < 375) {
      MENU = 3;
    }
  } else if (gameover) {
    // Reset the game when clicking after game over
    gameover = false;
    MENU = 0;
  }
  // Prevent default
  return false;
}

function startGame() {
  background(8);

  // Draw the spaceship
  fill(100);
  rect(space_x, space_y, 80, 35);
  rect(space_x - 20, space_y + 30, 30, 20);
  rect(space_x - 20, space_y - 10, 30, 20);

  // Control the spaceship
  if (keyIsDown(UP_ARROW) && space_y > 0) {
    space_y -= 3;
  }
  if (keyIsDown(DOWN_ARROW) && space_y < height - 35) {
    space_y += 3;
  }

  // Draw and move asteroids
  for (let i = 0; i < numAliens; i++) {
    drawAlien(alien_x[i], alien_y[i]);
    alien_x[i] -= alienSpeed[i];

    // Reset asteroid position if it moves off screen
    if (alien_x[i] < -30) {
      alien_x[i] = random(width, width * 2);
      alien_y[i] = random(height);
      alienSpeed[i] = random(2, 5); // Respawn with a new speed
    }

    // Check for collision
    if (collideRectRect(space_x, space_y, 80, 35, alien_x[i] - 15, alien_y[i] - 15, 30, 30)) {
      gameover = true;
    }
  }
}

function drawAlien(x, y) {
  fill(82, 7, 7);
  rect(x - 15, y - 15, 30, 30);
  rect(x - 15, y + 11, 19, 14);
  rect(x - 19, y - 16, 15, 17);
  rect(x + 10, y - 11, 17, 16);
}

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
