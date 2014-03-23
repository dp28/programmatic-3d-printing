include("Rectangle.jscad")
include("GearUtilities.jscad")

RackSupport = function() {}

RackSupport.make = function(specification, params) {
	var base = union(makeWall(specification, params), 
		               makeBase(specification, params))
	return GearUtilities.rotateToFace(base, specification.toothedFace)
};

function makeBase(specification, params) {	
	var baseSpec = new Object();
	baseSpec.length = specification.length
	baseSpec.width = specification.width
	baseSpec.height = specification.baseHeight
	var base = Rectangle.make(baseSpec, params)
	return base.translate([0, 0, -specification.wallHeight / 2 -baseSpec.height / 2])
}

function makeWall(specification, params) {
	var wallSpec = new Object()
	wallSpec.length = specification.length
	wallSpec.width = specification.wallWidth
	wallSpec.height = specification.wallHeight
	var wall = Rectangle.make(wallSpec, params)
	return wall.translate([specification.wallCentreX,
												 specification.wallCentreY,
												 specification.wallCentreZ])
}