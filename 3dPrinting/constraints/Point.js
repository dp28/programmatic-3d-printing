/*
 * author: Daniel Patterson
 *
 * A point in a 3D coordinate system where each value on an axis is represented
 * by a ConstrainableValue
 */
var ConstrainableValue = require('./ConstrainableValue.js').ConstrainableValue

module.exports.Point = Point

// Static factory methods
Point.createFixedPoint = function(x, y, z) {
	point = new Point()
	point.setX(x)
	point.setY(y)
	point.setZ(z)
	return point
}

function Point() {
	var x = new ConstrainableValue()
	var y = new ConstrainableValue()
	var z = new ConstrainableValue()

	this.setX = function(xValue) {
		x.fixValue(xValue)
	}

	this.getX = function() {
		return x
	}

	this.setY = function(yValue) {
		y.fixValue(yValue)
	}

	this.getY = function() {
		return y
	}

	this.setZ = function(zValue) {
		z.fixValue(zValue)
	}

	this.getZ = function() {
		return z
	}
} 