var oldx = [];
var oldy = [];
var enemies=[];
var enx;
var eny;
var enHP;


function newEnemies(amount1, strength1, amount2, strength2){
	createEnemies(amount1, strength1);
	createEnemies(amount2,strength2);
	createEnemies(1, 2);
	oldx = [];
	oldy = [];
}

function createEnemies(x, y) {
	enx = eny = -1;
	for (var i = 0; i < x; i++) {
		while(oldx.includes(enx) === true || enx === pX || enx===-1){
			enx = Math.floor(Math.random()*mapMatrix.length);
		}
		
		eny = Math.floor(Math.random()*mapMatrix[enx].length);

		if (mapMatrix[enx][eny]==="sword") {
			enx-=2; 
		}
	
		mapMatrix[enx][eny]=enemyType.types[y].value;
		oldx.push(enx);
		oldy.push(eny);
		enemies.push([[enx,eny],enemyType.types[y].hp]);
	}
}

function damageEnemy(x, y, z){
	for (var i = 0; i < enemies.length; i++) {
		if(enemies[i][0][0] === x && enemies[i][0][1] === y){
			enemies[i][1]-=z;	
		}
		if (enemies[i][1] < 1){
			destroyEnemy(x,y,i);
		}
	}
}

function destroyEnemy(x, y, i){
	enemies.splice(i,1);
	enemyDrop(mapMatrix[x][y]);
	mapMatrix[x][y]=0;
	if (enemies.length === 0){
		newEnemies(3,0,2,1);
	}
	drawMap();
}

function enemyDrop(x) {
	if (playerDMG !== "infinity"){
		var amount = Math.ceil(Math.random()*x+x)*5;
		gold += amount;
		alertText("you got " +amount+" gold.")
		drawInventory();
	} else {
		alertText("*snap*");
	}
}