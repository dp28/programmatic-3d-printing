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
 * A representation of a Base for a GearTrain
 */
var Component = require('../../components/Component.js').Component
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var Circle = require('../../geometry/Circle.js').Circle
var Line = require('../../geometry/Line.js').Line


module.exports.Base = Base

function Base() {
	var base = Component(Circle) 
	var height = new ConstrainableValue()
	var parts = []

	base.getParts = function() {
		return parts
	}

	base.getCircles = function() {
		return parts.filter(function(element) {
			return element.getType != undefined && element.getType() == 'Circle'
		})
	}

	base.getLines = function() {
		return parts.filter(function(element) {
			return element instanceof Line
		})
	}

	base.addPart = function(part) {
		parts.push(part)
	}

	base.getTypeName = function() {
		return "Base"
	}

	base.getHeight = function() {
		return height
	}

	base.setHeight = function(h) {
		height.setValue(h)
	}

	base.getRadius = function() {
		return base.getBoundingShape().getRadius()
	}

	base.setRadius = function(r) {
		base.getBoundingShape().getRadius().setValue(r)
	}

	var checkCanGenerateSpecification = function(base) {
		if (height.isNotSet()) 
			throw new Error("Height not set")
	}

	base.toSpecification = function() {
		checkCanGenerateSpecification(base)
		return new BaseSpecification(base)
	}

	return base
}