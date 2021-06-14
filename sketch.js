var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var obstacleImage, obstaclesGroup, gameOver, gameOverImg;
var score;
var END =0;
var PLAY =1;
var gameState = PLAY;
//var addImage;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(900,500);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(450,300,20,50);
  gameOver.scale =0.5;
  //gameOver.visible = false;

 // obstacle = createSprite(300,400,20,20);
  //obstacle.addImage(obstacleImage);
  //obstacle.scale = 0.1;
  score = 0;
  score.scale = 1

  obstaclesGroup = new Group();
  foodGroup = new Group();


  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score + 2;
    player.scale += +0.1;
  }

  if(obstaclesGroup.isTouching(player)){
    gameState = END;
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
   gameOver.addImage(gameOverImg);
    


}


  drawSprites();
  spawnFood();
  spawnObstacles();

  fill("white");
text("Score:"+ score,700,50);
}

function spawnFood(){
  if(frameCount % 60 === 0){
    var banana = createSprite(600,350,40,10);
    banana.y = random(120,250);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 250 === 0){
    var obstacles = createSprite(650,450,40,10);
    obstacles.y = random(100,450);
    obstacles.addImage(obstacleImage);
    obstacles.velocityX = -6;

    //var rand = Math.round(random(1));
   // switch(rand){
      //case 1: obstacle.addImage(obstacleImage);
      //break;
     // default: break;
   // }
    obstacles.scale = 0.25;
    obstacles.lifetime = 500;

    obstaclesGroup.add(obstacles);


  }
}
