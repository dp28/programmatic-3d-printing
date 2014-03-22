/*
 * author: Daniel Patterson
 *
 * A support for a Rack Component.
 */
var Component = require('../../components/Component.js').Component
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.RackSupport = RackSupport

function RackSupport() {
	var support = new Component(Rectangle)
	var wallHeight = new ConstrainableValue()
	var baseHeight = new ConstrainableValue()
	var wall = new Rectangle()
	wall.getLength().sameAs(support.getBoundingShape().getLength())
	var wallCentre = new Point()

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
	
	return support
}