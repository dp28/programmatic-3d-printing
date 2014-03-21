/*
 * author: Daniel Patterson
 *
 * A rack - part of a rack and pinion. A bar with a toothed edge.
 */
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Rack = Rack 

function Rack() {
	var rack = new ToothedComponent(Rectangle)
	var linearPitch = new ConstrainableValue()
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()

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

	return rack
}