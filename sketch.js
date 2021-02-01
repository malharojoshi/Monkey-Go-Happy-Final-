var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var obGroup;
var score = 0;
var ob, obImg;
var ground;
var monkeyCreated = "no";
var gameState = "play";
var ground;
var bananaGroup;
var monkeyCollidedImg;
var background, backgroundImg;
function spawnob() {
  if (World.frameCount % 80 === 0) {
    ob = createSprite(banana.x - 150, 500, 20, 20);
    ob.addImage(obImg);
    ob.scale = 0.2;
    ob.velocityX = -6;
    ob.lifetime = banana.lifetime;
    obGroup.add(ob);
  }
}

function spawnBanana() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(600, random(440, 200), 20, 20);
    banana.addImage(bananaImage);
    banana.lifetime = 115;
    banana.velocityX = -6;
    banana.scale = 0.08;
    bananaGroup.add(banana);
  }
}

function preload() {
  monkey_running = loadAnimation(
    "Monkey_01.png",
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
  monkeyCollidedImg = loadImage("Monkey_05.png");
  bananaImage = loadImage("banana.png");
  obImg = loadImage("stone.png");
  backgroundImg = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600, 600);
  ground = createSprite(300, 550, 1200, 20);
  background = createSprite(300, 300, 1200, 20);
  bananaGroup = new Group();
  obGroup = new Group();
}

function draw() {
  background.addImage(backgroundImg);
  stroke("blue");
  ground.visible = false;
  if (gameState === "play") {
    spawnBanana();
    spawnob();
    if (keyIsDown(32) || touches.length > 0) {
      monkey.velocityY = monkey.velocityY - 4;
      touches = [];
    }
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = 300;
    }
    background.velocityX = -6;
    if (background.x < 150) {
      background.x = background.width / 2;
    }
    if (monkeyCreated === "no") {
      monkey = createSprite(70, 500, 20, 20);
      monkey.addAnimation("monkey_moving", monkey_running);
      monkey.addAnimation("collided", monkeyCollidedImg);
      monkey.scale = 0.18;
      monkeyCreated = "yes";
    }
    if (monkey.isTouching(obGroup)) {
      monkey.scale = 0.18;
      gameState = "end";
    }
  }
  if (gameState === "end") {
    //text("Game Over          " + "Score: " + score, 100, 300);
    ground.velocityX = 0;
    background.velocityX = 0;
    banana.velocityX = 0;
    ob.velocityX = 0;
    monkey.changeAnimation("collided", monkeyCollidedImg);
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  if (monkeyCreated === "yes") {
    monkey.collide(ground);
    if (monkey.y === 0 || monkey.y < 0) {
      monkey.destroy();
      monkeyCreated = "no";
    }
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 2;
    }
    switch (score) {
      case 10:
        monkey.scale = 0.22;
        break;
      case 20:
        monkey.scale = 0.26;
        break;
      case 30:
        monkey.scale = 0.3;
        break;
      case 40:
        monkey.scale = 0.34;
        break;
      default:
        break;
    }
  }
  drawSprites();
  text("Survival Time: " + score, 100, 50);
  if (gameState === "end") {
    text("Game Over          " + "Score: " + score, 100, 300);
  }
}
