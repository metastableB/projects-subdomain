/*
 * @author: Don Dennis
 * snake.js
 */
function Snake() {
	this.x = 0;
	this.y = 0;
	this.score = 0;
	this.score_incr = 10;
	this.xspeed = 1;
	this.yspeed = 0;
	// History of cordinates. Updated on ieach update call.
	// and on each eat.
	this.history = [];
	// The last box that was shifted out. We use this to
	// extend the snake's length.
	this.tail = [];
	this.died = false;
	// Used for blinking effect. TODO: find better way to do this.
	this.delay_counter = 10;

	this.update = function() {
		if (this.died) return false;
		this.tail = this.history.shift();
		this.history.push([this.x, this.y]);
		x = this.x + this.xspeed;
		y = this.y + this.yspeed;
		if (x >= X_MAX) x = 0;
		if( x < 0) x = X_MAX-1;
		if(y >= Y_MAX) y = 0;
		if(y < 0) y = Y_MAX - 1;
		for(var i = 0; i < this.history.length; i +=1){
			if (this.history[i][0] == x && this.history[i][1] == y){
				this.died = true;
				return false;	
			}
		}
		this.x = x;
		this.y = y;
		return true;
	};

	this.dir = function (x, y) {
		// Prevent moving backwards
		if (x == this.xspeed && y == -1*this.yspeed || 
		y == this.yspeed && x == -1*this.xspeed) {
			this.xspeed = this.xspeed;
			this.yspeed = this.yspeed;
			return;
		}
		
		this.xspeed = x;
		this.yspeed = y;
	};

	this.eat = function(f_x, f_y){
		if(f_x != this.x || f_y != this.y)
			return false;
		// TODO: Tail becomes invalid after this step. Handle that.
		this.history.unshift(this.tail);
		this.score += this.score_incr;
		return true;
	}

	this.show = function() {
		var color = 255;
		if (this.died){
			this.delay_counter -= 1;
			color = BG_COLOR;
			if (this.delay_counter >= 5){
				color = 'rgb(255,0,0)';
			} else if(this.delay_counter == 0){
				this.delay_counter = 10;
			}
		}

		fill(color);
		for (var i = 0; i < this.history.length; i+=1){
			var x_ = boxToPixels(this.history[i][0], this.history[i][1]);
			var y_ = x_[1];
			x_ = x_[0];
			rect(x_, y_, SQUARE_LENGTH, SQUARE_LENGTH) ;
		}
	}
}

function Food() {
	this.x = getRandomArbitrary(0, X_MAX);
	this.y = getRandomArbitrary(0, Y_MAX);

	this.new_food = function() {
		// TODO: Make sure you don't generate on top of the snake
		this.x = getRandomArbitrary(0, X_MAX);
		this.y = getRandomArbitrary(0, Y_MAX);
	}

	this.show = function() {
		fill('rgb(0,255,0)');

		var x_ = boxToPixels(this.x, this.y);
		var y_ = x_[1];
		x_ = x_[0];
		rect(x_, y_, SQUARE_LENGTH, SQUARE_LENGTH) ;
	}
}

/* min inclusive, max exclusive */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/* Converts the box indexed by x and y to the pixels to draw.
 * Does not check if out of bounds. */
function boxToPixels(x, y) {
	x = x*SQUARE_LENGTH;
	y = y*SQUARE_LENGTH;
	return [x, y];
}