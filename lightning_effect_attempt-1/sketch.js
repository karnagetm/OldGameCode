var seed = 0;
var stepSize = 100;

function setup() {
  createCanvas(700,400)
  
}

function draw(){
  background(0);
  stroke(255);
  randomSeed(seed)
  lightningBolt(width / 2,0,0,100,5)
}

function lightningBolt (x,y, angle,numSteps, stepSize ){
  var v = createVector(0,stepSize);
  v.rotate(angle + random(-1,1))
  strokeWeight(stepSize/2)
  line(x,y,x +v.x,y + v.y);
  
  
  //elipse(x,y,5)
  
  if (y < height && numSteps > 0){
   lightningBolt(x +v.x, y + v.y, angle, numSteps -1, stepSize);
    
    if (random(0,1) < 0.05){
      lightningBolt(
      x + v.x,
      y +v.y,
      angle + random(-1,1),
      numSteps / 2,
      stepSize * 0.75);
      
      
    }
  }
}

function keypressed(){
  seed = millis();
}