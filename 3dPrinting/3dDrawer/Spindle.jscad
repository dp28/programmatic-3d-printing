Spindle = function() {};

Spindle.make = function(specification, params) {
	specification.radius = specification.radius - params.printerMinRes
  var spindle = Circle.make(specification, params);
  spindle = spindle.setColor(0.8, 0.8, 0.8);
  return spindle;
};