/*
 * Basketball ADT 
 *
 *
 * The main control class for the application. Handles all events driven by the mouse, buttons, 
 * radio boxes, and check boxes. This class is responsible for the animation and initializing primary
 * variables, events, objects, array's and images. 
 *
 * @author Brandon Salines
 * 
 * 
 */
var balls = [];
$(
    /*
    * 
    * Handles functionality of events driven by the mouse.
	*
	*/
    function() {
        var mouseDown = function(event) {
            var x = Math.round(event.clientX -
                canvas.getBoundingClientRect().left);
            var y = Math.round(event.clientY -
                canvas.getBoundingClientRect().top);

            selected = ballHit(x, y);
            oldx = x;
            oldy = y;

            if (selected) {
                selected.trackStart();
            }

            drawIt(context);
        };



        var mouseMove = function(event) {
            var x = Math.round(event.clientX -
                canvas.getBoundingClientRect().left);
            var y = Math.round(event.clientY -
                canvas.getBoundingClientRect().top);

            if (selected) {
                selected.trackMove(x - oldx, y - oldy);
            }
            oldx = x;
            oldy = y;

            drawIt(context);
        };

        var mouseUp = function(event) {
            var hit;


            if (selected) {
                var check = false;
                if (!check) {
                    hit = adt.hit(x, y, selected);
                    if (hit) {
                        selected.trackEnd();
                        adt.put(selected);
                        holder1.remove(selected);
                        check = true;
                    }
                }

                if (!check) {
                    hit = holder1.hit(x, y, selected);
                    if (!hit) {
                        selected.trackCancel();
                    } else {
                        holder1.put(selected);
                        check = true;
                    }
                }

            }


            selected = null;

            drawIt(context);

        };

        var mouseLeave = function(event) {
            if (selected) {
                selected.trackCancel();
            }
            selected = null;

            drawIt(context);
        };

        var ballHit = function(x, y) {
            for (i = 0; i < balls.length; i++) {
                if (balls[i].hit(x, y)) {
                    return balls[i];
                }
            }

            return null;
        };

        
		/*
         * 
         * Detects if the ball hits the input or output holder. Current code doesn't
		 * utilize check for output holder since trackCancel() is called when the 
		 * mouseup event is triggered without the ball being on the ADT or input holder
	     *
	    */
		 
        var holderHit = function(x, y) {
            if (holder1.hit(x, y)) {
                return holder1;
            } else if (holder2.hit(x, y)) {
                return holder2;
            }
        }
        /*
         * 
         * Draws all canvas elements shown on the screen. Calling this function
		 * redraws all elements.
	     *
	    */

        var drawIt = function(context) {
            var i;

            context.save();
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            if (isImage) {
                context.drawImage(imageObj, 0, 0);
            }
            scoreboard.draw(context);
            adt.draw(context);
            holder2.draw(context);
            holder1.draw(context);

            freeBalls.draw(context);
            context.restore();

        }

         /*
         * 
         * Function calls for the following button elements: put, get, peek 
		 * randomize, and shuffle.
	     *
	    */

        $("#putButton").click(function() {
            var animation;

            toAdd = holder1.hBalls[0];

            holder1.remove(toAdd);

            animation = new animate(toAdd);
            animation.start(toAdd);
        });

        var freeBalls = {
            fBalls: [],
        };

        freeBalls.add = function(obj) {
            this.fBalls.push(obj);
        };

        freeBalls.remove = function(obj) {
            if (this.fBalls.indexOf(obj) == 0) {
                this.fBalls.splice(obj, 1);
            }
        };
        freeBalls.draw = function(c) {
            for (var j = 0; j < this.fBalls.length; j++) {
                this.fBalls[j].draw(c);
            }

        }




        function animate(obj) {
            this.startX = obj.x;
            this.startY = obj.y;
            this.step = 0;
            this.object = obj;
            freeBalls.add(obj);
        };

        animate.prototype.fx = function(t) {
            var tt = 1 - t;
            return tt * tt * tt * this.startX + 3 * tt * tt * t * this.startX +
                3 * tt * t * t * 390 + t * t * t * 390
        };

        animate.prototype.fy = function(t) {
            var tt = 1 - t;
            return tt * tt * tt * this.startY + 3 * tt * tt * t * 10 +
                3 * tt * t * t * 10 + t * t * t * 220
        };

        animate.prototype.start = function() {
            var self = this;
            setTimeout(function() {
                self.animate()
            }, 50);
        };

        animate.prototype.animate = function() {
            var x, y;
            var self = this;

            this.step++;

            x = this.fx(this.step / 20);
            y = this.fy(this.step / 20);

            this.object.x = x;
            this.object.y = y;


            if (this.step < 20) {
                setTimeout(function() {
                    self.animate()
                }, 50);
                drawIt(context);
                this.object.draw(context);

            } else if (this.step >= 20) {
                freeBalls.remove(this.object);
                adt.put(this.object);
                scoreboard.increment(adt.length);
                drawIt(context);
            }

        };




        $("#getButton").click(function() {
            holder2.put(adt.get());
            scoreboard.decrement(adt.length);

            drawIt(context);

        });

      

        $("#peekButton").mousedown(function() {

            adt.peek = true;
            drawIt(context);

        });

        $("#peekButton").mouseup(function() {

            adt.peek = false;
            drawIt(context);

        });

        $("#randomize").click(function() {
            for (var i = 0; i < holder1.hBalls.length; i++) {
                holder1.hBalls[i].ballNum = Math.floor((Math.random() * 100));
                drawIt(context);
            }
        });


        $("#shuffle").click(function() {
            var ballNumbers = [];
            for (var k = 0; k < holder1.hBalls.length; k++) {
                ballNumbers[k] = holder1.hBalls[k].ballNum;
            }
            var j, x, i;
            for (i = ballNumbers.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = ballNumbers[i];
                ballNumbers[i] = ballNumbers[j];
                ballNumbers[j] = x;
            }
            for (var m = 0; m < holder1.hBalls.length; m++) {
                holder1.hBalls[m].ballNum = ballNumbers[m];
                drawIt(context);
            }

        });
		
		/*
        * 
        * Functions to toggle the viability of the balls in the ADT and the scoreboard.
	    *
	    */

        $("#checkbox-1").change(function() {
            if (this.checked) {
                scoreboard.show = true;
            } else {
                scoreboard.show = false;
            }
            drawIt(context);
        });

		
		  $("#checkbox-2").change(function() {
            if (this.checked) {
                adt.show = true;

            } else {
                adt.show = false;
            }


            drawIt(context);

        });



        /*
        * 
        * Styles the buttons, check boxes, and radio elements using jQuery UI 
	    *
	    */


        $("button").button();

        $("#adtSelection").controlgroup();

        $("#help").button({
            icon: "ui-icon-help"
        });

        $("#refresh").button({
            icon: "ui-icon-arrowrefresh-1-s"
        });

        $("input").checkboxradio();


        /*
        * 
        * Functions to toggle between the priority queue and stack state.
	    *
	    */

        var selectPriorityQueue = function(event) {

            holder1.adtChange = true;
            if ($("#priorityQueueSelect").prop("checked")) {
                adt.removeAll();

                holder1.removeAll();
                holder2.removeAll();

                scoreboard.clear();

                for (var i = 0; i < 10; i++) {
                    holder1.put(balls[i]);
                }


                adt = new PriorityQueue(360, 200, 57, 331);

                $("#putButton").text("Enqueue");
                $("#getButton").text("Dequeue");
                drawIt(context);

                holder1.adtChange = false;
            }
        }


        var selectStack = function(event) {
            holder1.adtChange = true;

            if ($("#stackSelect").prop("checked")) {
                adt.removeAll();

                holder1.removeAll();
                holder2.removeAll();

                scoreboard.clear();

                for (var i = 0; i < 10; i++) {
                    holder1.put(balls[i]);
                }


                adt = new Stack(360, 200, 57, 331);
                $("#putButton").text("Push");
                $("#getButton").text("Pop");
                drawIt(context);

                holder1.adtChange = false;
            }
        }



        /*
        * 
        * Functions for the help button and the refresh button.
	    *
	    */

        $("#help").click(function() {
            var helpBox = document.createElement("div");
            helpBox.id = "helpBox"
            document.body.appendChild(helpBox);
            $('#helpBox').dialog({
                title: "Help",
                width: 400,
                position: {
                    my: "right top",
                    at: "right bottom",
                    of: "#header"
                },
                buttons: [{
                    text: "Ok",
                    click: function() {
                        $(this).dialog("close");
                    }


                }]

            });

        });



        /*
        * 
        * Initializes/defines variables, events, arrays, objects and images. Each ball is placed
		* in a global array before being assigned to it's parent (holder1).
	    *
	    */
        
		$("#stackSelect").on("change", selectStack);

        $("#priorityQueueSelect").on("change", selectPriorityQueue);


        $("#graphCanvas").on("mousedown", mouseDown)
            .on("mousemove", mouseMove)
            .on("mouseup", mouseUp)
            .on("mouseleave", mouseLeave);

			
        var canvas = document.getElementById('graphCanvas');
        var context = canvas.getContext("2d");
        var selected = null;
        var holderHit = null;
        var oldx, oldy;

        var x = canvas.width / 12 + 45;
        var y = canvas.height / 2 + 200;
        var ballNum = 0;
        var ballID = 0;
        var toAdd, startX, startY;

    
	
        var holder1 = new Holder(x, y, 500, 80, "#BE1E2D", "h");
        var holder2 = new Holder(x + 550, y - 500, 80, 500, "#BE1E2D", "v");

        var adt = new Stack(360, 200, 57, 331);

        var scoreboard = new Scoreboard(60, 80, 70, 70, "#BE1E2D");



        for (var i = 0; i < 10; i++) {
            balls[i] = new Ball(0, 0, 20, "#FA8320", 0, 2 * Math.PI, ballNum, ballID);
            x = x + 50;
            ballNum = ballNum + 1;
            ballID = ballID + 1;
        }

        for (var i = 0; i < 10; i++) {
            holder1.put(balls[i]);
        }


        var imageObj = new Image();
        var isImage = false;

        imageObj.onload = function() {
            //context.drawImage(imageObj, 0, 0);
            isImage = true;
            drawIt(context);

        };
        imageObj.src = "hoop.png";


        drawIt(context);

    }

);