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

Utilities.inheritPrototype(Spindle, Component)

function Spindle() {
	Component.call(this)
	var height = new ConstrainableValue()

	this.getHeight = function() {
		return height
	}

	this.getTypeName = function() {
		return "Spindle"
	}

	this.setHeight = function(h) {
		height.setValue(h)
	}

	this.getRadius = function() {
		return this.getBoundingCircle().getRadius()
	}

	this.setRadius = function(radius) {
		this.getBoundingCircle().setRadius(radius)
	}

	this.toSpecification = function() {
		if (height.isNotSet()) throw new Error("Height not set")
		if (this.getRadius().isNotSet()) throw new Error("Radius not set")
		return new SpindleSpecification(height.getValue(), 
			                              this.getRadius().getValue())
	}
}