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
		},
  	{
		  name: 'showID',
		  type: 'choice',
		  values: ["No", "Yes"],   // Booleans don't work
		  caption: 'Show Gear IDs:',                           
		  initial: "No"                            
		}
  ];
}

function main(params) {
	checkParamsAreValid(params);
	var components = [] 
	var component
	for (var i = 0; i < Specification.components.length; i++) {
		component = makeComponent(Specification.components[i], params)
		components.push(component)
	}
  return components;   
}

function checkParamsAreValid(params) {
	if (params.printerMinRes < 0) throw "Printer resolution must be positive"
}

function makeComponent(componentSpec, params) {
	var component 
	switch(componentSpec.type) {
		case "Gear":
			component = Gear.makeGear(componentSpec, params)
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