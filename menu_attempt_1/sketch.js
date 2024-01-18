let MENU = 0
let img2;

function preload() {
  img2 = loadImage('space image.jpg')
  
}

function setup(){
  createCanvas(700,400);
  
}

function draw() {
  print(mouseX, mouseY)
  background(0);
  fill(55, 7, 227);
  rect(165, 50, 350, 75,50);
  fill(55, 7, 227);
  rect(250, 200, 200, 75,50);
  fill(55, 7, 227);
  rect(250, 300, 200, 75,50);
  textSize(50)
  fill(255);
   text('START GAME', 180, 106);
  text('EXIT', 300, 355);
  textSize(26);
  text('INSTRUCTIONS', 255, 248);
  image(img2,5,-20,150)
  image(img2,535,-20,190)
  
  if (MENU == 1){
    background(55,7,227)
    fill(0)
    textSize(50)
    text('right click to return to MENU',525, 30 ) //RETURN TO GAME
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } // START GAME 
  if (MENU == 2){
    background(55,7,227)
    textSize(40)
    text('right click to return to MENU',525, 30) //RETURN TO GAME
    textSize(40)
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  } //INSTRUCTIONS
  if (MENU == 3){
    background(55,7,227)
    textSize(30)
    text('move arrows < and > to move character', 25, height / 2)
  } // EXIT
}
    
function mouseclicked(){
  if (MENU == 0) {
    if (mouseX < 200 && mouseX > 50){
      if (mouseY < 125 && mouseY > 50){
        MENU = 1
      }
      if (mouseY < 275 && mouseY > 200){
        MENU = 1
      }
      if (mouseY < 425 && mouseY > 350){
        MENU = 3
      }   
    }   
  }
 } //last



  
  
  

    
    
  
  
  
  
  
  
  
  
  
  
  



