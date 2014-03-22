/*
 * author: Daniel Patterson
 *
 * A support for a Rack Component.
 */
var Component = require('../../components/Component.js').Component
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var RackSupportSpecification = require('../interface/RackSupportSpecification.js').RackSupportSpecification

module.exports.RackSupport = RackSupport

function RackSupport() {
	const DEFAULT_BASE_WIDTH = 1
	var support = new Component(Rectangle)
	var wallHeight = new ConstrainableValue()
	var baseHeight = new ConstrainableValue()
	baseHeight.setValue(DEFAULT_BASE_WIDTH)
	var wall = new Rectangle()
	wall.getLength().sameAs(support.getBoundingShape().getLength())
	var wallCentre = wall.getCentre()

	support.getTypeName = function() {
		return "RackSupport"
	}

	support.getLength = support.getBoundingShape().getLength

	support.setLength = support.getBoundingShape().setLength

	support.getWidth = support.getBoundingShape().getWidth

	support.setWidth = support.getBoundingShape().setWidth

	support.getWallWidth = wall.getWidth 

	support.setWallWidth = function(w) {
		wall.setWidth(w)
	}

	support.getWallHeight = function() {
		return wallHeight
	}

	support.setWallHeight = function(h) {
		wallHeight.setValue(h)
	}

	support.getBaseHeight = function() {
		return baseHeight
	}

	support.setBaseHeight = function(h) {
		baseHeight.setValue(h)
	}

	support.setWallCentre = function(x, y, z) {
		wallCentre.setAt(x, y, z)
	}

	support.getWallCentre = function() {
		return wallCentre
	}

	support.toSpecification = function() {
		checkFullySpecified()
		return new RackSupportSpecification(support)
	}

	var checkFullySpecified = function() { 
		if (support.getLength().isNotSet()) throw new Error("Length not set")
		if (support.getWidth().isNotSet()) throw new Error("Width not set")
		if (support.getBaseHeight().isNotSet()) throw new Error("Base height not set")
		if (support.getWallHeight().isNotSet()) throw new Error("Wall height not set")
		if (wall.getCentre().isNotFullyDefined()) 
			throw new Error("Wall centre not fully defined")
	}
	
	return support
}