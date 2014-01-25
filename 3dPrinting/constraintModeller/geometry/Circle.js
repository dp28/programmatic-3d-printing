/*
 * author: Daniel Patterson
 *
 * A circle with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var CircleSpecification = require('../interface/CircleSpecification.js').CircleSpecification

module.exports.Circle = Circle

function Circle() {
	var centre = new Point()
	var radius = new ConstrainableValue() 
	var diameter = new ConstrainableValue()
	diameter.scaledByConstant(radius, 2)     

	this.setCentre = function(point) {
		centre = new Point()
		centre.getX().setValue(point.getX().getValue())
		centre.getY().setValue(point.getY().getValue())
		centre.getZ().setValue(point.getZ().getValue())
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

	this.toSpecification = function() {
		checkCanGenerateSpecification()
		return new CircleSpecification(centre, radius)
	}

	var checkCanGenerateSpecification = function() {		
		if (radius.isNotSet()) throw new Error("Radius not set")
		if (centre.isNotFullyDefined()) throw new Error("Centre not fully defined")
	}
}

