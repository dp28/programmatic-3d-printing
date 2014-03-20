Spindle = function() {};

Spindle.make = function(specification, params) {
	specification.radius = specification.radius - params.printerMinRes
  var spindle = Circle.make(specification, params);
  return spindle;
};