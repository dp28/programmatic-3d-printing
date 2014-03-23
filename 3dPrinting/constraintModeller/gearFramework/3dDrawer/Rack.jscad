include("GearUtilities.jscad")
include("Rectangle.jscad")

Rack = function() {}

Rack.colour = [1, 0, 0]
const clearance = 1

Rack.make = function(spec, params) {
	var addendum = spec.linearPitch / Math.PI;
	var bar = makeBar(spec, params, addendum)
	var teeth = makeTeeth(spec, params)
	teeth = teeth.rotateZ(-90)
	teeth = teeth.translate([-spec.length / 2 + spec.linearPitch / 4, spec.width + addendum * 2, 0])
	var rack = union(teeth, bar)
	return GearUtilities.rotateToFace(rack, spec.toothedFace)
};

function makeBar(spec, params, addendum) {
	spec.width -= (3 * addendum + params.printerMinRes + clearance)
	var bar = Rectangle.make(spec, params)
	return bar.translate([0, (addendum - params.printerMinRes * params.printerMinRes + clearance) / 2, 0])
}

function makeTeeth(spec, params) {
	var teeth = makeSingleTooth(spec, params)
	var tooth
	for (var i = spec.numTeeth - 1; i >= 0; i--) {
		tooth = makeSingleTooth(spec, params, clearance)
		tooth = tooth.translate([0, i * spec.linearPitch, 0])
		teeth = union(teeth, tooth)
	};

	return teeth
}

function makeSingleTooth(spec, params) {
	var tooth = GearUtilities.makeTooth(spec.numTeeth,
																			spec.linearPitch,
																			spec.pressureAngle,
																			clearance,
																			spec.height,
																			params.circleRes / 2)

	tooth = tooth.rotateZ(-90/spec.numTeeth) 
	tooth = tooth.translate([0, 0, -spec.height / 2])
	var addendum = spec.linearPitch / Math.PI;  
  var pitchRadius = spec.numTeeth * spec.linearPitch / (2 * Math.PI);
  var baseRadius = pitchRadius * Math.cos(Math.PI * spec.pressureAngle / 180);
  var cutSize = baseRadius - (addendum + clearance * 2)
  var cube = CSG.cube({
							          center: [0, 0, 0],
							          radius: [cutSize, cutSize,cutSize]
  									  })
  return tooth.subtract(cube)
}