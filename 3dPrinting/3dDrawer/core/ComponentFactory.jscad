/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

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