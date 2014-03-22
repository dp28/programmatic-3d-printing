/*
 * author: Daniel Patterson
 *
 * A representation of a toothed component
 */
var PlaceableComponent = require('../../components/PlaceableComponent.js').PlaceableComponent
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var ToothedComponentSpecification = require('../interface/ToothedComponentSpecification.js').ToothedComponentSpecification
var Utilities = require('../../Utilities.js')
var Circle = require('../../geometry/Circle.js').Circle
var Spindle = require('../components/Spindle.js').Spindle

module.exports.ToothedComponent = ToothedComponent

function ToothedComponent(boundaryShapeType) {

	// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
	const DEFAULT_PRESSURE_ANGLE = 20
	const DEFAULT_HEIGHT = 5
	
	var toothed = new PlaceableComponent(boundaryShapeType)
	var numTeeth = new ConstrainableValue()
	var pressureAngle = new ConstrainableValue()
	pressureAngle.setValue(DEFAULT_PRESSURE_ANGLE)
	var height = new ConstrainableValue()
	height.setValue(DEFAULT_HEIGHT)

	toothed.getTypeName = function() {
		return "ToothedComponent"
	}	

	toothed.getNumberOfTeeth = function() {
		return numTeeth
	}

	toothed.setNumberOfTeeth = function(num) {
		numTeeth.setValue(num)
	}
	// In degrees
	toothed.getPressureAngle = function() {
		return pressureAngle 
	}

	// In degrees
	toothed.setPressureAngle = function(value) {
		pressureAngle.setValue(value)
	}

	toothed.getHeight = function() {
		return height 
	}

	toothed.setHeight = function(h) {
		height.setValue(h)
	}

	// Height of tooth above pitch line
	toothed.getAddendum = function() {
		throw new Error("Not implemented in this instance")
	}

	toothed.toSpecification = function() {
		checkFullySpecified()
		return new ToothedComponentSpecification(toothed)
	}

	var checkFullySpecified = function() {		
		if (!numTeeth.isSet()) throw new Error("Number of teeth not set")
	}

	return toothed
}
