include("GearUtilities.jscad")
include("Rectangle.jscad")

Rack = function() {}

Rack.colour = [1, 0, 0]

Rack.make = function(spec, params) {
	var addendum = spec.linearPitch / Math.PI;
	var teeth = makeTeeth(spec, params)
	var bar = makeBar(spec, params, addendum)
	teeth = teeth.rotateZ(-90)
	teeth = teeth.translate([-spec.length / 2 + spec.linearPitch / 4, spec.width + addendum * 2, 0])
	var rack = union(teeth, bar)
	return rack
};

function makeBar(spec, params, addendum) {
	spec.width -= (3 * addendum + params.printerMinRes)
	var bar = Rectangle.make(spec, params)
	return bar.translate([0, (addendum/2) - params.printerMinRes / 2, 0])
}

function makeTeeth(spec, params) {
	var teeth = makeSingleTooth(spec, params)
	var tooth
	for (var i = spec.numTeeth - 1; i >= 0; i--) {
		tooth = makeSingleTooth(spec, params)
		tooth = tooth.translate([0, i * spec.linearPitch, 0])
		teeth = union(teeth, tooth)
	};

	return teeth
}

function makeSingleTooth(spec, params) {
	var tooth = GearUtilities.makeTooth(spec.numTeeth,
																			spec.linearPitch,
																			spec.pressureAngle,
																			0,
																			spec.height,
																			params.circleRes / 2)

	tooth = tooth.rotateZ(-90/spec.numTeeth) 
	tooth = tooth.translate([0, 0, -spec.height / 2])
	var addendum = spec.linearPitch / Math.PI;  
  var pitchRadius = spec.numTeeth * spec.linearPitch / (2 * Math.PI);
  var baseRadius = pitchRadius * Math.cos(Math.PI * spec.pressureAngle / 180);
  var cube = CSG.cube({
							          center: [0, 0, 0],
							          radius: [baseRadius - addendum, 
							                   baseRadius - addendum,
							                   baseRadius - addendum]
  									  })
  return tooth.subtract(cube)
}