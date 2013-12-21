/*
 * author: Daniel Patterson
 *
 * A point in a 3D coordinate system where each value on an axis is represented
 * by a ConstrainableValue
 */
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Vector = require('./Vector.js').Vector

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

	this.offsetFrom = function(otherPoint, vector) {
		x.offsetByConstrainable(otherPoint.getX(), vector.getX())
		y.offsetByConstrainable(otherPoint.getY(), vector.getY())
		z.sameAs(otherPoint.getZ())
	}

	/*
	 * Creates a Vector from this Point to another Point. This does NOT remain 
	 * dependent on the coordinates of either Point, so this Vector will not 
	 * change if the Points do
	 */
	this.getCurrentVectorTo = function(otherPoint) {
		var vector = new Vector()
		var vectorX = otherPoint.getX().getValue() - x.getValue()
		var vectorY = otherPoint.getY().getValue() - y.getValue() 
		vector.fixXandY(vectorX, vectorY)
		return vector
	}

	this.toString = function() {
		return '(' + x.getValue() +', ' + y.getValue() + ', ' + z.getValue() + ')'
	}
} 