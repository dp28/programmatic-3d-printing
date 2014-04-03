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
 * A rectangle with constrainable parameters which cannot be rotated. 
 */
var Point = require('../geometry/Point.js').Point
var Shape = require('../geometry/Shape.js').Shape
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var RectangleSpecification = require('../interface/RectangleSpecification.js').RectangleSpecification

module.exports.Rectangle = Rectangle

function Rectangle() {
	const DEFAULT_WIDTH = 0
	var rectangle = new Shape()
	var width = new ConstrainableValue()
	var length = new ConstrainableValue()

	width.setValue(DEFAULT_WIDTH)

	rectangle.getType = function() {
		return "Rectangle"
	}

	rectangle.getWidth = function() {
		return width
	}

	rectangle.setWidth = function(w) {
		width.setValue(w)
	}

	rectangle.getLength = function() {
		return length
	}

	rectangle.setLength = function(len) {
		length.setValue(len)
	}

	rectangle.getDistanceToRightBoundary = function() {
		return length.getValue() / 2
	}

	rectangle.getDistanceToLeftBoundary = function() {
		return -length.getValue() / 2
	}

	rectangle.getDistanceToFrontBoundary = function() {
		return width.getValue() / 2
	}

	rectangle.getDistanceToBackBoundary = function() {
		return -width.getValue() / 2
	}

	rectangle.toSpecification = function() {
		checkCanGenerateSpecification()
		return new RectangleSpecification(this)
	}

	var checkCanGenerateSpecification = function() {
		if (rectangle.getCentre().isNotFullyDefined()) throw new Error("Centre not fully defined")
		if (length.isNotSet()) throw new Error("Length not set")
		if (width.isNotSet()) throw new Error("Width not set")
	}

	return rectangle
}