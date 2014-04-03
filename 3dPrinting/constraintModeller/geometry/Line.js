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
 * A 3D line built from two Points with a width.
 */
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var LineSpecification = require('../interface/LineSpecification.js').LineSpecification

module.exports.Line = Line

function Line(point1, point2) {
	if (!(point1 instanceof Point) || !(point2 instanceof Point))
		throw new Error("Two Points required")
	var start = point1
	var end = point2

	var startX = start.getX().getValue()
	var endX = end.getX().getValue()
	var startY = start.getY().getValue()
	var endY = end.getY().getValue()
	var startZ = start.getZ().getValue()
	var endZ = end.getZ().getValue()

	var xDifference = endX - startX
	var yDifference = endY - startY
	var zDifference = endZ - startZ

	var centre = new Point()
	const DEFAULT_WIDTH = 4
	var width = DEFAULT_WIDTH
	centre.setAt(startX + xDifference / 2,
	             startY + yDifference / 2,
	             startZ + zDifference / 2)

	this.getCentre = function() {
		return centre
	}

	this.getStart = function() {
		return start
	}

	this.getEnd = function() {
		return end
	}

	this.getWidth = function() {
		return width
	}

	this.setWidth = function(w) {
		width = w
	}

	this.getLength = function() {
		return Math.sqrt(xDifference * xDifference 
			              + yDifference * yDifference
			              + zDifference * zDifference) 
	}

	this.getAngleInRadians = function() {
		return Math.atan2(yDifference, xDifference)
	}

	this.toSpecification = function() {
		return new LineSpecification(this)
	}
}