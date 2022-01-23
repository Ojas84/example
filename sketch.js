// global variables
var brickImage, brickGroup, diamondGroup, diamondImage;

var bg, backgroundImg;
var diamondScore = 0
var gameState="play";


// preload function is used to load all the game assets
function preload() {

  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  brickImage = loadImage("images/stone.png");
  diamondImage = loadAnimation("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
  restartImage = loadImage("images/restart.png");

}

function setup() {
  createCanvas(1000, 600);

  //create background sprite
  bg = createSprite(580, 300);
  bg.addImage(backgroundImg)
  bg.scale = 2
  bg.velocityY = -5

  //create iron sprite
  iron = createSprite(200, 585, 20, 20)
  iron.addImage(ironImage)
  iron.scale = 0.3
  ironMan.setCollider("rectangle",100,0,200,400)

  //create ground sprite
  ground = createSprite(200, 585, 900, 10)
  ground.visible = false
  diamondGroup = new Group()

  // create groups
  brickGroup = new Group()
  spikeGroup = new Group()

  restart = createSprite(500,300);
  restart.addImage(restartImage);
  restart.visible= false;

}

function draw() {

  if(gameState==="play") {

    ironMan.setCollider("rectangle",0,0,200,500);

  
  // scroll background
  if (bg.y < 225) {
    bg.y = bg.width / 4;
  }
  // key to move left
  if (keyDown("left"))
    iron.x -= 4

  // key to move right
  if (keyDown("right"))
    iron.x += 4

  // jump with space
  if (keyDown("space"))


    iron.velocityY = -12

  // gravity
  iron.velocityY += 0.5
  iron.collide(ground)

  // function to generate bricks
  generateBricks();

  //make iron step(collide)on brick
  for (var i = 0; i < brickGroup.length; i++) {
    var temp = (brickGroup).get(i);
    if (temp.isTouching(iron)) {
      iron.collide(temp);
    }
  }

  // function to generate diamonds
  generatediamond();

  //make iron catch the diamond
  for (var i = 0; i < (diamondGroup).length; i++) {
    var temp = (diamondGroup).get(i);
    if (temp.isTouching(iron)) {

      // increase score when diamond is caught
      diamondScore++;

      // destroy diamond once it is caught
      temp.destroy();
      temp = null

    }
    



  }
  // call the function to generate spike
  generatespike();
  for (var i = 0; i < spikeGroup.length; i++) {
    var temp = (spikeGroup).get(i);
    if (temp.isTouching(iron)) {
      temp.destroy()

      //decrease diamond score by 5
      diamondScore = diamondScore - 5
    }
  }
      if(diamondScore<=-10 || iron.y>610){
        gameState ="END";
       }
    
  
}

// END OF IF (GAMESTATE === PLAY)
else if (gameState === "END"){
  bg,velocityX = 0;
  iron.velocityY = 0;
  iron.velocityX = 0;
  spikeGroup.setVelocityXEach(0);
  brickGroup.setVelocityXEach(0);
  spikeGroup.setLifetimeEach(-1);
  diamondGroup.setLifetimeEach(-1);

  restart.visible=true;
  if(mousePressedOver(restart)){
   restartGame();
  
  iron.scale=0.4;
  iron.setCollider("rectangle",0,0,300,10);
  iron.y=570;
}

  drawSprites();
  // to increase text size
  textSize(20);
  fill("white")
  


  // to display diamond score
  text("diamonds collected: " + diamondScore, 500, 50);



  }
function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200, 120, 40, 10);
    brick.x = random(50, 450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityY = 5;

    brick.lifetime = 250;
    brickGroup.add(brick);
  }
}

function generatediamond() {
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);
    diamond.addAnimation("diamond", diamondImage);
    diamond.x = Math.round(random(80, 350));
    diamond.scale = 0.3;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}
function generatespike() {
  if (frameCount % 100 === 0) {
    //spikes sprite declared
    var spike = createSprite(1200, 100, 20, 40);
    spike.addImage(spikeImage)
    spike.scale = 0.4;
    spike.x = Math.round(random(50, 500));


    spike.velocityY = 3;

    spike.lifetime = 300;
    spikeGroup.add(spike);

  }


  }

  function restartGame(){
    gameState ="PLAY";
    platformGroup.destroyEach();
    diamondsGroup.destroyEach();
    spikesGroup.destroyEach();
    score=0;
    
    ironMan.y=50;
    restart.visible=false;
  }