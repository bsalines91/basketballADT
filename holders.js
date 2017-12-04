/*
 *X and Y are positions of holder, W and H are the size, 
 *C is the color, and O is either vertical or horizontal postion of holders
 */
function Holder(x, y, w, h, c, o) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.hBalls = [];
    this.index = 0;
    this.o = o;
    this.adtChange = false;
};

Holder.prototype.draw = function(context) {

    context.save();


    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.shadowColor = 'black';
    context.shadowBlur = 25;
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;

    context.fillRect(this.x, this.y, this.width, this.height);

    for (var i = 0; i < this.hBalls.length; i++) {

        this.hBalls[i].draw(context);
    }


    context.restore();

};
Holder.prototype.hit = function(x, y, obj) {
    var dx, dy;

    dx = this.x + this.width;
    dy = this.y + this.height;

    if (obj.maxX() > this.x && obj.minX() < dx &&
        obj.maxY() > this.y && obj.minY() < dy) {

        return true;


    }

    return false;

}
Holder.prototype.put = function(b) {
    var bParent = b.getParent();
    console.log(bParent);

    if (bParent != this) {
        if (this.o == "h") {
            this.hBalls[this.index] = b;
            this.hBalls[this.index].setParent(this);
            this.hBalls[this.index].x = (this.x + this.hBalls[this.index].radius + 5) + (this.index * (2 * this.hBalls[this.index].radius + 10));
            this.hBalls[this.index].y = this.y + (this.height / 2);
            this.index = this.index + 1;

        } else if (this.o == "v") {
            this.hBalls[this.index] = b;
            this.hBalls[this.index].setParent(this);
            this.hBalls[this.index].x = this.x + (this.width / 2);
            this.hBalls[this.index].y = ((this.y + this.height - this.hBalls[this.index].radius - 25)) - (this.index * (2 * this.hBalls[this.index].radius + 5));
            this.index = this.index + 1;
        }
    } else if (bParent == this && !this.adtChange) {

        for (var i = 0; i < this.hBalls.length; i++) {




            if ( b == this.hBalls[i] ) continue;
	    console.log("hit i="+i, b.x, b.y, this.hBalls[i].x, this.hBalls[i].y)
		         if ( b.hit( this.hBalls[i].x, this.hBalls[i].y )
					 && this.hBalls[i].hit(b.x, b.y) ){
					
					 for (var j = 0;  j < this.hBalls.length; j++){
						 if (b.ballID == this.hBalls[j].ballID){
							 var a = this.hBalls[i];
   							 this.hBalls[i] = this.hBalls[j];
							 this.hBalls[j] = a;
							// this.hBalls[i].x = this.hBalls[j];
							// this.hBalls[j].x = this.hBalls[i];
		                 
						alert ( this.hBalls[i].ballID + " ----" + this.hBalls[j].ballID);
							    break;
						 }
						
						 
					 }
					
            	

        }
		}
	
        for (var i = 0; i < this.hBalls.length; i++) {
            console.log(this.hBalls[i]);

        }



    } else if (bParent == this && this.adtChange) {
        console.log("passed");
        this.hBalls[this.index] = b;
        this.hBalls[this.index].setParent(this);
        this.hBalls[this.index].x = (this.x + this.hBalls[this.index].radius + 5) + (this.index * (2 * this.hBalls[this.index].radius + 10));
        this.hBalls[this.index].y = this.y + (this.height / 2);
        this.index = this.index + 1;

    }
}

Holder.prototype.remove = function(b) {
    var item = b.ballNum;
    if (this.o == "h") {
        for (var i = 0; i < this.hBalls.length; i++) {
            if (this.hBalls[i].ballNum == item) {
                this.hBalls.splice(i, 1);
                this.index = this.index - 1;
                for (var i = 0; i < this.hBalls.length; i++) {

                    this.hBalls[i].x = (this.x + this.hBalls[i].radius + 5) + (i * (2 * this.hBalls[i].radius + 10));
                    this.hBalls[i].y = this.y + (this.height / 2);
                }
            }
        }


    }
}

Holder.prototype.removeAll = function() {
    
        this.hBalls.splice(0, this.hBalls.length);
        this.index = 0;

    


}