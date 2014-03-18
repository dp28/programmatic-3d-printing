/*
 * author: Daniel Patterson
 *
 * A shape with constrainable properties.
 */
var util = require('util')
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Utilities = require('../Utilities.js')

module.exports.Shape = Shape

function Shape() {
	var centre = new Point()

	return {  
		setCentre: function(point) {
			centre = new Point()
			centre.getX().setValue(point.getX().getValue())
			centre.getY().setValue(point.getY().getValue())
			centre.getZ().setValue(point.getZ().getValue())
		},

		getCentre: function() {
			return centre
		},

		getType: function() {
			return 'Shape'
		},

		getDistanceToRightBoundary: function() {
			throw new Error("getDistanceToRightBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToLeftBoundary: function() {
			throw new Error("getDistanceToLeftBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToBackBoundary: function() {
			throw new Error("getDistanceToBackBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToFrontBoundary: function() {
			throw new Error("getDistanceToFrontBoundary() not implemented in Shape " +
				              "base class")
		},

		isTouching: function(otherShape) {
			return checkIfTwoCirclesIntersect(this, otherShape)
		},

		isAdjacentTo: function(otherShape){
			var yAxisBoundaryDistance = this.getDistanceToFrontBoundary() - 
			                            otherShape.getDistanceToBackBoundary()
			var xAxisBoundaryDistance = this.getDistanceToLeftBoundary() - 
			                            otherShape.getDistanceToRightBoundary()
			return this.isAdjacentOnAxis(otherShape, 'X', xAxisBoundaryDistance)
			       || this.isAdjacentOnAxis(otherShape, 'Y', yAxisBoundaryDistance)

		},

		isAdjacentOnAxis: function(otherShape, axis, distanceToBoundaries) {
			var centre = this.getCentre()
			var otherCentre = otherShape.getCentre()
			var distanceBetween = centre.distanceToOnAxis(otherCentre, axis)
			var differOnlyOnAxis = centre.differOnlyOnAxis(otherCentre, axis)
			var adjacentOnAxis = Utilities.approximatelyEqual(distanceBetween, distanceToBoundaries, 0.001)
			return adjacentOnAxis && differOnlyOnAxis
		}
	}
}

function checkIfTwoCirclesIntersect(firstCircle, secondCircle) {
	var firstRadius = firstCircle.getRadius().getValue()
	var secondRadius = secondCircle.getRadius().getValue()
	var distanceBetween = firstCircle.getCentre().distanceToOnXYPlane(secondCircle.getCentre())
	return distanceBetween < (firstRadius + secondRadius)
}

