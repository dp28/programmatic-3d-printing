include("Utils.jscad");

Spindle = function() {};

Spindle.makeSpindle = function(specification, params) {
	var radius = specification.radius - params.printerMinRes
  var spindle = Utils.makeCylinder(radius, specification.height, params.circleRes);
  spindle = spindle.setColor(0.8, 0.8, 0.8);
  return spindle;
};