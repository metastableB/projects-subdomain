/*
 * @author: Don Dennis
 * snake.js
 */
var CANVAS_WIDTH =  600;
var CANVAS_HEIGHT = 600;
var SQUARE_LENGTH = 40;
var X_MAX = CANVAS_WIDTH/SQUARE_LENGTH;
var Y_MAX = CANVAS_HEIGHT/SQUARE_LENGTH;
var BG_COLOR = 51;
function setup() {
	if (CANVAS_HEIGHT % SQUARE_LENGTH != 0 || CANVAS_WIDTH % SQUARE_LENGTH != 0){
		console.log("Incorrect CANVAS_WIDTH/CANVAS_HEIGHT and SQUARE_LENGTH. Contact me please?");
		remove();
		return;
	}
	var canvas = createCanvas(600, 600);
	canvas.parent('canvas-holder');
	frameRate(10);
	s = new Snake();
	f = new Food();
}

function draw() {
	background(BG_COLOR);
	var alive = s.update();
	var ate_food = s.eat(f.x, f.y);
	if (ate_food){
		f.new_food();
	}
	f.show();
	s.show();
}

function keyPressed() {
	if (keyCode == UP_ARROW){
		s.dir(0, -1);
	} else if (keyCode == DOWN_ARROW){
		s.dir(0, 1);
	} else if (keyCode == RIGHT_ARROW){
		s.dir(1, 0);
	} else if (keyCode == LEFT_ARROW) {
		s.dir(-1, 0);
	}

}