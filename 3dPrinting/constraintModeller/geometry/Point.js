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
 * A point in a 3D coordinate system where each value on an axis is represented
 * by a ConstrainableValue
 */
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Point = Point

Point.getAxesNames = function() {
	return ['X', 'Y', 'Z']
}

Point.getAxesNamesWithout = function(axis) {
	var axes = Point.getAxesNames()
	return axes.filter(function(element) {
		return element != axis
	})
}

// Static factory methods
Point.createFixedPoint = function(x, y, z) {
	point = new Point()
	point.fixAt(x, y, z)
	return point
}

Point.createPoint = function() {
	return new Point()
}

function Point() {
	var x = new ConstrainableValue()
	var y = new ConstrainableValue()
	var z = new ConstrainableValue()

	this.isAtSameLocationAs = function(point) {
		return (x.getValue() == point.getX().getValue() 
			     && y.getValue() == point.getY().getValue()
			     && z.getValue() == point.getZ().getValue())
	}

	this.fixX = function(xValue) {
		x.fixValue(xValue)
	}

	this.getX = function() {
		return x
	}

	this.fixY = function(yValue) {
		y.fixValue(yValue)
	}

	this.getY = function() {
		return y
	}

	this.fixZ = function(zValue) {
		z.fixValue(zValue)
	}

	this.getZ = function() {
		return z
	}

	this.fixAt = function(xValue, yValue, zValue) {
		this.fixX(xValue)
		this.fixY(yValue)
		this.fixZ(zValue)		
	}

	this.setAt = function(xValue, yValue, zValue) {
		x.setValue(xValue)
		y.setValue(yValue)
		z.setValue(zValue)
	}

	// Offsets one Point from another by a set of offests, one for each of the x, 
	// y and z components of this Point.
	this.offsetFrom = function(otherPoint, offsets) {
		x.offsetByConstant(otherPoint.getX(), offsets[0])
		y.offsetByConstant(otherPoint.getY(), offsets[1])
		z.offsetByConstant(otherPoint.getZ(), offsets[2])
	}

	this.toString = function() {
		return '(' + x.getValue() +', ' + y.getValue() + ', ' + z.getValue() + ')'
	}

	this.isNotFullyDefined = function() {
		return !this.isFullyDefined()
	}

	this.isFullyDefined = function() {
		return x.isSet() && y.isSet() && z.isSet()
	}
	
	this.samePointOnAxes = function(otherPoint, axes) {
		for (var i = 0; i < axes.length; i++) {
			var getAxis = 'get' + axes[i]
			this[getAxis]().sameAs(otherPoint[getAxis]())
		}
	}

	this.sameAs = function(otherPoint) {
		this.samePointOnAxes(otherPoint, Point.getAxesNames())
	}

	this.offsetOnAxis = function(otherPoint, axis, offset) {
		var getAxis = 'get' + axis
		this[getAxis]().offsetByConstant(otherPoint[getAxis](), offset)
	}

	this.distanceToOnXYPlane = function(otherPoint) {
		var xDifference = x.getValue() - otherPoint.getX().getValue()
		var yDifference = y.getValue() - otherPoint.getY().getValue()
		return Math.sqrt(xDifference * xDifference + yDifference * yDifference)
	}

	this.distanceToOnAxis = function(otherPoint, axis) {
		var getAxis = 'get' + axis
		var xDifference = Math.abs(this[getAxis]().getValue() - otherPoint[getAxis]().getValue())
		if (this[getAxis]().getValue() > otherPoint[getAxis]().getValue())
			xDifference = -xDifference
		return xDifference
	}

	this.differOnlyOnAxis = function(otherPoint, axis) {
		var getAxis = 'get' + axis
		var result = this[getAxis]().getValue() != otherPoint[getAxis]().getValue()
		var axes = Point.getAxesNamesWithout(axis)
		for (var i = axes.length - 1; i >= 0; i--) {
			getAxis = 'get' + axes[i]
			result = result 
			         && this[getAxis]().getValue() == otherPoint[getAxis]().getValue()
		}

		return result
	}
} 