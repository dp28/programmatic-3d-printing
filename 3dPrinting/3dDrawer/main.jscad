include("Gear.jscad");
include("Spindle.jscad");
include("Base.jscad");
include("Specification.jscad")

function getParameterDefinitions() {
  return [
  	{ name: 'printerMinRes',
  	  type: 'float',
  	  initial: 1, 
  	  caption: "Minimum printer resolution (mm):" 
  	},
  	{
		  name: 'circleRes',
		  type: 'choice',
		  values: [4, 8, 16, 64],               
		  captions: ["Very low (impractical - for testing)", "Low", "Medium", "High (for printing)"],  
		  caption: 'Resolution of curves:',                           
		  initial: 4                            
		}
  ];
}

function main(params) {
	checkParamsAreValid(params);
	var components = [] 
	var component
	for (var i = 0; i < Specification.components.length; i++) {
		component = makeComponent(Specification.components[i], params, i)
		components.push(component)
	}
  return components;   
}

function checkParamsAreValid(params) {
	if (params.printerMinRes < 0) throw "Printer resolution must be positive"
}

function makeText(string) {
	var lines = vector_text(0,0,string);   
	var objects = [];
	lines.forEach(function(polyline) {  
		var extruded = rectangular_extrude(polyline, {w: 2, h: 2})
    extruded = extruded.setColor(0, 0, 0)  
	  objects.push(extruded);                 
	});
	return union(objects);
}

function makeComponent(componentSpec, params, n) {
	var component 
	switch(componentSpec.type) {
		case "Gear":
			component = makeGearWithHole(componentSpec, params, n)
			break
			
		case "Spindle":
			component = Spindle.makeSpindle(componentSpec, params)
			break

		case "Base":
			component = Base.makeBase(componentSpec, params)
			break
	}

  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  return component
}

function makeGearWithHole(specification, params, idNo) {
  var gear = Gear.involuteGear(specification.numTeeth,
                               specification.circularPitch,
                               specification.pressureAngle,
                               specification.clearance,
                               specification.thickness,
                               params.circleRes / 2); 
    
  if(specification.centreHoleRadius > 0) {
    var centerHole = CSG.cylinder({
    	                              start: [0, 0,-specification.thickness / 2],
    	                              end: [0, 0, specification.thickness / 2], 
    	                              radius: specification.centreHoleRadius, 
    	                              resolution: params.circleRes
    	                            });
    gear = gear.subtract(centerHole);
  }     
  var id = makeText("" + idNo);
  id = id.translate([0, 0, specification.thickness]);
  gear = union(gear, id);
  return gear;
}