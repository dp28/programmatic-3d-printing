include("Specification.jscad")
include("ComponentFactory.jscad")


Drawer = function() {};

Drawer.makeComponent = function(componentSpec, params) { 
	// Allows the component to be specified by its type
	var component = eval(componentSpec.type + '.make(componentSpec, params);');
  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  return component
};

Drawer.drawComponents = function(params) {
	checkParamsAreValid(params);
	var componentSpecs = Specification.components
	componentSpecs = filterByShowParameter(params.show, componentSpecs)
	var components = [] 
	var component
	for (var i = 0; i < componentSpecs.length; i++) {
		component = ComponentFactory.makeComponent(componentSpecs[i], params)
		components.push(component)
	}
  return components;   
};

function filterByShowParameter(show, componentSpecs) {
	if (show == "All") {
			return componentSpecs		
	}
	else if (show.match(/\d+/)) { // is an id
		return componentSpecs.filter(function(element) {
				return element.id == show
			})
	}
	else {
		return componentSpecs.filter(function(element) {
				return element.type == show
			})
	}
}

function checkParamsAreValid(params) {
	if (params.printerMinRes < 0) throw "Printer resolution must be positive"
};
