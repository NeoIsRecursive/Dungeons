var latestMove = [[0,0]];
var pX = 5;
var pY = 5;
var playerDMG = 0;
var inventory = [];

var heroSprite = new Image();
heroSprite.src = "images/heroMoveSprite.png"; 

var thanos = new Image();
thanos.src = "images/thanos.png";

function loadPlayer() {
	mapMatrix[pX][pY] = 1;
}

var imgherox = 0;

function drawPlayer(j, i){
	if (weapons.swords[6].equipped === true){
		cc.drawImage(thanos, j*32, i*32);
	} else {
		if (latestMove[0][1] === 1){
			imgherox = 0;
		} else if (latestMove[0][1] === -1){
			imgherox = 32;
		} else if (latestMove[0][0] === -1){
			imgherox = 96;
		} else if (latestMove[0][0] === 1){
			imgherox = 64;
		}
		cc.drawImage(heroSprite,imgherox, 0, 32, 32, j*32, i*32, 32, 32);
	}
}

function movePlayer(x, y){	
	mapMatrix[pX][pY] = 0;
	pX+=x;
	pY+=y;
	if(mapMatrix[pY]===undefined || mapMatrix[pX] === undefined){
		pX-=x;
		pY-=y;
	}
	if (mapMatrix[pX][pY] !== 0){
		pX-=x;
		pY-=y;
	}
	mapMatrix[pX][pY] = 1;
	latestMove.push([x,y]);
	if (latestMove.length > 1){
		latestMove.shift();
	}
}

function action(){
	var atlocx = pX+latestMove[0][0];
	var atlocy = pY+latestMove[0][1];
	var afarea = mapMatrix[atlocx][atlocy];
	if (playerDMG === "infinity"){
		killHalf();
		console.log("hej");
	} else if (afarea === 0){
		alertText("There is nothing here...");
	} else if (enemyType.types.some(e => e.value === afarea)){
		damageEnemy(atlocx,atlocy,playerDMG);
	} else if (afarea === 2){
		mapMatrix[atlocx][atlocy]=0;
		pickUp(afarea);
	} else if (afarea === "sword"){
		weapons.swords[6].locked = false;
		alertText("You unlocked "+ weapons.swords[6].name +" press O to switch swords");
		mapMatrix[atlocx][atlocy] = 0;
		drawInventory();
	}
	drawMap();
}

function killHalf(){
	var killed = [];
	var enemykilled;
	var enmystokill = enemies.length/2;
	var eposx, eposy;
	for (var i = 0; i < enmystokill; i++){
		enemykilled = Math.floor(Math.random()*enemies.length);
		killed.push(enemykilled);
		eposx = enemies[enemykilled][0][0];
		eposy = enemies[enemykilled][0][1];
		destroyEnemy(eposx,eposy,enemykilled);
	}
}



var invloc = 0;
var oldinvloc = [0];

function switchItem(){
	weapons.swords[invloc].equipped = false;
	/*if (weapons.swords[invloc] === undefined){
		invloc = 0;
	}
	if (weapons.swords[invloc].locked === true){
		invloc--;
		alertText("You haven't unlocked this yet");
		return;
	} */
	for (var i = invloc; i < weapons.swords.length; i++) {
		if (weapons.swords[i].locked === false && oldinvloc.includes(i) === false){
			invloc = i;
			oldinvloc.push(i);
			break;
		}
		if (playerDMG === weapons.swords[i].damage && oldinvloc.length !== 1){
			invloc = 0;
			oldinvloc = [0];
			console.log("wtf");
			continue;
		}
	}
	playerDMG = weapons.swords[invloc].damage;
	alertText("equipped "+ weapons.swords[invloc].name);
	weapons.swords[invloc].equipped = true;
	drawInventory(weapons.swords[invloc]);
}