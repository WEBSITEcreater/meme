// Create Fruit Function
function Fruit(x, y, size, color, bad) {

 this.color = color;
 this.bad = bad;
 this.size = size;

 this.position = createVector(x,y);

 this.sliced = false;
 this.slicedTime = 0;

 this.visible = true;

 this.velocity = createVector(randomXVelocity(x), random(-7, -10));
 
}
// ===================================================
// ===================================================
// Don't worry about the code below =]
// ===================================================
// ===================================================
 
//Handles position, speed, visibility and cutting time

Fruit.prototype.update = function() {

  this.position.add(this.velocity); //creates movement

  this.velocity.x *= 0.99; // air resistance
  this.velocity.y += GRAVITY; // gravity

	this.visible = (this.position.y < height); // update visibility of ball

	if (this.sliced) {

		this.slicedTime++; // update slicing time
	}
}

// draw fruit and handle fading

Fruit.prototype.draw = function() {

	var fillColor = this.color;
  if (this.sliced) {

    if (this.bad) {
      endGame(); //if bad circle is sliced
    }
      var interp = constrain(this.slicedTime, 0, 15) / 15; 

		// assigns background color
    fillColor = lerpColor(this.color, color(224, 224, 224, 0), interp);
  }

	/* Detemines stroke of bad fruit  */
  if (this.bad) {

    stroke(168, 146, 25); //black stroke
    strokeWeight(1); //stroke weight
  } else {

    noStroke();
  }

	// draw good ellipse
  fill(fillColor);
  ellipse(this.position.x, this.position.y, this.size);
};


//Returns random fruit (good or bad)
function randomFruit() {

//randomize the position
  var x = random(width);
  var y = height;

  var size = noise(frameCount) * 20 + 20; //Randomize the size

  var bad = (random() > BAD_FRUIT_PROBABILITY);

//Change the color of bad fruits to red
  var r = (bad) ? 45 : 0;
  var g = (bad) ? 130 : noise(frameCount * 2) * 255;
  var b = (bad) ? 66 : noise(frameCount * 3) * 255;
  var a = 255;

  var col = color(r, g, b, a); // Color

  return new Fruit(x, y, size, col, bad); // returns a fruit
}


//Returns the speed to always point towards the center
function randomXVelocity(x) {

  if (x > width / 2) {

    return random(-1.5, -0.5);
  } else {

    return random(0.5, 1.5);
  }
}
