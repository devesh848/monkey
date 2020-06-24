//Global Variables
var banana, bananaImage; 
var monkey, monkeyImage; 
var ground, groundImage; 
var backgroundImage,bg; 
var obstacle, obatacleImage;
var gameOver, gameOverImage; 
var restart, restartImage;
var foodG;  
var obsG;
var score = 0;

function preload(){
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  bananaImage = loadImage("Banana.png");  
  obstacleImage = loadImage("stone.png"); 
  groundImage = loadImage("ground.jpg"); 
  backgroundImage = loadImage("jungle.jpg"); 
  gameOverImage = loadImage("gameOver.png"); 
  restartImage = loadImage("restart.png");
  
}


function setup() {
  createCanvas(1200,800); 
  bg = createSprite(600,400); 
  bg.addImage(backgroundImage); 
  bg.velocityX = -7; 
  bg.scale=2; 
  
  ground = createSprite(400,800); 
  ground.addImage(groundImage); 
  ground.scale = 0.3;  
  ground.visible = false;
  ground.setCollider("rectangle",0,0,ground.width,500); 
  monkey = createSprite(200,700);
  monkey.addAnimation("monkey",monkeyImage); 
  monkey.scale = 0.2;   
  foodG = createGroup();  
  obsG = createGroup();
  
}


function draw(){
 background(255);   
  
  if(bg.x<0){ 
    bg.x = bg.width/2;
  } 
  if(keyDown("space")){  
    monkey.velocityY = -10;
  } 
  monkey.velocityY = monkey.velocityY + 0.5; 
  monkey.collide(ground); 
  if(foodG.isTouching(monkey)){ 
    foodG.destroyEach(); 
    score = score +2;
  }  

  switch(score){  
    case 10:monkey.scale = 0.22; 
      break; 
      case 20: monkey.scale =0.24; 
      break; 
      case 30: monkey.scale = 0.26; 
      break; 
      case 40: monkey.scale =0.28;
      break; 
      default: break;
      
  } 
  if(obsG.isTouching(monkey)){  
    monkey.scale = 0.2; 
    score = score - 10; 
    if(score<0){  
      score = 0;
    }
    
  }
  food(); 
  rock();
  drawSprites();   
  stroke("white"); 
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
} 

function food(){  
  if(frameCount % 100 === 0){
  banana = createSprite(800,random(400,600)); 
  banana.addImage(bananaImage); 
  banana.scale = 0.1; 
  banana.velocityX = -7;  
  foodG.add(banana);
  }
} 

function rock(){  
  if(frameCount % 120 === 0){  
    obstacle = createSprite(800,690); 
    obstacle.addImage(obstacleImage); 
    obstacle.scale =0.4;
    obstacle.velocityX = -7;  
    obsG.add(obstacle);
  }
}