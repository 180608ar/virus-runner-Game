var man,manrun,ground,bg,bgimg;

var v1,v2,v3,v4,vir;

var grovir,score=0,play=1,end=2,gs=play;

var jump,die,gameOver,restart,gm,re,manov;

var moon,moond,s1,s2,s3,s4,s5;

var s6,s7,s8,s9,s10,star;

function preload(){
  manrun=loadAnimation("man running 11.png","man running 22.png","man running 33.png","man running 44.png","man running 55.png","man running 66.png","man running 77.png");
  
  bgimg=loadImage("bg22.png");
  
  v1 = loadImage("virus1111.png");
  v2 = loadImage("virus22.png");
  v3 = loadImage("virus33.png");
  v4 = loadImage("virus4444.png");
  
  re = loadImage("restart.png");
  gm = loadImage("gameover1.png");

  jump=loadSound("jump.mp3");
  
  die=loadSound("die.mp3");
  
  manov = loadAnimation("man running 11.png");
  
  moond = loadImage("moon1.png");
  
  star = loadImage("star11.PNG");
  
}

function setup(){
  createCanvas(1000,500);
 
  moon = createSprite(100,60,10,10);
  moon.addImage("moondi",moond);
  moon.scale=0.5;
  
  s1 = createSprite(130,130,2,2);
  s2 = createSprite(190,50,2,2);
  s3 = createSprite(250,90,2,2);
  s4 = createSprite(310,150,2,2);
  s5 = createSprite(370,130,2,2);
  s6 = createSprite(420,30,2,2);
  s7 = createSprite(480,90,2,2);
  s8 = createSprite(540,30,2,2);
  s9 = createSprite(600,150,2,2);
  s10 = createSprite(660,100,2,2);
  
  s1.addImage(star);
  s2.addImage(star);
  s3.addImage(star);
  s4.addImage(star);
  s5.addImage(star);
  s6.addImage(star);
  s7.addImage(star);
  s8.addImage(star);
  s9.addImage(star);
  s10.addImage(star);


  bg = createSprite(500,250,1000,500);
  bg.addImage("bgig",bgimg);
  
  man = createSprite(50,450,20,20);
  man.addAnimation("mr",manrun);
  man.addAnimation("mrover",manov);
  man.scale=1.2;
  
  ground = createSprite(500,450,1000,10);
  ground.visible=false;
  
  gameOver = createSprite(500,250,10,10);
  gameOver.addImage(gm);
  gameOver.scale = 0.9;
  
  restart = createSprite(500,250,20,20);
  restart.addImage(re);
  restart.scale = 0.5;
  
 
  
  grovir = new Group();
  
}



function draw() {
  background("black");
  stroke("white");
  textSize(20);
  text("Score:"+score,750,30);
  strokeWeight(15);
 
  man.collide(ground);
  
  if(gs===play){
     score=score+Math.round(getFrameRate()/60.5);
     man.changeAnimation("mr",manrun);
    bg.velocityX = -9;
       
  
  if(bg.x <300){
     bg.x = bg.width/2;
     }

 if (keyDown("space")&& man.y>350) {
     man.velocityY = -18;
   jump.play();
 }
    
    man.velocityY = man.velocityY+0.6;
    spawnVirus();
    gameOver.visible = false;
    restart.visible = false;
    
    if(man.isTouching(grovir)){
      gs=end;
      die.play();
    }
    
  }
  
  if(gs===end){
    man.changeAnimation("mrover",manov);
    man.velocityX = 0;
    man.velocityY = 0;
    
    bg.velocityX = 0;
    bg.velocityY = 0;
    
    grovir.setVelocityYEach(0);
    gameOver.visible = true;
    restart.visible = true;
    grovir.setLifetimeEach(0);
    
     if(mousePressedOver(restart)){
      reset();
    }
    
  }

  drawSprites();
}


function reset(){
  gs = play;
  
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  grovir.destroyEach();
}


function spawnVirus(){
  if(frameCount%90===0){
    
    vir = createSprite(1000,400,20,20);
    vir.y=random(250,400);
    vir.scale = 0.4;
    vir.velocityX = -9;
    vir.lifetime = 400;
    
    var a = Math.round(random(1,4));
    grovir.add(vir);
    
    switch(a){
        case 1: vir.addImage(v1);
        break;
        case 2: vir.addImage(v2);
        break;
        case 3: vir.addImage(v3);
        break;
        case 4: vir.addImage(v4);
        break;
      default: break;
        
    }
  
  }
  
}