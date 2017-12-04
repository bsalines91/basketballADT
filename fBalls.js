/*
 *X and Y are positions of Stack, W and H are the size, 
 *C is the color, and O is either vertical or horizontal postion of Stacks
 */
function FreeBall() {
    this.fBalls = [];
    this.index = 0;

};

Stack.prototype.draw = function(context) {

    context.save();


    //context.fillStyle = this.color;
   // context.strokeStyle = this.color;

    var text = "Stack"
    context.font = "30px Arial";
    context.fillText(text, (this.x + this.width / 2) - (context.measureText(text).width / 2), 60);

	
	
  // context.shadowColor = 'black';
  //  context.shadowBlur = 25;
  //  context.shadowOffsetX = 10;
//   context.shadowOffsetY = 10;

  // context.fillRect(this.x, this.y, this.width, this.height);



    if (this.show == true) {
        for (var i = 0; i < this.sBalls.length && i < 6; i++) {

            this.sBalls[i].draw(context);
        }
    } else {
        //do not draw balls
    }

    if (this.peek == true) {
        this.sBalls[this.sBalls.length - 1].draw(context);
    } else {
        //do not draw balls
    }

    context.restore();

};
Stack.prototype.hit = function(x, y, obj) {
    var dx, dy;

    dx = this.x + this.width;
    dy = this.y + this.height;

    if (obj.maxX() > this.x && obj.minX() < dx &&
        obj.maxY() > this.y && obj.minY() < dy) {

        return true;


    }

    return false;

}
Stack.prototype.put = function(b) {
    var bParent = b.getParent();

    if (bParent != this) {

        this.sBalls.push(b);
        this.sBalls[this.index].setParent(this);
        this.sBalls[this.index].x = this.x + (this.width / 2);
        this.sBalls[this.index].y = ((this.y + this.height - this.sBalls[this.index].radius - 25)) - (this.index * (2 * this.sBalls[this.index].radius + 5));
        this.index = this.index + 1;
        console.log("Push: " + this.index);
    }




}

Stack.prototype.get = function() {
     if (this.sBalls.length == 0){
		alert("Stack is empty");
	}
	else{
	
	ball = this.sBalls.pop();
    this.index = this.index - 1;
    console.log("Pop: " + this.index);
    return ball;
	} 
}


Stack.prototype.removeAll = function() {
    this.sBalls.splice(0, this.sBalls.length);
    this.index = 0;


}