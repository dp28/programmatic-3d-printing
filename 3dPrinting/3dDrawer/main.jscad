include("Gear.jscad");
include("Spindle.jscad");
include("Specification.jscad")

function main() {
	var components = [] 
	var component
	for (var i = 0; i < Specification.components.length; i++) {
		component = makeComponent(Specification.components[i])
		components.push(component)
	}
  return components;   
}

function makeComponent(componentSpec) {
	var component 
	switch(componentSpec.type) {
		case "Gear":
			component = makeGear(componentSpec)
			break
			
		case "Spindle":
			component = makeSpindle(componentSpec)
			break
	}
	
  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  return component
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
  return gear;
}

function makeSpindle(params) {
	var spindle = Spindle.makeSpindle(params)
	return spindle
}