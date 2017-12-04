
function Scoreboard(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.score = 0;
    this.show = true;
};

Scoreboard.prototype.draw = function(context) {

	if (this.show){
    context.save();


    context.fillStyle = "black";
    context.strokeStyle = "black";

    var text = "Score";
    context.font = "30px Arial";
    context.fillText(text, (this.x + this.width / 2) - (context.measureText(text).width / 2), 70);


	context.fillRect(this.x - 3, this.y -3 , this.width +6, this.height+6);
	
	
	 context.fillStyle = this.color;
    context.strokeStyle = this.color;
   context.shadowColor = 'black';
    context.shadowBlur = 25;
    context.shadowOffsetX = 10;
   context.shadowOffsetY = 10;

    context.fillRect(this.x, this.y, this.width, this.height);

	context.fillStyle = "black";
    context.strokeStyle = "black";
	var scoreText = this.score;
	context.font = "bold 30px Arial";
	context.fillText (scoreText,(this.x + this.width/2) - (context.measureText(scoreText).width / 2), (this.y + this.height/2) +10);

    context.restore();

	}
};

Scoreboard.prototype.increment = function(s) {

		this.score = this.score +1 ;

}

Scoreboard.prototype.decrement = function(s) {

		this.score = this.score - 1;

}


Scoreboard.prototype.clear= function() {
		
		this.score = 0;

}