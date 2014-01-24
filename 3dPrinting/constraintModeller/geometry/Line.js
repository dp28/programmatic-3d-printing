/*
 * author: Daniel Patterson
 *
 * A 2D line built from two Points with a width.
 */
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Line = Line

function Line(point1, point2) {
	if (!(point1 instanceof Point) || !(point2 instanceof Point))
		throw new Error("Two Points required")
	var start = point1
	var end = point2
	var xDifference = end.getX().getValue() - start.getX().getValue()
	var yDifference = end.getY().getValue() - start.getY().getValue()
	var centre = new Point()
	centre.setAt(xDifference / 2, yDifference / 2, 0)

	this.getCentre = function() {
		return centre
	}

	this.getLength = function() {
		return Math.sqrt(xDifference * xDifference + yDifference * yDifference) 
	}

	this.getAngleInRadians = function() {
		return Math.atan2(yDifference, xDifference)
	}
}