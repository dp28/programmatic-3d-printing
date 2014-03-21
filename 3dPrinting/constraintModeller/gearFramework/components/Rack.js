/*
 * author: Daniel Patterson
 *
 * A rack - part of a rack and pinion. A bar with a toothed edge. It;s length is
 * defined along the line of teeth, ie:
 *
 *			      		 Front
 *      /\_/\_/\_/\_/\_/\_/\_/\_/\  |
 *      |                         | |
 * Left |--------- length --------| | width  Right
 *      |_________________________| |
 * 
 *                  Back
 *
 *            Front
 *				 ___________
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |  length  |
 *    Left |    |     > Right
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         |    |     |
 *         |    |     >
 *         ____________
 *         ----width---
 *
 *            Back
 *
 *
 */
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

module.exports.Rack = Rack 

Rack.FACES = ["Front", "Back", "Left", "Right"]
Rack.FACE_TO_AXIS = new Object()
Rack.FACE_TO_AXIS.Front = "X"
Rack.FACE_TO_AXIS.Back = "X"
Rack.FACE_TO_AXIS.Left = "Y"
Rack.FACE_TO_AXIS.Right = "Y"

function Rack() {
	const DEFAULT_TOOTH_FACE = Rack.FACES[0]

	var rack = new ToothedComponent(Rectangle)
	var linearPitch = new ConstrainableValue()
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()
	var toothedFace = DEFAULT_TOOTH_FACE
	var lengthAxis = Rack.FACE_TO_AXIS[toothedFace]

	rack.setLinearPitch = function(pitch) {
		linearPitch.setValue(pitch)
		setShapeSizes()
	}

	rack.getLinearPitch = function() {
		return linearPitch
	}

	// Length along tooth direction
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
		lengthAxis = Rack.FACE_TO_AXIS[toothedFace]
		setShapeSizes()
	}

	var setShapeSizes = function() {
		var bound = rack.getBoundingShape()
		var placement = rack.getPlacementShape()
		if (lengthAxis == "X") {
			bound.setLength(length.getValue())
			bound.setWidth(width.getValue())
			placement.setLength(length.getValue())
			placement.setWidth(width.getValue() - 2 * rack.getAddendum())
		}
		else {			
			bound.setLength(width.getValue())
			bound.setWidth(length.getValue())
			placement.setLength(width.getValue() - 2 * rack.getAddendum())
			placement.setWidth(length.getValue())
		}
	}

	rack.getToothedFace = function() {
		return toothedFace
	}

	return rack
}