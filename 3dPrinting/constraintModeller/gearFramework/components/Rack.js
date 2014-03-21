/*
 * author: Daniel Patterson
 *
 * A rack - part of a rack and pinion. A bar with a toothed edge.
 */
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Rack = Rack 

Rack.FACES = ["Front", "Back", "Left", "Right"]

function Rack() {
	const DEFAULT_TOOTH_FACE = Rack.FACES[0]

	var rack = new ToothedComponent(Rectangle)
	var linearPitch = new ConstrainableValue()
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()
	var toothedFace = DEFAULT_TOOTH_FACE

	rack.setLinearPitch = function(pitch) {
		linearPitch.setValue(pitch)
		setShapeSizes()
	}

	rack.getLinearPitch = function() {
		return linearPitch
	}

	rack.setLength = function(len) {
		length.setValue(len)
		setShapeSizes()
	}

	rack.setWidth = function(w) {
		width.setValue(w)
		setShapeSizes()
	}

	rack.getAddendum = function() {
		return rack.getLinearPitch().getValue() / Math.PI
	}

	rack.setToothedFace = function(face) {
		if (Rack.FACES.indexOf(face) < 0)
			throw new Error("Invalid face")
		toothedFace = face
	}

	var swapLengthAndWidth = function() {
		var len = length.getValue()
		length.setValue(width.getValue())
		width.setValue(len)
	}

	var setShapeSizes = function() {
		var bound = rack.getBoundingShape()
		var placement = rack.getPlacementShape()
		bound.setLength(length.getValue())
		bound.setWidth(width.getValue())
		placement.setLength(length.getValue())
		placement.setWidth(width.getValue() - 2 * rack.getAddendum())
	}

	rack.getToothedFace = function() {
		return toothedFace
	}

	return rack
}