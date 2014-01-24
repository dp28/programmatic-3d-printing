include("Utils.jscad");

Base = function() {};

Base.makeBase = function(specification) {
  var base = Utils.makeCylinder(specification.radius, specification.height);
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
};