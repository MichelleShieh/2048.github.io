var best=0,score=0;
var grid=[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]];
var gridele;

window.addEventListener("load", function() 
{
	gridele=document.getElementById("grid").getElementsByTagName("div");
	//var grid=Array.prototype.slice.call(gridEle);
	//console.log(gridele.length);
	//grid[0].innerHTML=grid[0]+1;
	//console.log(parseInt(gridele[0].innerHTML)+1);
	for (var i=0;i<4;i++)
		for (var j=0;j<4;j++) {
			grid[i][j]=parseInt(gridele[i*4+j].innerHTML);
		}
	//console.log(grid[1][1]);
	initGrid();
});


//Init part
function initGrid() {
	console.log("start init?");
	score=0;
	randomCreate();
	randomCreate();
	update();
}

//Grid part
function moveGrid(direction) {
	/*
	console.log("before")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
	if (direction===0) {
		for (var i=0;i<4;i++) {
			var cur=0;
			for (var j=0;j<4;j++) {
				//console.log(i,j,grid[i][j]);
				if (!isNaN(grid[i][j])) {
					//console.log("get inside");
					grid[i][cur]=grid[i][j];
					if (cur!=j){
						grid[i][j]=NaN;
					}
					cur++;
				}
			}
		}
	}
	if (direction===1) {
		for (var j=0;j<4;j++) {
			var cur=0;
			for (var i=0;i<4;i++) {
				if (!isNaN(grid[i][j])) {
					grid[cur][j]=grid[i][j];
					if (cur!=i){
						grid[i][j]=NaN;
					}
					cur++;
				}
			}
		}
	}
	if (direction===2) {
		for (var i=0;i<4;i++) {
			var cur=3;
			for (var j=3;j>=0;j--) {
				//console.log(i,j,grid[i][j]);
				if (!isNaN(grid[i][j])) {
					//console.log("get inside");
					grid[i][cur]=grid[i][j];
					if (cur!=j){
						grid[i][j]=NaN;
					}
					cur--;
				}
			}
		}
	}
	if (direction===3) {
		for (var j=0;j<4;j++) {
			var cur=3;
			for (var i=3;i>=0;i--) {
				if (!isNaN(grid[i][j])) {
					grid[cur][j]=grid[i][j];
					if (cur!=i){
						grid[i][j]=NaN;
					}
					cur--;
				}
			}
		}
	}
	/*
	console.log("after")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
}

function mergeGrid(direction) {
	/*
	console.log("before merge")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
	if (direction===0) {
		for (var i=0;i<4;i++) {
			for (var j=0;j<3;j++) {
				//console.log(i,j,grid[i][j]);
				if (!isNaN(grid[i][j]) && !isNaN(grid[i][j+1]) && grid[i][j]===grid[i][j+1]) {
					//console.log("get inside");
					grid[i][j]=grid[i][j]*2;
					score+=grid[i][j];
					grid[i][j+1]=NaN;
					j++;
				}
			}
		}
	}
	if (direction===1) {
		for (var j=0;j<4;j++) {
			for (var i=0;i<3;i++) {
				if (!isNaN(grid[i][j]) && !isNaN(grid[i+1][j]) && grid[i][j]===grid[i+1][j]) {
					//console.log("get inside");
					grid[i][j]=grid[i][j]*2;
					score+=grid[i][j];
					grid[i+1][j]=NaN;
					i++;
				}
			}
		}
	}
	if (direction===2) {
		for (var i=0;i<4;i++) {
			for (var j=3;j>0;j--) {
				if (!isNaN(grid[i][j]) && !isNaN(grid[i][j-1]) && grid[i][j]===grid[i][j-1]) {
					//console.log("get inside");
					grid[i][j]=grid[i][j]*2;					
					score+=grid[i][j];

					grid[i][j-1]=NaN;
					j--;
				}
			}
		}
	}
	if (direction===3) {
		for (var j=0;j<4;j++) {
			for (var i=3;i>0;i--) {
				if (!isNaN(grid[i][j]) && !isNaN(grid[i-1][j]) && grid[i][j]===grid[i-1][j]) {
					//console.log("get inside");
					grid[i][j]=grid[i][j]*2;					
					score+=grid[i][j];
					grid[i-1][j]=NaN;
					i--;
				}
			}
		}
	}
	/*
	console.log("after merge")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
}

function randomCreate() {
	var empty = new Array();
	var cnt=0;
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (isNaN(grid[i][j])) {
				empty.push(i*4+j);
				cnt++;
			}
		}
	}
	randGrid=Math.floor(Math.random()*cnt);
	rand=Math.random()*10;
	var newtile;
	if (rand<8) newtile=2;
	else newtile=4;
/*
	console.log("newtile:",newtile);
	console.log("randGrid # in empty:",randGrid);
	console.log("row:",empty[randGrid]/4|0);
	console.log("col:",empty[randGrid]%4);
*/

	grid[empty[randGrid]/4|0][empty[randGrid]%4]=newtile;
	//console.log(newtile);
}

function update() {
	//update grid
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (isNaN(grid[i][j])) {
				gridele[i*4+j].innerHTML="";
				gridele[i*4+j].setAttribute("class","bv");
			} 
			else{
				gridele[i*4+j].innerHTML=grid[i][j]; 
				gridele[i*4+j].setAttribute("class","b"+grid[i][j]);
			}
		}
	}
	//update score
	document.getElementById("score").innerHTML=score;
	if (best<score) {
		best=score;
		document.getElementById("best").innerHTML=best;
	}
}

//Score part
function isGameOver() {
	var flag=0;
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (isNaN(grid[i][j])) {flag=1; break;}
		}
	}
	for(var i=0;i<4;i++) {
		for (var j=0;j<3;j++) {
			if (!isNaN(grid[i][j]) && !isNaN(grid[i][j+1]) && grid[i][j]===grid[i][j+1]) {
				flag=1;
				break;
			}
		}
	}
	for (var j=0;j<4;j++) {
		for (var i=0;i<3;i++) {
			if (!isNaN(grid[i][j]) && !isNaN(grid[i+1][j]) && grid[i][j]===grid[i+1][j]) {
				flag=1;
				break;
			}
		}
	}
	if (flag===0) {alert("game over");} 
}

//help
function dealKey(keynum) {
	//0 left, 1 up, 2 right, 3 down
	if (keynum===37) {
		return 0;
	}
	if (keynum===38) {
		return 1;
	}
	if (keynum===39) {
		return 2;
	}
	if (keynum===40) {
		return 3;
	}
}



//main
//initGrid(); //not work

document.onkeydown = function(e) {
	var keynum;
	keynum=window.event? e.keyCode : e.which; //get unicode of key, keycode->chrome/IE, which->firefox/opera
	keynum=dealKey(keynum);
	//alert(keynum);
	
	///*
	console.log("before")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	//*/
	
	moveGrid(keynum);
	mergeGrid(keynum);
	moveGrid(keynum);

	randomCreate();
	
	update();
	isGameOver();
	

	///*
	console.log("after")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	//*/
}