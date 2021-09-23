c = document.getElementById('canvas1');
cc = c.getContext('2d');

var enemy1Img = new Image();
enemy1Img.src ="images/enemy1.png";

var enemy2Img = new Image();
enemy2Img.src = "images/enemy2.png";

var enemy3Img = new Image();
enemy3Img.src = "images/enemy3.png"; 

var mapMatrix = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,"sword",0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];


function loadGame() {
	newEnemies(2,0,2,1);
	drawMap();
	loadEventlisteners();
	drawInventory();
	alertText("move with WASD, interact with P");
}


function drawMap(){
	cc.clearRect(0,0,c.width,c.height);
	loadPlayer();
	c.style.backgroundImage="url(images/background1.png)";
	for (var i = 0; i < mapMatrix.length; i++) {
		for (var j = 0; j<mapMatrix[i].length; j++){
			if (mapMatrix[j][i] === 1){
				drawPlayer(j,i);
			}else if(mapMatrix[j][i] === 2){
				cc.drawImage(lootBag,j*32,i*32);
			}else if (enemyType.types.some(e => e.value === mapMatrix[j][i])) {
				var img = enemyType.types[mapMatrix[j][i]-3].images[0];
				cc.drawImage(img,j*32,i*32);
			} else if (mapMatrix[j][i] === "sword"){
				cc.drawImage(lootBag,j*32,i*32);
			}
		}
	}
	drawBackground();
}


function loadEventlisteners(){
	window.addEventListener('keyup',function (e){
		if (e.code === "KeyA"){
			movePlayer(-1,0);
		}
		if (e.code === "KeyD"){
			movePlayer(1,0);
		}
		if (e.code === "KeyW"){
			movePlayer(0,-1);
		}
		if (e.code === "KeyS"){
			movePlayer(0,1);
		}
		if (e.code === "KeyP"){
			action();
		}
		if (e.code === "KeyX"){
			cc2.clearRect(0,c2.height-64, c2.width,64);
		}
		if (e.code === "KeyO"){
			switchItem();
		}
		drawMap()
	});
}