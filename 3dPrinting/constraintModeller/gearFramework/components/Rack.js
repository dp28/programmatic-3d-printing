/*
 * author: Daniel Patterson
 *
 * A rack - part of a rack and pinion. A bar with a toothed edge.
 */
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Rack = Rack 

Rack.FACES = ["FRONT", "BACK", "LEFT", "RIGHT"]

function Rack() {
	const DEFAULT_TOOTH_FACE = Rack.FACES[0]

	var rack = new ToothedComponent(Rectangle)
	var linearPitch = new ConstrainableValue()
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()
	var toothedFace = DEFAULT_TOOTH_FACE

	rack.setLinearPitch = function(pitch) {
		linearPitch.setValue(pitch)
	}

	rack.getLinearPitch = function() {
		return linearPitch
	}

	rack.setLength = function(len) {
		length.setValue(len)
	}

	rack.setWidth = function(w) {
		width.setValue(w)
	}

	rack.getAddendum = function() {
		return rack.getLinearPitch().getValue() / Math.PI
	}

	rack.setToothedFace = function(face) {
		if (Rack.FACES.indexOf(face) < 0)
			throw new Error("Invalid face")
		toothedFace = face
	}

	rack.getToothedFace = function() {
		return toothedFace
	}

	return rack
}