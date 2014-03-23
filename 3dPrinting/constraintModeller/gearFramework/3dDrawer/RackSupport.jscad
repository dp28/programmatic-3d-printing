include("Rectangle.jscad")
include("GearUtilities.jscad")

RackSupport = function() {}

RackSupport.make = function(specification, params) {
	var wall = makeWall(specification, params)
	var base = makeBase(specification, params)
	base = union(wall, base)
	return base.rotateZ(180)
};

function makeBase(specification, params) {	
	var baseSpec = new Object();
	baseSpec.length = specification.length
	baseSpec.width = specification.width
	baseSpec.height = specification.baseHeight
	var base = Rectangle.make(baseSpec, params)
	base = GearUtilities.rotateToFace(base, specification.toothedFace)
	return base.translate([0, 0, -specification.wallHeight / 2 -baseSpec.height / 2])
}

function makeWall(specification, params) {
	var wallSpec = new Object()
	wallSpec.length = specification.length
	wallSpec.width = specification.wallWidth
	wallSpec.height = specification.wallHeight
	var wall = Rectangle.make(wallSpec, params)
	wall = GearUtilities.rotateToFace(wall, specification.toothedFace)
	return wall.translate([specification.wallCentreX,
												 specification.wallCentreY,
												 specification.wallCentreZ])
}