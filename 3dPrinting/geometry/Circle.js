/*
 * author: Daniel Patterson
 *
 * A circle with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point

module.exports.Circle = Circle

function Circle() {
	var centre, radius

	this.setCentre = function(point) {
		centre = point
	}

	this.getCentre = function() {
		return centre
	}

	this.setRadius = function(r) {
		radius = r
	}

	this.getRadius = function() {
		return radius
	}
}

