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
 * A representation of a spindle for an involute gear
 */
var Component = require('../../components/Component.js').Component
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var SpindleSpecification = require('../interface/SpindleSpecification.js').SpindleSpecification
var Circle = require('../../geometry/Circle.js').Circle

module.exports.Spindle = Spindle

function Spindle() {
	var spindle = Component(Circle)
	var height = new ConstrainableValue()

	spindle.getHeight = function() {
		return height
	}

	spindle.getTypeName = function() {
		return "Spindle"
	}

	spindle.setHeight = function(h) {
		height.setValue(h)
	}

	spindle.getRadius = function() {
		return spindle.getBoundingShape().getRadius()
	}

	spindle.setRadius = function(radius) {
		spindle.getBoundingShape().setRadius(radius)
	}

	spindle.toSpecification = function() {
		checkFullySpecified()
		return new SpindleSpecification(spindle)
	}

	var checkFullySpecified = function() {
		if (height.isNotSet()) throw new Error("Height not set")
		if (spindle.getRadius().isNotSet()) throw new Error("Radius not set")
	}

	return spindle
}