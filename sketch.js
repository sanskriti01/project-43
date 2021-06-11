var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var obstacleImage;
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
  player.scale = 0.3;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

 // obstacle = createSprite(300,400,20,20);
  //obstacle.addImage(obstacleImage);
  //obstacle.scale = 0.1;

  obstacleGroup = new Group();
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
    player.scale += + 0.1;
  }

  if(obstacleGroup.isTouching(player)){
    gameState = END;
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over", 300,220);


}
fill("black");
text("Score"+ score,300,220);

  drawSprites();
  spawnFood();
  spawnObstacles();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,350,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifeTime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount & 80 === 0){
    var obstacle = createSprite(650,300,40,10);
    obstacle.y = random(100,150);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;

    //var rand = Math.round(random(1));
   // switch(rand){
      //case 1: obstacle.addImage(obstacleImage);
      //break;
     // default: break;
   // }
    obstacle.scale = 0.25;
    obstacle.lifeTime = 500;

    obstacleGroup.add(obstacle);


  }
}
