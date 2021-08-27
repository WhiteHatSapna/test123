var doremon, doremonImage1;
var bg, bgImage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var life = 3;
var score = 0;

function preload() {
  bgImage = loadImage("bg.jpg");
  coinImage = loadImage("coin.png")
  doremonImage1 = loadAnimation("doremon1.png", "doremon2.png", "doremon3.png", "doremon4.png");
  doremonImage2 = loadAnimation("doremon1.png");
  //
  obstacle1 = loadImage("tile000.png");
  obstacle2 = loadImage("tile001.png");
  obstacle3 = loadImage("tile002.png");
  obstacle4 = loadImage("tile003.png");
  obstacle5 = loadImage("tile004.png");
  obstacle6 = loadImage("tile005.png");

  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")

  obstacleGroup = new Group();
  coinGroup = new Group();
}



function setup() {
  createCanvas(1200, 800);
  bg = createSprite(200, 150, 1200, 600);
  bg.addImage(bgImage);
  bg.scale = 3;


  doremon = createSprite(100, 480, 20, 20);
  doremon.addAnimation("sprite", doremonImage1);
  doremon.addAnimation("spritelose", doremonImage2);
  doremon.scale = 0.6
  doremon.setCollider("rectangle", 0, 0, 50, doremon.height);
  doremon.debug = true;

  invisibleGround = createSprite(200, 600, 400, 10);
  invisibleGround.visible = false;


  heart1 = createSprite(1100, 100, 20, 20)
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(1100, 100, 20, 20)
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(1100 - 150, 100, 20, 20)
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

}

function draw() {
  background("white");

  doremon.collide(invisibleGround);
  drawSprites();
  textSize(50);
  fill("blue");
  text("You have scored:" + score, 700, 200)


  if (gameState === PLAY) {
    bg.velocityX = -(5 + 3 * score / 100);
    if (bg.x < 0) {
      bg.x = bg.width / 3;
    }

    //jump when the space key is pressed
    if (keyDown("space") && doremon.y >= 490) {
      console.log("space");
      doremon.velocityY = -16;
    }
    doremon.velocityY = doremon.velocityY + 0.8

    //add gravity


    if (life === 3) {
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if (life === 2) {
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if (life === 1) {
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }

    var select_obstacle = Math.round(random(1, 1));
    console.log(select_obstacle);
    if (World.frameCount % 200 === 0) {
      createObstacle();
      // createCoins();
    }

    if (World.frameCount % 50 === 0) {
      // createObstacle();
      createCoins();
    }

    if (coinGroup.isTouching(doremon)) {

      console.log("istouching coin");
      //  doremon.changeAnimation("spritelose",doremonImage2);
      for (var i = 0; i < coinGroup.length; i++) {

        if (coinGroup[i].isTouching(doremon)) {
          coinGroup[i].destroy()

          score = score + 10;
          console.log(score);
        }

      }
    }


    if (obstacleGroup.isTouching(doremon)) {

      console.log("istouching");
      //  doremon.changeAnimation("spritelose",doremonImage2);
      for (var i = 0; i < obstacleGroup.length; i++) {

        if (obstacleGroup[i].isTouching(doremon)) {
          obstacleGroup[i].destroy()

          life = life - 1
        }

      }



      //  gameState = END;
      //  obstacle.velocityX=0;

      //  console.log(life);
      // opponent1.changeAnimation("lose",opponent1_lose);

      if (life === 0) {
        gameState = "END"
      }

    }

  }



  if (gameState == "END") {
    bg.velocityX = 0;
    heart1.visible = false
    textSize(100)
    fill("red")
    text("You Lost ", 400, 400)
    obstacleGroup.destroyEach();
    coinGroup.destroyEach();
    doremon.destroy();
  }

}

function createCoins() {
  coin = createSprite(900, random(300, 400));
  coin.addImage(coinImage);
  coin.scale = 0.1;
  coin.debug = true;
  //obstacle.setCollider("rectangle",0,0,50,obstacle.height);
  // obstacle.debug = true;
  coin.velocityX = -(6 + 3 * score / 100);
  coinGroup.add(coin);
}

function createObstacle() {
  obstacle = createSprite(600, 550);
  obstacle.setCollider("rectangle", 0, 0, 20, obstacle.height);
  obstacle.debug = true;
  obstacle.velocityX = -(6 + 3 * score / 100)
  //	obstacle.addImage(obstacle_img);
  var rand = Math.round(random(1, 6));
  switch (rand) {
    case 1: obstacle.addImage(obstacle1);
      break;
    case 2: obstacle.addImage(obstacle2);
      break;
    case 3: obstacle.addImage(obstacle3);
      break;
    case 4: obstacle.addImage(obstacle4);
      break;
    case 5: obstacle.addImage(obstacle5);
      break;
    case 6: obstacle.addImage(obstacle6);
      break;
    default: break;
  }
  obstacle.scale = 1.2;
  obstacle.lifetime = 120;
  obstacleGroup.add(obstacle);
}