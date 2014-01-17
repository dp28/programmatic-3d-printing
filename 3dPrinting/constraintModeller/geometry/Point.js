/*
 * author: Daniel Patterson
 *
 * A point in a 3D coordinate system where each value on an axis is represented
 * by a ConstrainableValue
 */
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Point = Point

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
} 