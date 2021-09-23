function drawBackground(){
	for (var i = 0; i < mapMatrix.length; i++) {
		for (var j = 0; j<mapMatrix[i].length; j++){
				cc.strokeStyle = "black";
				cc.strokeRect(j*32,i*32,32,32);
		}
	}
}