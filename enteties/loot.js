var gold = 0;

var lootBag = new Image();
lootBag.src = "images/lootbag.png";


function pickUp(kind){
	if (kind === 2){
		gold+=(Math.round(Math.random()*4)+8);
		drawInventory();
	}
}