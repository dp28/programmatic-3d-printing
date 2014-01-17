/*
 * author: Daniel Patterson
 *
 * A circle with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Circle = Circle

function Circle() {
	var centre
	var radius = new ConstrainableValue()
	var diameter = new ConstrainableValue()
	diameter.scaledByConstant(radius, 2)

	this.setCentre = function(point) {
		centre = point
	}

	this.getCentre = function() {
		return centre
	}

	this.setRadius = function(r) {
		radius.setValue(r)
	}

	this.getRadius = function() {
		return radius
	}

	this.getDiameter = function() {
		return diameter
	}
}

