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

include("Rectangle.jscad")
include("GearUtilities.jscad")

RackSupport = function() {}

RackSupport.make = function(specification, params) {
	var wall = makeWall(specification, params)
	var base = makeBase(specification, params)
	base = union(wall, base)
	return base.rotateZ(180)
};

function makeBase(specification, params) {	
	var baseSpec = new Object();
	baseSpec.length = specification.length
	baseSpec.width = specification.width
	baseSpec.height = specification.baseHeight
	var base = Rectangle.make(baseSpec, params)
	base = GearUtilities.rotateToFace(base, specification.toothedFace)
	return base.translate([0, 0, -specification.wallHeight / 2])
}

function makeWall(specification, params) {
	var wallSpec = new Object()
	wallSpec.length = specification.length
	wallSpec.width = specification.wallWidth
	wallSpec.height = specification.wallHeight
	var wall = Rectangle.make(wallSpec, params)
	wall = GearUtilities.rotateToFace(wall, specification.toothedFace)
	return wall.translate([specification.wallCentreX,
												 specification.wallCentreY,
												 specification.wallCentreZ])
}