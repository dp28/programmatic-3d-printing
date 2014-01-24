/*
 * author: Daniel Patterson
 *
 * A representation of a Base for a GearTrain
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var Utilities = require('../Utilities.js')


module.exports.Base = Base

Utilities.inheritPrototype(Base, Component)

function Base() {
	Component.call(this) 
	var height = new ConstrainableValue()

	this.getTypeName = function() {
		return "Base"
	}

	this.getHeight = function() {
		return height
	}

	this.setHeight = function(h) {
		height.setValue(h)
	}

	this.getRadius = function() {
		return this.getBoundingCircle().getRadius()
	}

	this.setRadius = function(r) {
		this.getBoundingCircle().getRadius().setValue(r)
	}

	var checkCanGenerateSpecification = function(base) {
		if (height.isNotSet()) 
			throw new Error("Height not set")
		if (base.getRadius().isNotSet())
		 throw new Error("Radius not set")
	}

	this.toSpecification = function() {
		checkCanGenerateSpecification(this)
		return new BaseSpecification(height.getValue(), this.getRadius().getValue())
	}
}