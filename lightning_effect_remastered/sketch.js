var stepSize = 20; // Small step size for detailed lightning
var lastStrikeTime = 0;
var lightningDelay = 500; // Delay in milliseconds

function setup() {
  createCanvas(700, 400);
}

function draw() {
  background(0);

  // Trigger a lightning strike only after a certain delay
  if (millis() - lastStrikeTime > lightningDelay) {
    stroke(255); // White lightning
    lightningBolt(random(width), 0, random(-PI / 6, PI / 6), 20, stepSize);
    lastStrikeTime = millis();
  }
}

function lightningBolt(x, y, angle, numSteps, stepSize) {
  var v = createVector(0, stepSize);
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

function keyPressed() {
  seed = millis();
  randomSeed(seed);
}

