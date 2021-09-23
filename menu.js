c2 = document.getElementById('canvas2');
cc2 = c2.getContext('2d');

c0 = document.getElementById('canvas0');
cc0 = c0.getContext('2d');

function alertText(x){
	cc2.clearRect(0,c2.height-64, c2.width,64);
	cc2.fillStyle="rgba(50,10,200,0.8)";
	cc2.fillRect(1,c2.height-48, c2.width-1,48);
	cc2.strokeStyle="gold";
	cc2.strokeRect(1,c2.height-48, c2.width-2,47);
	cc2.fillStyle ="white";
	cc2.fillText(x,10, c2.height-32);
	closeText();
}


function closeText(){
	cc2.fillStyle ="white";
	cc2.fillText("Press X to close",c2.width-80, c2.height-16);
}

/*
function drawGold(){
	cc0.clearRect(0,0, 64,16);
	cc0.fillStyle="rgba(50,10,200,0.8)";
	cc0.fillRect(0,0, 64,16);

	cc0.strokeStyle="gold";
	cc0.strokeRect(0,0, 64,16);

	cc0.fillStyle = "gold";
	cc0.fillText("gold: "+gold, 10,10);
}

function drawAttack(){
	cc0.clearRect(0,16, 64,16);
	cc0.fillStyle="rgba(50,10,200,0.8)";
	cc0.fillRect(0,16, 64,16);

	cc0.strokeStyle="gold";
	cc0.strokeRect(0,16, 64,16);

	cc0.fillStyle = "white";
	cc0.fillText("DMG: "+playerDMG, 10,27);
}*/

function drawInventory(){
	//clear
	cc0.clearRect(0,0, 64,c0.height);

	//Inventory background
	cc0.fillStyle="rgba(50,10,200,0.8)";
	cc0.fillRect(0,0, 64,c0.height);
	//inventory outline
	cc0.strokeStyle="gold";
	cc0.strokeRect(0,0, 64,c0.height);

	//gold amount
	cc0.fillStyle = "gold";
	cc0.fillText("GOLD: "+gold, 5,10);

	//attack stats display
	cc0.fillStyle = "white";
	cc0.fillText("DMG: " + playerDMG, 5,27);
	drawWeapons();
}

function drawWeapons(woho){
	for (var i = 0; i < weapons.swords.length; i++) {
		if (weapons.swords[i].locked === true){
			cc0.fillStyle = "gray";
		} else {
			cc0.fillStyle = "white";
		}
		cc0.fillText(weapons.swords[i].name, 3,i*16+48);
		if (weapons.swords[i].equipped === true) {
			cc0.strokeStyle="white";
			cc0.strokeRect(2,i*16+35,60,16);
		}
	}
}