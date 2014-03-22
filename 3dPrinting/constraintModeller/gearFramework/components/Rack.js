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
var RackSupport = require('../components/RackSupport.js').RackSupport

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

	rack.getTypeName = function() {
		return "Rack"
	}

	rack.setLinearPitch = function(pitch) {
		linearPitch.setValue(pitch)
		setShapeSizes()
	}

	rack.getLinearPitch = function() {
		return linearPitch
	}

	rack.getWidth = function() {
		return width
	}

	rack.getLength = function() {
		return length
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

	rack._placeablePlaceAtFrontOf = rack.placeAtFrontOf

	rack.placeAtFrontOf = function(placeableComponent) {
		rack.setToothedFace("Back")
		rack._placeablePlaceAtFrontOf(placeableComponent)
	}

	rack._placeablePlaceAtBackOf = rack.placeAtBackOf

	rack.placeAtBackOf = function(placeableComponent) {
		rack.setToothedFace("Front")
		rack._placeablePlaceAtBackOf(placeableComponent)
	}

	rack._placeablePlaceOnLeftOf = rack.placeOnLeftOf

	rack.placeOnLeftOf = function(placeableComponent) {
		rack.setToothedFace("Right")
		rack._placeablePlaceOnLeftOf(placeableComponent)
	}

	rack._placeablePlaceOnRightOf = rack.placeOnRightOf

	rack.placeOnRightOf = function(placeableComponent) {
		rack.setToothedFace("Left")
		rack._placeablePlaceOnRightOf(placeableComponent)
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

	rack.generateSupport = function() {
		var support = new RackSupport()
		support.setLength(length.getValue())
		support.getLength().sameAs(length)
		support.setWidth(width.getValue())
		support.getWidth().sameAs(width)
		support.setCentre(rack.getCentre())
		support.setWallHeight(rack.getHeight())
		support.setWallWidth(rack.getAddendum())
		return support
	}

	rack.generateAuxillaryComponents = function() {
		return [rack.generateSupport()]
	}

	return rack
}