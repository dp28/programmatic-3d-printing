include("Gear.jscad");
include("Spindle.jscad");
include("Line.jscad")
include("Circle.jscad");
include("Base.jscad");
 

ComponentFactory = function() {};

const DEFAULT_COLOUR = [0.5, 0.5, 0.5]

ComponentFactory.makeComponent = function(componentSpec, params) { 
	var componentType = componentSpec.type 
	// Allows the component to be specified by its type
	var component = eval(componentType + '.make(componentSpec, params);');
  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  component = addColour(component, componentType)
  return component
};

function addColour(component, type) {
	var colour = eval(type + '.colour')
	if (colour == undefined)
		colour = DEFAULT_COLOUR
	return component.setColor(colour)
}