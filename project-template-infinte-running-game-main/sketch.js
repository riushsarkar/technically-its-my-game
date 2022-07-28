var space , rocket , meteor , gameover , crash , play ;
var spaceimg , rocketimg , meteorimg , gameoverimg , crashimg , playimg , starimg;
var stars = 0 ;
var meteorg , starg ;

var PLAY = 1 ;
var END = 0 ;
var gameState = 1 ;
function preload(){

spaceimg = loadImage("space.jpg");
rocketimg = loadImage("rocket.png");
meteorimg = loadImage("meteor.png");
gameoverimg = loadImage("gameover.png");
crashimg = loadImage("crash.png");
playimg = loadImage("play button.png");
starimg = loadImage("star.png");
}

function setup() {

createCanvas(windowWidth,windowHeight);

space = createSprite(width/2,200);
space.addImage(spaceimg);
space.velocityY = 5;
space.scale=4;

  rocket = createSprite(width/2,height-20,20,20);
  rocket.addImage(rocketimg);
  rocket.scale=1;
  rocket.visible = false;

  crash = createSprite(width-850,height-500);
  crash.addImage(crashimg);
  crash.scale=2
  crash.visible = false;

  play = createSprite(width-850,height-250);
  play.addImage(playimg);
  play.visible = false;

starg=new Group();
meteorg=new Group();

}

function draw(){

    if(gameState===PLAY){

        background(0);

        rocket.visible = true;
        rocket.x = World.mouseX;
        
        edges= createEdgeSprites();
        rocket.collide(edges);
        
        //code to reset the background
      
        if(space.y > 800 ){
          space.y = height/2 ;
        }
      
          createstar();
          createmeteor();
      
          if (starg.isTouching(rocket)) {
            starg.destroyEach();
            stars = stars + 1 ;
          }
          if(meteorg.isTouching(rocket)) {
            gameState=END;
        }
      }
if(gameState===END) {
  
  space.velocityY = 0
  
  crash.visible = true;
  play.visible = true;
  rocket.visible = false;
              
  starg.destroyEach();
  meteorg.destroyEach();
              
  starg.setVelocityYEach(0);
  meteorg.setVelocityYEach(0);}  
  
  if(keyDown("SPACE")){      
    reset();
    touches = []
  
  }
 
  drawSprites();
  textSize(20);
  fill(255);
  text("stars: "+ stars,width-150,30);

}


function createstar(){

    if (World.frameCount % 100 == 0) {
        // Modify the positions of cash 
       var star = createSprite(Math.round(random(width,height),height+200, 50, 50));
       star.addImage(starimg);
       star.scale=0.25;
       star.velocityY = 10;
       star.lifetime = 600;
       starg.add(star);
       } 
}

function createmeteor(){
    if (World.frameCount % 50 == 0) {
      //   Modify the positions of sword to make them spawn throughout the available screen size.
  
      meteor = createSprite(Math.round(random(width-0,width-2000),height+200, 50, 50));
      meteor.addImage(meteorimg);
      meteor.scale=0.3;
      meteor.velocityY = 10;
      meteor.lifetime = 200;
      meteorg.add(meteor);
      }
  }

  function reset(){
    gameState = PLAY;

    meteorg.destroyEach();
    starg.destroyEach();

    crash.visible = false;
    play.visible = false;
    rocket.visible = true;
    space.velocityY=4;
    
    stars = 0;
    
  }