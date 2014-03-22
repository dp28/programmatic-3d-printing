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
var RackSpecification = require('../interface/RackSpecification.js').RackSpecification
module.exports.Rack = Rack 

Rack.FACES = ["Front", "Back", "Left", "Right"]
Rack.FACE_TO_AXIS = new Object()
Rack.FACE_TO_AXIS.Front = "X"
Rack.FACE_TO_AXIS.Back = "X"
Rack.FACE_TO_AXIS.Left = "Y"
Rack.FACE_TO_AXIS.Right = "Y"

function Rack() {
	const DEFAULT_TOOTH_FACE = Rack.FACES[0]
	const DEFAULT_WIDTH = 10

	var rack = new ToothedComponent(Rectangle)
	var linearPitch = null
	var length = new ConstrainableValue()
	var width = new ConstrainableValue()
	width.setValue(DEFAULT_WIDTH)
	var toothedFace = DEFAULT_TOOTH_FACE
	var lengthAxis = Rack.FACE_TO_AXIS[toothedFace]

	rack.getTypeName = function() {
		return "Rack"
	}

	rack.setCircularPitch = function(pitch) {
		rack.setLinearPitch(pitch)
	}

	rack.getLinearPitch = function() {
		if (linearPitch == null) {
			checkCanCalculateLinearPitch()
			calculateLinearPitch()
		}
		return linearPitch
	}

	rack.getCircularPitch = function() {
		return rack.getLinearPitch()
	}

	rack.setLinearPitch = function(p) {
		checkHasEitherNumberOfTeethOrLength()
		linearPitch = p
		if (rack.getNumberOfTeeth().isNotSet()) {
			var numTeeth = calculateNumberOfTeethFromLength()
			rack.setNumberOfTeeth(numTeeth)
		}
		else if (rack.getLength().isNotSet()) {
			var len = calculateLengthFromNumberOfTeeth()
			rack.setLength(len)
		}
		setShapeSizes()
	}

	var checkHasEitherNumberOfTeethOrLength = function() {
		if (rack.getNumberOfTeeth().isNotSet() 
			  && rack.getLength().isNotSet()) {
			throw new Error("Number of teeth or length not set")
		}
		else if (rack.getNumberOfTeeth().isSet() 
			  && rack.getLength().isSet()) { 
			throw new Error("Circular pitch already set")
		}
	}

	var checkCanCalculateLinearPitch = function() {
		if (rack.getNumberOfTeeth().isNotSet()) throw new Error("Number of teeth not set")
		if (length.isNotSet()) throw new Error("Length not set")
	}

	var calculateLinearPitch = function() {		
			linearPitch = length.getValue() / rack.getNumberOfTeeth().getValue()
	}

	var calculateNumberOfTeethFromLength = function() {
		return rack.getLength().getValue() / linearPitch
	}

	var calculateLengthFromNumberOfTeeth = function() {
		return linearPitch * rack.getNumberOfTeeth().getValue()
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
		return linearPitch / Math.PI
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
		checkFullySpecified()
		var support = new RackSupport()
		support.setLength(length.getValue())
		support.getLength().sameAs(length)
		support.setWidth(width.getValue())
		support.getWidth().sameAs(width)
		support.setCentre(rack.getCentre())
		support.setWallHeight(rack.getHeight())
		support.setWallWidth(rack.getAddendum())
		createWallCentre(support)
		return support
	}

	var createWallCentre = function(support) {
		var centre = rack.getCentre()
		var width = rack.getWidth().getValue()
		var z = centre.getZ().getValue()
		var x, y
		switch(toothedFace) {
			case "Front":
				x = centre.getX().getValue()
				y = centre.getY().getValue() + width / 2 - rack.getAddendum() / 2
				break;
			case "Back":
				x = centre.getX().getValue()
				y = centre.getY().getValue() - width / 2 + rack.getAddendum() / 2
				break;
			case "Left":
				y = centre.getY().getValue()
				x = centre.getX().getValue() - width / 2 + rack.getAddendum() / 2
				break;
			case "Right":
				y = centre.getY().getValue()
				x = centre.getX().getValue() + width / 2 - rack.getAddendum() / 2
				break;
		}

		support.setWallCentre(x, y, z)
	}

	var checkFullySpecified = function() {
		if(rack.getWidth().isNotSet()) throw "Width not set"
		if(rack.getCentre().isNotFullyDefined()) throw "Point not fully defined"
		if(rack.getHeight().isNotSet()) throw "Height not set"
		if(rack.getLength().isNotSet()) throw "Length not set"
		if(rack.getLinearPitch() == null) throw "Linear pitch not set"
	}

	rack.generateAuxillaryComponents = function() {
		return [rack.generateSupport()]
	}

	rack.toSpecification = function() {
		return new RackSpecification(rack)
	}

	return rack
}