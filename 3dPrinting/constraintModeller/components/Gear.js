/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../geometry/Circle.js').Circle
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var Utilities = require('../Utilities.js')

// Default clearance to 2 to give space during printing
const DEFAULT_CLEARANCE = 2

// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
const DEFAULT_PRESSURE_ANGLE = 20

const DEFAULT_THICKNESS = 5
const DEFAULT_CENTRE_HOLE_RADIUS = 4

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
		checkIfCanCalculateCircularPitch()
		return calculateCircularPitch()
	}

	var checkIfCanCalculateCircularPitch = function() {		
		if (numTeeth.getValue() == undefined) throw "Number of teeth not set"
		if (pitchCircleRadius.getValue() == undefined)
			throw "Pitch radius not set"
	}

	var calculateCircularPitch = function() {
		return Math.PI * pitchCircleRadius.getValue() * 2 / numTeeth.getValue()
	}

	this.toSpecification = function() {
		checkIfCanCalculateCircularPitch()
		var circularPitch = calculateCircularPitch()
		return new GearSpecification(numTeeth.getValue(),
		                             circularPitch, 
			                           pressureAngle.getValue(),
			                           clearance.getValue(),
			                           thickness.getValue(),
			                           centreHoleRadius.getValue())
	}
}