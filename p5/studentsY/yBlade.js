//blade function here
function Blade(color) {
  this.swipes = [];
  this.color = color;
  
}







// ==============================================================
// ==============================================================
// Don't worry about the code below =]
// ==============================================================
// ==============================================================

Blade.prototype.update = function() {
// fading of movementstion() {

  /* Vanish the Strike */
  if (this.swipes.length > BLADE_SIZE) { // Remove each two frames

    this.swipes.splice(0, 1);
    this.swipes.splice(0, 1);
  } else if (this.swipes.length > 0) {

    this.swipes.splice(0, 1); // Remove last value
  }
};

// Test if the last fruit is cut by the stroke of the sword
Blade.prototype.checkForSlice = function(fruit) {

  if (fruit.sliced || this.swipes.length < 2)
    return false;
    
    var length = this.swipes.length; // Length of sword

	var stroke1 = this.swipes[length - 1];
	var stroke2 = this.swipes[length - 2];

	/* Distance of fruit 1 and 2 */
    var d1 = dist(stroke1.x, stroke1.y, fruit.position.x, fruit.position.y);
    var d2 = dist(stroke2.x, stroke2.y, fruit.position.x, fruit.position.y);

	/* distance of stroke 1 and 2 */
    var d3 = dist(stroke1.x, stroke1.y, stroke2.x, stroke2.y);

    var sliced = d1 < fruit.size || 			                       // if stoke falls directly on fruit
        ((d1 < d3 && d2 < d3) && 	           //if fruit falls between stroke 1 and stroke 2
         (d3 < BLADE_LENGTH));			       // if there is a new stroke, don't connect the two

    fruit.sliced = sliced; // update sliced property of fruit

    return sliced;
};

//Draw the sword
Blade.prototype.draw = function() {

  var length = this.swipes.length;

  for (var i = 0; i < length; i++) {

    var s = map(i, 0, length, 10, 100);

    noStroke();
    fill(this.color);
    ellipse(this.swipes[i].x, this.swipes[i].y, s);
  }

};

// swing of the sword
Blade.prototype.swing = function(x, y) {

  this.swipes.push(createVector(x, y));
};
