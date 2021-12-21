var carrot , carrotImage;
var rabbit , rabbitImage;
var redbird , redbirdImage;
var bird , birdImage;
var ob1 , ob2 ,ob3 , ob4 , ob5 , ob6 , ob7;
var bg , bgImage;
var PLAY = 1;
var END = 0;
var gameState=PLAY;
var score = 0;
var carrot =0;
function preload(){
  carrotImage = loadImage("assets/goldencarrot.png");
  rabbitImage = loadAnimation("assets/r1.png" , "assets/r2.png" , "assets/r4.png"  );
  redbirdImage = loadAnimation("assets/rb1.png" , "assets/rb2.png" , "assets/rb3.png");
  birdImage = loadAnimation("assets/b1.png" , "assets/b2.png" , "assets/b3.png"  , "assets/b4.png");
//  rabbit_collided= loadAnimation("assets/")
  ob1 = loadImage("assets/ob1.png");
  ob2 = loadImage("assets/ob2.png");
  ob3 = loadImage("assets/ob3.png");
  ob4 = loadImage("assets/ob4.png");
  ob5 = loadImage("assets/ob5.png");
  ob6 = loadImage("assets/ob6.png");
  ob7 = loadImage("assets/ob7.png");
  bgImage = loadImage("assets/BG1.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight-150);
  /*carrot = createSprite(400, 200, 50, 50);
  carrot.addImage(carrotImage);
  carrot.scale= 0.15;*/
  rabbit = createSprite(300 , height-200);
  rabbit.addAnimation("running" , rabbitImage);
  rabbit.scale = 1.1
//  rabbit.addAnimation("collided",rabbit_collided);
  rabbit.scale=1.2;
  rabbit.debug = true
  rabbit.setCollider("rectangle",0,0,100,100)
 
  carrotsGroup = createGroup();
  birdsGroup = createGroup();
  obstaclesGroup = createGroup();

  restart = createSprite(width/2 , height/2,30,30);
  gameOver = createSprite(width/2 , height/2,200,20);
  gameOver.visible = false;
  restart.visible = false;

  ground = createSprite(width/2 , height-100,width,10)
  ground.addImage(bgImage)
  ground.depth = -1
  invisibleGround = createSprite(width/2 , height-100,width,5)
  invisibleGround.visible=false
}

function draw() {
  //rabbit.debug = true;
  background(0);
  //text("Score: "+ score, 500,50);
  text("Carrots eaten: "+ carrot, 500,50);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    if(carrotsGroup.isTouching(rabbit)){
      carrot+=1
      carrotsGroup.destroyEach();
    }
    if(keyDown("space") && rabbit.y >= height-350) {
      rabbit.velocityY = -12;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    rabbit.collide(invisibleGround);
    spawncarrots();
    spawnObstacles();
    spawnBirds()
  
    if(obstaclesGroup.isTouching(rabbit)){
       // gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    rabbit.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    carrotsGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0);
    //change the rabbit animation
 //   rabbit.changeAnimation("collided",rabbit_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    carrotsGroup.setLifetimeEach(-1);
    birdsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawncarrots() {
  //write code here to spawn the carrots
  if (frameCount % 290 === 0) {
    var carrot = createSprite(width,height-400,40,10);
    carrot.y = Math.round(random(height-400,height-300));
    carrot.addImage(carrotImage);
    carrot.scale = 0.2;
    carrot.velocityX = -4;
    
     //assign lifetime to the variable
    carrot.lifetime = 700;
  
    
    //add each carrot to the group
    carrotsGroup.add(carrot);
  }
  
}
function spawnBirds() {
  //write code here to spawn the bird
  if (frameCount % 1000 === 0) {
    var bird = createSprite(width,height-400,40,10);
    bird.y = Math.round(random(120,250));
    var rand = Math.round(random(1,2));
    bird.addAnimation("b",birdImage);
    bird.addAnimation("r",redbirdImage);
    switch(rand) {
      case 1: bird.changeAnimation("b",birdImage);
              break;
      case 2: bird.changeAnimation("r",redbirdImage);
              break;
      default: break;        
    }
    bird.scale = 1.2;
    bird.velocityX = -3;

    //random velocity for birds so they can move in y

    
    //assign lifetime to the variable
    bird.lifetime = 700;
    
    //add each carrot to the group
    birdsGroup.add(bird);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width,height-100,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(ob1);
              break;
      case 2: obstacle.addImage(ob2);
              break;
      case 3: obstacle.addImage(ob3);
              break;
      case 4: obstacle.addImage(ob4);
              break;
      case 5: obstacle.addImage(ob5);
              break;
      case 6: obstacle.addImage(ob6);
              break;
      case 7: obstacle.addImage(ob7);
              break;        
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 400;
    obstacle.debug=true
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  carrotsGroup.destroyEach();
  birdsGroup.destroyEach();

  rabbit.changeAnimation("running",rabbit_running);
  
  //if(localStorage["HighestScore"]<score){
    //localStorage["HighestScore"] = score;
 // }
  //console.log(localStorage["HighestScore"]);
  
  carrot = 0;
  score = 0; 
}