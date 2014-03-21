include("Rectangle.jscad")

Line = function() {};

Line.make = function(specification, params) {
	// defined in the same way
	return Rectangle.make(specification, params)
} 