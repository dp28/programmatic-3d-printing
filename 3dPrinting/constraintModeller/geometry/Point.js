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

	this.atSameLocationAs = function(point) {
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

	this.offsetOnAxis = function(otherPoint, axis, offset) {
		var getAxis = 'get' + axis
		this[getAxis]().offsetByConstant(otherPoint[getAxis](), offset)
	}

	this.distanceToOnXYPlane = function(otherPoint) {
		var xDifference = x.getValue() - otherPoint.getX().getValue()
		var yDifference = y.getValue() - otherPoint.getY().getValue()
		return Math.sqrt(xDifference * xDifference + yDifference * yDifference)
	}
} 