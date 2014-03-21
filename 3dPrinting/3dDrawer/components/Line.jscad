include("Rectangle.jscad")
include("Utils.jscad")

Line = function() {};

Line.make = function(specification, params) {
	// defined in the same way
	var line = Rectangle.make(specification, params)
  var angleInDegrees = Utils.toDegrees(specification.angleInRadians)
  return line.rotateZ(angleInDegrees)
} 