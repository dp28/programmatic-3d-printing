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

/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for RackSupports
 */
var ComponentSpecification = require('../../interface/ComponentSpecification.js').ComponentSpecification

module.exports.RackSupportSpecification = RackSupportSpecification

function RackSupportSpecification(support) {
	var spec = new ComponentSpecification(support)
	var wallCentre = support.getWallCentre()
	spec.length = support.getLength().getValue()
	spec.width = support.getWidth().getValue()
	spec.wallHeight = support.getWallHeight().getValue()
	spec.baseHeight = support.getBaseHeight().getValue()
	spec.wallWidth = support.getWallWidth().getValue()
	spec.wallCentreX = wallCentre.getX().getValue()
	spec.wallCentreY = wallCentre.getY().getValue()
	spec.wallCentreZ = wallCentre.getZ().getValue()
	spec.toothedFace = support.getToothedFace()
	return spec
}