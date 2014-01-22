/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var util = require('util')
var Component = require('../components/Component.js').Component
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var Utilities = require('../Utilities.js')
var Spindle = require('../components/Spindle.js').Spindle

// Default clearance to 2 to give space during printing
const DEFAULT_CLEARANCE = 2

// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
const DEFAULT_PRESSURE_ANGLE = 20

const DEFAULT_THICKNESS = 5
const DEFAULT_CENTRE_HOLE_RADIUS = 4

module.exports.Gear = Gear

Utilities.inheritPrototype(Gear, Component)

function Gear() {
	Component.call(this) 
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

	this.setPressureAngle = function(value) {
		pressureAngle.setValue(value)
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
		if (!numTeeth.isSet()) throw new Error("Number of teeth not set")
		if (!pitchCircleRadius.isSet())	throw new Error("Pitch radius not set")
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

	this.getTypeName = function() {
		return "Gear"
	}

	this.generateSpindle = function() {
		this.checkCanGenerateSpindle()
		var spindle = new Spindle()
		spindle.setHeight(thickness.getValue())
		spindle.setRadius(centreHoleRadius.getValue())
		spindle.setCentre(this.getCentre())
		return spindle
	}

	this.checkCanGenerateSpindle = function() {		
		if (this.getCentre().isNotFullyDefined()) throw "Point not fully defined"
		if (thickness.isNotSet()) throw "Thickness not set"
		if (centreHoleRadius.isNotSet()) throw "Centre hole radius not set"
		if (centreHoleRadius.getValue() == 0) throw "No centre hole in this Gear"
	}

	this.meshOnLeftOf = function(otherGear) {
		this.meshWithOtherGear(otherGear, 'X', true)
	}

	this.meshOnRightOf = function(otherGear) {
		this.meshWithOtherGear(otherGear, 'X', false)
	}

	this.meshAtFrontOf = function(otherGear) {
		this.meshWithOtherGear(otherGear, 'Y', false)
	}

	this.meshAtBackOf = function(otherGear) {
		this.meshWithOtherGear(otherGear, 'Y', true)
	}

	this.meshWithOtherGear = function(otherGear, axis, negativeOffset) {
		var offset = calculateOffsetForGearsToMesh(otherGear, negativeOffset)
		var axes = Point.getAxesNamesWithout(axis)
		var centre = this.getCentre()
		var otherGearCentre = otherGear.getCentre()
		centre.offsetOnAxis(otherGearCentre, axis, offset)
		centre.samePointOnAxes(otherGearCentre, axes)
	}

	var calculateOffsetForGearsToMesh = function(otherGear, negativeOffset) {
		var offset = otherGear.getPitchCircleRadius().getValue() 
		             + pitchCircleRadius.getValue()
		if (negativeOffset) 
			offset = -offset
		return offset
	}
}
