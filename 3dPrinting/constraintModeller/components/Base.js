/*
 * author: Daniel Patterson
 *
 * A representation of a Base for a GearTrain
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var Utilities = require('../Utilities.js')
var Circle = require('../geometry/Circle.js').Circle
var Line = require('../geometry/Line.js').Line


module.exports.Base = Base

Utilities.inheritPrototype(Base, Component)

function Base() {
	Component.call(this) 
	var height = new ConstrainableValue()
	var parts = []

	this.getParts = function() {
		return parts
	}

	this.getCircles = function() {
		return parts.filter(function(element) {
			return element instanceof Circle
		})
	}

	this.getLines = function() {
		return parts.filter(function(element) {
			return element instanceof Line
		})
	}

	this.addPart = function(part) {
		parts.push(part)
	}

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
	}

	this.toSpecification = function() {
		checkCanGenerateSpecification(this)
		return new BaseSpecification(height.getValue(),
		                             this.getRadius().getValue(),
		                             parts)
	}
}