include("Gear.jscad");
include("Spindle.jscad");
include("Line.jscad")
include("Circle.jscad");
include("Base.jscad");


ComponentFactory = function() {};

ComponentFactory.makeComponent = function(componentSpec, params) { 
	// Allows the component to be specified by its type
	var component = eval(componentSpec.type + '.make(componentSpec, params);');
  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ]);  
  return component
};