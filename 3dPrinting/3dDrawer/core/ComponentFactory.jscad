ComponentFactory = function() {};

const DEFAULT_COLOUR = [0.5, 0.5, 0.5]

ComponentFactory.makeComponent = function(componentSpec, params) { 
	var componentType = componentSpec.type 
	// Allows the component to be specified by its type
	var component = eval(componentType + '.make(componentSpec, params);');
  if (componentSpec.id != undefined)
  	component = addID(component, componentSpec, params)
  component = component.translate([componentSpec.centreX,
  																 componentSpec.centreY,
  																 componentSpec.centreZ ]);  
  component = addColour(component, componentType)
  return component
};

function addColour(component, type) {
	var colour = eval(type + '.colour')
	if (colour == undefined)
		colour = DEFAULT_COLOUR
	return component.setColor(colour)
}

function addID(component, specification, params) {	
  if (params.showID == 'Yes') {
    var id = makeText("" + specification.id);
    id = id.translate([0, 0, specification.height]);
    component = union(component, id);
  }
  return component
};

function makeText(string) {
	var lines = vector_text(0,0,string);   
	var objects = [];
	lines.forEach(function(polyline) {  
		var extruded = rectangular_extrude(polyline, {w: 2, h: 2})
	  objects.push(extruded);                 
	});
	return union(objects);
};