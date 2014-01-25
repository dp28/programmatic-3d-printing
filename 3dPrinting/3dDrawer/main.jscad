include("Gear.jscad");
include("Spindle.jscad");
include("Base.jscad");
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
			component = makeGearWithHole(componentSpec)
			break
			
		case "Spindle":
			component = Spindle.makeSpindle(componentSpec)
			break

		case "Base":
			component = Base.makeBase(componentSpec)
			break
	}

  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  return component
}

function makeGearWithHole(params) {
  var gear = Gear.involuteGear(params.numTeeth,
                               params.circularPitch,
                               params.pressureAngle,
                               params.clearance,
                               params.thickness); 
    
  if(params.centreHoleRadius > 0) {
    var centerHole = CSG.cylinder({
    	                              start: [0, 0,-params.thickness / 2],
    	                              end: [0, 0, params.thickness / 2], 
    	                              radius: params.centreHoleRadius, 
    	                              resolution: 16
    	                            });
    gear = gear.subtract(centerHole);
  }     
  return gear;
}