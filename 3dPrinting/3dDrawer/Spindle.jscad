include("Utils.jscad");

Spindle = function() {};

Spindle.makeSpindle = function(specification) {
  var spindle = Utils.makeCylinder(specification.radius, specification.height);
  spindle = spindle.setColor(0.8, 0.8, 0.8);
  return spindle;
};