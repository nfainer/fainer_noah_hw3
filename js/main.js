
console.log("Linked Up");


var ctx = document.querySelector("#ctx").getContext("2d");


var HEIGHT = 500;
var WIDTH = 500;
var timeWhenGameStarted = Date.now(); //return time in ms
var arr = [];
var score = arr;

// player
var img = document.querySelector("#player");
var img1 = document.querySelector("#enemy");
var timeSurvived;

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
  return Math.sqrt(vx*vx*vy*vy);
}

testCollisionEntity = function (entity1,entity2){ //return if colliding (true or false)
  var distance = getDistanceBetweenEntity(entity1,entity2);
  return distance < 30;

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
  var mouseX = mouse.clientX - 25;
  var mouseY = mouse.clientY - 25;

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



if(something.x < 0 || something.x > WIDTH){
  something.spdX = -something.spdX;
}



if(something.y < 0 || something.y > HEIGHT){
  something.spdY = -something.spdY;
}
}



drawPlayer = function(something){
  ctx.save();
  ctx.drawImage(img,something.x-25,something.y-55,75,75);
  //ctx.fillStyle = 'green';
//  ctx.fillRect(something.x-10,something.y-10,20,20);
  ctx.restore();
}

drawEnemy = function(something){
  ctx.save();
  ctx.drawImage(img1,something.x-15,something.y-15,40,40);
  ctx.restore();
}

update = function (){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  timeSurvived = Date.now() - timeWhenGameStarted;
  for(var key in enemyList){
    updateEntity(enemyList[key]);

    var isColliding = testCollisionEntity(player,enemyList[key]);
    if(isColliding){
      player.hp = player.hp - 1;
      if(player.hp <= 0) {
        timeSurvived = Date.now() - timeWhenGameStarted;
        console.log("you lost! you" + timeSurvived + "ms.");
        timeWhenGameStarted = Date.now();
        arr.pop();
        arr.push(timeSurvived);
        document.querySelector("#scoreboard").innerHTML = "You survived: " + score/1000 + " Seconds";
        player.hp = 10;


      }
    }
  }

  drawPlayer(player);
  document.querySelector("h3").innerHTML = "Remaining HP:" + player.hp;
  document.querySelector("h4").innerHTML = Math.round(timeSurvived/1000) + " seconds";




}

Enemy('E1',150,350,10,-15);
Enemy('E2',120,300,13,-5);
Enemy('E3',250,150,10,-8);
Enemy('E4',50,350,10,-8);




setInterval(update,40);
