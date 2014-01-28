include("Gear.jscad");
include("Spindle.jscad");
include("Base.jscad");
include("Specification.jscad")

Drawer = function() {};

Drawer.drawComponents = function(params) {
	checkParamsAreValid(params);
	var componentSpecs = Specification.components
	componentSpecs = filterByShowParameter(params.show, componentSpecs)
	var components = [] 
	var component
	for (var i = 0; i < componentSpecs.length; i++) {
		component = makeComponent(componentSpecs[i], params)
		components.push(component)
	}
  return components;   
};

function filterByShowParameter(show, componentSpecs) {
	switch(show) {
		case "All":
			return componentSpecs

		case "Gears only":
			return componentSpecs.filter(function(element) {
				return element.type == "Gear"
			})

		case "Base only":
			return componentSpecs.filter(function(element) {
				return element.type != "Gear"
			})

		default:
			return componentSpecs.filter(function(element) {
				return element.type == "Gear" && element.id == show
			})
	}
}

function checkParamsAreValid(params) {
	if (params.printerMinRes < 0) throw "Printer resolution must be positive"
};

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
};