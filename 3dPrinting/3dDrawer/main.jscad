include("Gear.jscad");
include("Specification.jscad")

function main() {
	var gears = [] 
	var gear
	for (var i = 0; i < Specification.gears.length; i++) {
		gear = makeGear(Specification.gears[i], 0, 0)
		gears.push(gear)
	}
  return gears;   
}

function makeGear(params, centreX, centreY) {    
  var gear = makeGearWithHole(params, centreX, centreY);
  return gear;
}

function makeGearWithHole(params, centreX, centreY) {
  var gear = Gear.involuteGear(params.numTeeth,
                               params.circularPitch,
                               params.pressureAngle,
                               params.clearance,
                               params.thickness); 
    
  if(params.centreHoleRadius > 0) {
    var centerHole = CSG.cylinder({
    	                              start: [0, 0,-params.thickness],
    	                              end: [0, 0, params.thickness], 
    	                              radius: params.centreHoleRadius, 
    	                              resolution: 16
    	                            });
    gear = gear.subtract(centerHole);
  }   
    
  gear = gear.translate([centreX, centreY, params.thickness / 2]);    
  return gear;
}