/*
 * author: Daniel Patterson
 *
 * A rectangle. 
 */
var Point = require('../geometry/Point.js').Point
var Shape = require('../geometry/Shape.js').Shape
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var RectangleSpecification = require('../interface/RectangleSpecification.js').RectangleSpecification

module.exports.Rectangle = Rectangle

Rectangle.createFromPoints = function(start, end) {
	if (!(start instanceof Point) || !(end instanceof Point))
		throw new Error("Two Points required")

	const DEFAULT_WIDTH = 1

	var rectangle = new Rectangle()

				var util = require('util')
				util.puts(JSON.stringify(rectangle))
	var startX = start.getX().getValue()
	var endX = end.getX().getValue()
	var startY = start.getY().getValue()
	var endY = end.getY().getValue()
	var startZ = start.getZ().getValue()
	var endZ = end.getZ().getValue()

	var xDifference = endX - startX
	var yDifference = endY - startY
	var zDifference = endZ - startZ

	var length = Math.sqrt(xDifference * xDifference 
					               + yDifference * yDifference
					               + zDifference * zDifference)

	var angle = Math.atan2(yDifference, xDifference)

	var centre = new Point()
	centre.setAt(startX + xDifference / 2,
	             startY + yDifference / 2,
	             startZ + zDifference / 2)
	rectangle.setLength(length)
	rectangle.setCentre(centre)
	rectangle.setWidth(DEFAULT_WIDTH)
	rectangle.setAngleInRadians(angle)

				var util = require('util')
				util.puts(JSON.stringify(rectangle))
	return rectangle
}

function Rectangle() {
	const DEFAULT_WIDTH = 0
	const DEFAULT_ANGLE = 0

	var rectangle = new Shape()
	var width = new ConstrainableValue()
	var length = new ConstrainableValue()
	var angleInRadians = new ConstrainableValue()

	width.setValue(DEFAULT_WIDTH)
	angleInRadians.setValue(DEFAULT_ANGLE)

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

	rectangle.getAngleInRadians = function() {
		return angleInRadians
	}

	rectangle.setAngleInRadians = function(angle) {
		angleInRadians.setValue(angle)
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
		if (angleInRadians.isNotSet()) throw new Error("Angle not set")
		if (rectangle.getCentre().isNotFullyDefined()) throw new Error("Centre not fully defined")
		if (length.isNotSet()) throw new Error("Length not set")
		if (width.isNotSet()) throw new Error("Width not set")
	}

	return rectangle
}