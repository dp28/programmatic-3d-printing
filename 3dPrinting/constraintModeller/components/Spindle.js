/*
 * author: Daniel Patterson
 *
 * A representation of a spindle for an involute gear
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var SpindleSpecification = require('../interface/SpindleSpecification.js').SpindleSpecification
var Utilities = require('../Utilities.js')

module.exports.Spindle = Spindle

function Spindle() {
	var spindle = Component()
	var height = new ConstrainableValue()

	spindle.getHeight = function() {
		return height
	}

	spindle.getTypeName = function() {
		return "Spindle"
	}

	spindle.setHeight = function(h) {
		height.setValue(h)
	}

	spindle.getRadius = function() {
		return spindle.getBoundingCircle().getRadius()
	}

	spindle.setRadius = function(radius) {
		spindle.getBoundingCircle().setRadius(radius)
	}

	spindle.toSpecification = function() {
		if (height.isNotSet()) throw new Error("Height not set")
		if (spindle.getRadius().isNotSet()) throw new Error("Radius not set")
		return new SpindleSpecification(height.getValue(), 
			                              spindle.getRadius().getValue())
	}

	return spindle
}