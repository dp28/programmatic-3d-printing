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
	var right = new Point()
	var left = new Point()
	var front = new Point()
	var back = new Point()

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

		getRightPoint: function() {
			return right
		},

		getLeftPoint: function() {
			return left
		},

		getBackPoint: function() {
			return back
		},

		getFrontPoint: function() {
			return front
		}
	}
}

