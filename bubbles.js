function Ball(x, y, r, c, sAngle, eAngle, bn, id) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.ballNum = bn;
    this.ballID = id;
    this.ballNumFont = "bold 30px Arial";
    this.track = {}; // tracking data
    this.parent = null;
};

Ball.prototype.hit = function(x, y) {
    var dx, dy;
    var r = this.radius + 3;

    dx = this.x - x;
    dy = this.y - y;

    return (dx * dx + dy * dy) <= r * r;
};

Ball.prototype.draw = function(context) {
    context.save();

    context.lineWidth = 2;

    context.strokeStyle = this.color;
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    //var imageObj = new Image();
	           
             //     imageObj.src = "ball.png";

         //      context.drawImage(imageObj,this.x - this.radius, this.y - this.radius);
     
			 


    context.fill();
    context.stroke();



    context.fillStyle = "#000000";
    context.font = this.ballNumFont;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(this.ballNum, this.x, this.y);


    context.restore();

};

/**
 * Start tracking.  
 * Remember start position.
 */
Ball.prototype.trackStart = function() {
    var i, n;

    this.track.x = this.x;
    this.track.y = this.y;
}

/**
 * Cancel tracking.  Restore start position.
 * Called when this Ball is dragged off the canvas.
 */
Ball.prototype.trackCancel = function() {
    var i, n;

    this.x = this.track.x;
    this.y = this.track.y;
}

/**
 * Move this Ball.
 */
Ball.prototype.trackMove = function(dx, dy) {
    this.x += dx;
    this.y += dy;
};

/**
 * End tracking of this Ball.
 */
Ball.prototype.trackEnd = function() {
    // do nothing in this case
    // take any actions needed when tracking is done
}

Ball.prototype.shuffle - function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }

	
}

Ball.prototype.setParent = function(p) {
    this.parent = p;
}

Ball.prototype.getParent = function() {
    return this.parent;

}

Ball.prototype.minX = function() {
    return this.x - this.radius;
}

Ball.prototype.maxX = function() {
    return this.x + this.radius;
}

Ball.prototype.minY = function() {
    return this.y - this.radius;
}

Ball.prototype.maxY = function() {
    return this.y + this.radius;
}

Ball.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
}