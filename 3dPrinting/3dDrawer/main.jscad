include("Gear.jscad");
include("Specification.jscad")

function main() {
	var gears = [] 
	var gear
	for (var i = 0; i < Specification.components.length; i++) {
		if(Specification.components[i].type == "Gear") {
			gear = makeGear(Specification.components[i])
			gears.push(gear)
		}
	}
  return gears;   
}

function makeGear(params) {    
  var gear = makeGearWithHole(params);
  return gear;
}

function makeGearWithHole(params) {
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
    
  gear = gear.translate([params.centreX, params.centreY, params.centreZ]);    
  return gear;
}