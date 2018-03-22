
console.log("Linked Up");


var ctx = document.querySelector("#ctx").getContext("2d");


var HEIGHT = 1000;
var WIDTH = 1000;
var timeWhenGameStarted = Date.now(); //return time in ms
var arr = [];
var score = arr;

// player
var img = document.querySelector("#player");
var img1 = document.querySelector("#enemy");
var timeSurvived;

var frameCount = 0;

var player = {
x:50,
spdX:40,
y:40,
spdY:5,
name:'P',
hp:10,
};


var enemyList = {};
// enemy
// get distance between player and enemy < 10 => colliding
getDistanceBetweenEntity = function (entity1,entity2){ //return distance (number)
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
  //Math.sqrt(vx*vx*vy*vy)
}

testCollisionEntity = function (entity1,entity2){ //return if colliding (true or false)
  var distance = getDistanceBetweenEntity(entity1,entity2);
  return distance < 90;

}

Enemy = function(id,x,y,spdX,spdY){
  var enemy = {
  x:x,
  spdX:spdX,
  y:y,
  spdY:spdY,
  name:'E',
  id:id,
  };
  enemyList[id] = enemy;
}

document.onmousemove = function(mouse){
 var mouseX = mouse.clientX - 45;
 var mouseY = mouse.clientY - 55;


if(mouseX < 0)
  mouseX = 0;
  if(mouseX > WIDTH)
    mouseX = WIDTH;
    if(mouseY < 0)
      mouseY = 0;
    if(mouseY > HEIGHT)
     mouseY = HEIGHT;



  player.x = mouseX;
  player.y = mouseY;
}


updateEntity = function (something){

  updateEntityPosition(something);
  drawEnemy(something);
}

updateEntityPosition = function(something){
  //enemy
  something.x += something.spdX;
  something.y += something.spdY;



if(something.x-60 < 0 || something.x+60 > WIDTH){
  something.spdX = -something.spdX;
}



if(something.y-60 < 0 || something.y+60 > HEIGHT){
  something.spdY = -something.spdY;
}
}



drawPlayer = function(something){
  ctx.save();
  ctx.drawImage(img,something.x-25,something.y-55,105,105);
  //ctx.fillStyle = 'green';
  ctx.restore();
}

drawEnemy = function(something){
  ctx.save();
  ctx.drawImage(img1,something.x-75,something.y-75,140,140);
  ctx.restore();
}

update = function (){
  ctx.clearRect(0,0,WIDTH,HEIGHT);

 frameCount++;

 if(frameCount % 100 === 0)      //every 4 sec
          randomlyGenerateEnemy();


  timeSurvived = Date.now() - timeWhenGameStarted;
  for(var key in enemyList){
    updateEntity(enemyList[key]);

    var isColliding = testCollisionEntity(player,enemyList[key]);
    if(isColliding){
      player.hp = player.hp - 1;

    }
  }

  if(player.hp <= 0) {
    timeSurvived = Date.now() - timeWhenGameStarted;
    console.log("you lost! you" + timeSurvived + "ms.");
    timeWhenGameStarted = Date.now();
    arr.pop();
    arr.push(timeSurvived);
    document.querySelector("#scoreboard").innerHTML = "You survived: " + score/1000 + " Seconds";
    player.hp = 10;
    startNewGame();
  }


  drawPlayer(player);
  document.querySelector("h3").innerHTML = "Remaining HP:" + player.hp;
  document.querySelector("h4").innerHTML = Math.round(timeSurvived/1000) + " seconds";


}

startNewGame = function(){
        player.hp = 10;
        timeWhenGameStarted = Date.now();
        frameCount = 0;
        enemyList = {};
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();
        randomlyGenerateEnemy();
}

randomlyGenerateEnemy = function() {
  Math.random()
  var x = Math.random() * WIDTH;
  var y = Math.random() * HEIGHT;
  var id = Math.random();
  var spdX = 7 + Math.random() * 5;
  var spdY = 7 + Math.random() * 5;
  Enemy(id,x,y,spdX,spdY,);
}

startNewGame();



setInterval(update,40);
