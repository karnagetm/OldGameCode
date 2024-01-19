let MENU = 0;
let img2;
let space_x;
let space_y;
let alien_x = [];
let alien_y = [];
let alienSpeed = [];
let numAliens = 5;
let gameover = false;

// Lightning effect variables
let stepSize = 20; // Small step size for detailed lightning
let lastStrikeTime = 0;
let lightningDelay = 500; // Delay in milliseconds

function preload() {
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
    // Clear the background for the menu
    background(img2); // Use the background image
    drawMenu();
  } else if (MENU == 1) {
    if (!gameover) {
      // Clear the background for the game
      background(0); // You might choose a different background for the game
      startGame(); // Call your game's start function
    } else {
      showGameOver(); // Show game over screen
    }
  } else if (MENU == 2) {
    // Instructions
    background(55, 7, 227); // Clear the background for instructions
    showInstructions();
  } else if (MENU == 3) {
    // Exit
    background(0); // Clear the background if needed
    exitGame();
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

// ... (Continued from Part 1)

function startGame() {
  // Omitting the background to keep the lightning visible
  // Update game elements only if not gameover
  if (!gameover) {
    updateSpaceship();
    updateAliens();
    handleLightning();
  }
}

function updateSpaceship() {
  // Draw the spaceship with fire effect
  drawSpaceship(space_x, space_y);

  // Control the spaceship
  if (keyIsDown(UP_ARROW) && space_y > 10) {
    space_y -= 3;
  }
  if (keyIsDown(DOWN_ARROW) && space_y < height - 10) {
    space_y += 3;
  }
}

function drawSpaceship(x, y) {
  // Body of the spaceship
  fill(100);
  ellipse(x, y, 40, 20); // Main body
  
  // Cockpit
  fill(150, 0, 0);
  ellipse(x, y, 20, 10); // Cockpit
  
  // Fire effect
  drawFire(x - 20, y); // Position the fire at the back of the spaceship
}

function drawFire(x, y) {
  // Draw multiple ellipses with varying sizes and colors for a more dynamic fire effect
  for (let i = 0; i < 5; i++) {
    let fireSize = random(5, 15);
    fill(random(200, 255), random(100, 150), 0, random(100, 200)); // Randomized fire color and transparency
    ellipse(x - i * 2, y + random(-5, 5), fireSize, fireSize * 2); // Staggered fire ellipses
  }
}


function updateAliens() {
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
    if (collideRectRect(space_x, space_y, 40, 20, alien_x[i] - 15, alien_y[i] - 15, 30, 30)) {
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

function handleLightning() {
  // Trigger a lightning strike only after a certain delay
  if (millis() - lastStrikeTime > lightningDelay) {
    stroke(255); // White lightning
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
    resetGame();
  }
  // Prevent default
  return false;
}

function resetGame() {
  // Reset game variables to initial state
  space_x = 100;
  space_y = 200;
  for (let i = 0; i < numAliens; i++) {
    alien_x[i] = random(width, width * 2);
    alien_y[i] = random(height);
    alienSpeed[i] = random(2, 5);
  }
  lastStrikeTime = 0;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    // Example key interaction, you can customize this
    // Reset lightning seed for visual effect
    lastStrikeTime = millis();
  }
}
