var score =0;
var gun,bluebubble,redbubble, bullet, backBoard,backBord;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg,backBordImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =5;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
 blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
  backBordImg = loadImage("image.jpg")

}
function setup() {
  createCanvas(800, 600);
  backBoard= createSprite(400,300, width/5, 300,height);
  backBoard.addImage(backBordImg)
  backBoard.scale = 2;
  backBoard.depth = backBoard.depth - 5;

  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=1
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();
  redBubbleGroup = createGroup();   

  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#000000");
  
  heading.html("Vida: "+life)
  heading.style('color:white'); 
  heading.position(150,20)

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
  bluebubble.depth = bluebubble.depth + 1;
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
  redbubble.depth = redbubble.depth + 1;
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg)
   blast.scale=0.3
 blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
