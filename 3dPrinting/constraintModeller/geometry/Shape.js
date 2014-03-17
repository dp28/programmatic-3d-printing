/*
 * author: Daniel Patterson
 *
 * A shape with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Shape = Shape

function Shape() {
	var centre = new Point()

	// setPointToOrigin(front)

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
		}
	}
}

