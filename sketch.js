var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  var survivalTime = 0;
 

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  

  
  
  obstacleGroup = createGroup()
  foodGroup = createGroup()
  
  score=0;
  
}


function draw() {
  background("lightblue")
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        monkey.velocityY = monkey.velocityY + 0.8;
     monkey.collide(ground);
    spawnObstacles();
    food();
        
  }
  
  

    
    drawSprites();

  stroke("black"); 
  textSize(15);
  fill("black");
  text("Score:"+score,300,50);
    
    if (monkey.isTouching(obstacleGroup)){
     ground.velocityX = 0;
           monkey.velocityY = 0;
      obstacleGroup.setVelocityEach(0)
            foodGroup.setVelocityEach(0)
      obstacleGroup.setLifetimeEach(-1)
      foodGroup.setLifetimeEach(-1)
      
    }
  
  
      stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+survivalTime,100,50);
}  


  



    

    
   
  







function food() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    foodGroup.add(banana);
   
    

  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
   

    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
   
 }
}





