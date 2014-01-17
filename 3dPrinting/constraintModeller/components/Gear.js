/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Utilities = require('../Utilities.js')
var Circle = require('../geometry/Circle.js').Circle

// Default clearance to 2 to give space during printing
var DEFAULT_CLEARANCE = 2

// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
var DEFAULT_PRESSURE_ANGLE = 20

var DEFAULT_THICKNESS = 5
var DEFAULT_CENTRE_HOLE_RADIUS = 4

module.exports.Gear = Gear

Utilities.inheritPrototype(Gear, Component)

function Gear() {
	var pitchCircleRadius = new ConstrainableValue()
	var numTeeth = new ConstrainableValue()
	var pressureAngle = new ConstrainableValue()
	pressureAngle.setValue(DEFAULT_PRESSURE_ANGLE)
	var clearance = new ConstrainableValue()
	clearance.setValue(DEFAULT_CLEARANCE)	
	var thickness = new ConstrainableValue()
	thickness.setValue(DEFAULT_THICKNESS)
	var centreHoleRadius = new ConstrainableValue()
	centreHoleRadius.setValue(DEFAULT_CENTRE_HOLE_RADIUS)

	this.getNumberOfTeeth = function() {
		return numTeeth
	}

	this.setNumberOfTeeth = function(num) {
		numTeeth.setValue(num)
	}

	this.getPitchCircleRadius = function() {
		return pitchCircleRadius
	}

	this.setPitchCircleRadius = function(r) {
		pitchCircleRadius.setValue(r)
	}

	this.getPressureAngle = function() {
		return pressureAngle 
	}

	this.getClearance = function() {
		return clearance 
	}

	this.getThickness = function() {
		return thickness 
	}

	this.getCentreHoleRadius = function() {
		return centreHoleRadius
	}

	this.getCircularPitch = function() {
		if (numTeeth.getValue() == undefined) throw "Number of teeth not set"
		if (pitchCircleRadius.getValue() == undefined)
			throw "Pitch radius not set"
		return Math.PI * pitchCircleRadius.getValue() * 2 / numTeeth.getValue()

	}
}