include("Gear.jscad");
include("Specification.jscad")

function main() {
	var params = Specification.gears[0]
  var gear = makeGear(params, 0, 0);
  return gear;   
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