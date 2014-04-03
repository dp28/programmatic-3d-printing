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
 * A circle with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point
var Shape = require('../geometry/Shape.js').Shape
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var CircleSpecification = require('../interface/CircleSpecification.js').CircleSpecification
var Utilities = require('../Utilities.js')

module.exports.Circle = Circle

function Circle() {
	var circle = Shape()
	var radius = new ConstrainableValue() 
	var diameter = new ConstrainableValue()
	diameter.scaledByConstant(radius, 2)   

	circle.getType = function() {
		return 'Circle'
	}  

	circle.setRadius = function(r) {
		radius.setValue(r)
	}

	circle.getRadius = function() {
		return radius
	}

	circle.getDiameter = function() {
		return diameter
	}

	circle.toSpecification = function() {
		checkCanGenerateSpecification()
		return new CircleSpecification(circle)
	}

	var checkCanGenerateSpecification = function() {		
		if (radius.isNotSet()) throw new Error("Radius not set")
		if (circle.getCentre().isNotFullyDefined()) throw new Error("Centre not fully defined")
	}

	circle.getDistanceToRightBoundary = function() {
		return new Number(radius.getValue())
	}

	circle.getDistanceToLeftBoundary = function() {
		return (0 - new Number(radius.getValue()))
	}

	circle.getDistanceToBackBoundary = function() {
		return (0 - new Number(radius.getValue()))
	}

	circle.getDistanceToFrontBoundary = function() {
		return new Number(radius.getValue())
	}

	return circle
}

