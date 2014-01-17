/*
 * author: Daniel Patterson
 *
 * The base class for all components.
 */
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle

module.exports.Component = Component

function Component() {
	var centre = new Point()
	var boundingCircle = new Circle()

	this.getBoundingCircle = function() {
		return boundingCircle
	}

}