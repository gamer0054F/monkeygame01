
var play = 0;
var end = 1;
var gameState = play;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var invisibleGround

var survivalTime = 0;

function preload(){
  
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkey_collided = loadAnimation("sprite_3.png");
}



function setup() {
  
  createCanvas(600,400);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
monkey = createSprite(70, 350, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collided",monkey_collided);
 monkey.scale = 0.1;
  
  invisibleGround = createSprite(1,390,200,20);
  invisibleGround.visible = false;
  
    
  ground = createSprite(400,380,900,10);
  console.log(ground.x);
}




function draw() {
  
  background(180);
  
  if (gameState === play){
    
    monkey.changeAnimation("monkey",monkey_running);
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    createBanana();
    createObstacles();
    
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
    
    
    }
    
    if(bananaGroup.isTouching(monkey)){
      score = score + 1;
      bananaGroup.setLifetimeEach(0);
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = end;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  }

  if(gameState === end){
    monkey.changeAnimation("collided",monkey_collided);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
  }
  
  stroke("white");
  textSize(25);
  fill("black");
  text("score: "+score, 400, 50);
  
  stroke("white");
  textSize(25);
  fill("black");
  text("survival Time: "+survivalTime, 100, 50);
  

  
  monkey.collide(invisibleGround);
  
  console.log(monkey.y);
  
  drawSprites();
}

function createBanana(){
  if(World.frameCount%80===0){
    banana = createSprite(500,Math.round(random(295,250)));
    banana.addImage("bananaImg",bananaImage);
    banana.scale = 0.1;
  banana.velocityX = -11;
  banana.liftime=100;
    bananaGroup.add(banana);
  }
}

function createObstacles(){
  if(World.frameCount%100===0){
    obstacle = createSprite(500,360,20,20);
    obstacle.addImage("obstacleImg",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -11;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
  }
}


