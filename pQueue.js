/*
 * Basketball ADT 
 *
 *
 * Represents the canvas element and handles the functionality of the Priority Queue. 
 * 
 *
 * @author Brandon Salines
 * 
 * 
 */
function PriorityQueue(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.qBalls = [];
    this.priority = 0;
    this.index = 0;
    this.peek = false;
    this.show = false;
    this.contain = false;
};

PriorityQueue.prototype.draw = function(context) {

    context.save();


     context.fillStyle = "black";
    context.strokeStyle = "black";

    var text = "Priority Queue"
    context.font = "30px Arial";
    context.fillText(text, (this.x + this.width / 2) - (context.measureText(text).width / 2), 60);






    if (this.show == true) {
        for (var i = 0; i < this.qBalls.length && i < 6; i++) {

            this.qBalls[i].draw(context);
        }
    } else {
        //do not draw balls
    }

    if (this.peek == true) {
        this.qBalls[0].draw(context);
    } else {
        //do not draw balls
    }

    context.restore();

}
PriorityQueue.prototype.hit = function(x, y, obj) {
    var dx, dy;

    dx = this.x + this.width;
    dy = this.y + this.height;

    if (obj.maxX() > this.x && obj.minX() < dx &&
        obj.maxY() > this.y && obj.minY() < dy) {

        return true;


    }

    return false;

}
PriorityQueue.prototype.put = function(b) {
    var bParent = b.getParent();


    if (bParent != this) {

        for (var i = 0; i < this.qBalls.length; i++) {
            if (this.qBalls[i].ballNum > b.ballNum) {
                this.qBalls.splice(i, 0, b);
                b.setParent(this);
                this.contain = true;
                break;
            }

        }


        if (!this.contain) {
            b.setParent(this);
            this.qBalls.push(b);
        }

        if (this.qBalls[this.qBalls.length - 1].ballNum < b.ballNum) {
            this.qBalls.splice(this.qBalls.length, 0, b);

        }

        for (var k = 0; k < this.qBalls.length; k++) {
            this.qBalls[k].x = this.x + (this.width / 2);
            this.qBalls[k].y = ((this.y + this.height - this.qBalls[k].radius - 25)) - (k * (2 * this.qBalls[k].radius + 5));

        }




        for (var j = 0; j < this.qBalls.length; j++) {
            console.log(this.qBalls[j]);

        }
        console.log("--------------");


    }


}

PriorityQueue.prototype.get = function() {
    if (this.qBalls.length == 0) {
        alert("No items in queue");
    }
    else {
    var item = this.qBalls.shift();

    for (var k = 0; k < this.qBalls.length; k++) {
        this.qBalls[k].x = this.x + (this.width / 2);
        this.qBalls[k].y = ((this.y + this.height - this.qBalls[k].radius - 25)) - (k * (2 * this.qBalls[k].radius + 5));

    }

    return item;
	}
}


PriorityQueue.prototype.removeAll = function() {

    this.qBalls.splice(0, this.qBalls.length);
    this.index = 0;


}