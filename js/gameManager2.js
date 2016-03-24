var best=0,score=0;
var grid=[[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN]];
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
	initGame();
});


//Init part
function initGame() {
	console.log("start init?");
	score=0;
	grid=[[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN],[NaN,NaN,NaN,NaN]];
	randomCreate();
	randomCreate();
	update();
}

//Grid part
function moveGrid1(direction) {
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
	var mergeAnimate = new Array();
	if (direction===0) {
		for (var i=0;i<4;i++) {
			for (var j=0;j<3;j++) {
				//console.log(i,j,grid[i][j]);
				if (!isNaN(grid[i][j]) && !isNaN(grid[i][j+1]) && grid[i][j]===grid[i][j+1]) {
					//console.log("get inside");
					grid[i][j]=grid[i][j]*2;
					mergeAnimate.push(i*4+j);
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
					mergeAnimate.push(i*4+j);
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
					mergeAnimate.push(i*4+j);				
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
					mergeAnimate.push(i*4+j);				
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
	return mergeAnimate;
}

function moveGrid2(direction,animation) {
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
					var index=animation.indexOf(i*4+j);
					if (index!==-1){
						animation[index]=i*4+cur;
					}
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
					var index=animation.indexOf(i*4+j);
					if (index!==-1){
						animation[index]=cur*4+j;
					}
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
					var index=animation.indexOf(i*4+j);
					if (index!==-1){
						animation[index]=i*4+cur;
					}
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
					var index=animation.indexOf(i*4+j);
					if (index!==-1){
						animation[index]=cur*4+j;
					}
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
	return animation;
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

function update(animation) {
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
				if (animation!=undefined && animation.indexOf(i*4+j)!==-1) {
					
					//console.log(i*4+j);
					console.log(document.getElementById(i*4+j));

					//document.getElementById(i*4+j).style.cssText="animation: scale 0.2s;";	
					var id=i*4+j;
					$("#"+id).toggleClass("scaleAnimation")
				}
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
	var flag2=0;
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			if (!isNaN(grid[i][j]) && grid[i][j]==2048) {
				flag2=1;
				alert("Congratulations! You made 2048! Do you want to challenge yourself again to get a better score?");
				initGame();
				break;
			}
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
	if (flag===0 && flag2==0) {alert("Sorry, Game is Over. Do you want to start a new game?"); initGame();} 
}

//help
function dealKey(keynum) {
	//0 left, 1 up, 2 right, 3 down
	if (keynum===37 || keynum===65) {
		return 0;
	}
	if (keynum===38 || keynum===87) {
		return 1;
	}
	if (keynum===39 || keynum===68) {
		return 2;
	}
	if (keynum===40 || keynum===83) {
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
	
	/*
	console.log("before")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
	if (keynum===0 || keynum===1 || keynum===2 || keynum===3){
	moveGrid1(keynum);
	var animation=mergeGrid(keynum);
	moveGrid2(keynum,animation);

	randomCreate();
	
	update(animation);
	isGameOver();
	}
	

	/*
	console.log("after")
	console.log(grid[0][0],grid[0][1],grid[0][2],grid[0][3]);
	console.log(grid[1][0],grid[1][1],grid[1][2],grid[1][3]);
	console.log(grid[2][0],grid[2][1],grid[2][2],grid[2][3]);
	console.log(grid[3][0],grid[3][1],grid[3][2],grid[3][3]);
	*/
}