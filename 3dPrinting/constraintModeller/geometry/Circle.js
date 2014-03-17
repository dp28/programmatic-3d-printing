/*
 * author: Daniel Patterson
 *
 * A circle with constrainable properties.
 */
var Point = require('../geometry/Point.js').Point
var Shape = require('../geometry/Shape.js').Shape
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var CircleSpecification = require('../interface/CircleSpecification.js').CircleSpecification
var Utilities = require('../Utilities.js')

module.exports.Circle = Circle

function Circle() {
	var circle = Shape()
	var radius = new ConstrainableValue() 
	var diameter = new ConstrainableValue()
	diameter.scaledByConstant(radius, 2)   

	circle.getType = function() {
		return 'Circle'
	}  

	circle.setRadius = function(r) {
		radius.setValue(r)
	}

	circle.getRadius = function() {
		return radius
	}

	circle.getDiameter = function() {
		return diameter
	}

	circle.toSpecification = function() {
		checkCanGenerateSpecification()
		return new CircleSpecification(circle.getCentre(), radius)
	}

	var checkCanGenerateSpecification = function() {		
		if (radius.isNotSet()) throw new Error("Radius not set")
		if (circle.getCentre().isNotFullyDefined()) throw new Error("Centre not fully defined")
	}

	circle.getDistanceToRightBoundary = function() {
		return new Number(radius.getValue())
	}

	circle.getDistanceToLeftBoundary = function() {
		return (0 - new Number(radius.getValue()))
	}

	circle.getDistanceToBackBoundary = function() {
		return (0 - new Number(radius.getValue()))
	}

	circle.getDistanceToFrontBoundary = function() {
		return new Number(radius.getValue())
	}

	return circle
}

