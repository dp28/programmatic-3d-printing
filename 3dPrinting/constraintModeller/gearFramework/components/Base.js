/*
 * author: Daniel Patterson
 *
 * A representation of a Base for a GearTrain
 */
var Component = require('../../components/Component.js').Component
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var Circle = require('../../geometry/Circle.js').Circle
var Rectangle = require('../../geometry/Rectangle.js').Rectangle


module.exports.Base = Base

function Base() {
	var base = Component(Circle) 
	var height = new ConstrainableValue()
	var parts = []

	base.getParts = function() {
		return parts
	}

	base.getCircles = function() {
		return parts.filter(function(element) {
			return element.getType != undefined && element.getType() == 'Circle'
		})
	}

	base.getRectangles = function() {
		return parts.filter(function(element) {
			return element instanceof Rectangle
		})
	}
	
	base.getSpindles = function() {
		return parts.filter(function(element) {
			return element.getTypeName != undefined
			       && element.getTypeName() == 'Spindle'
		})
	}

	base.addPart = function(part) {
		parts.push(part)
	}

	base.getTypeName = function() {
		return "Base"
	}

	base.getHeight = function() {
		return height
	}

	base.setHeight = function(h) {
		height.setValue(h)
	}

	base.getRadius = function() {
		return base.getBoundingShape().getRadius()
	}

	base.setRadius = function(r) {
		base.getBoundingShape().getRadius().setValue(r)
	}

	var checkCanGenerateSpecification = function(base) {
		if (height.isNotSet()) 
			throw new Error("Height not set")
	}

	base.toSpecification = function() {
		checkCanGenerateSpecification(base)
		return new BaseSpecification(base)
	}

	return base
}