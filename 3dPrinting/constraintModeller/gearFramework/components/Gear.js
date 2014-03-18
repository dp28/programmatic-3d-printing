/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var util = require('util')
var PlaceableComponent = require('../../components/PlaceableComponent.js').PlaceableComponent
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var Utilities = require('../../Utilities.js')
var Circle = require('../../geometry/Circle.js').Circle
var Spindle = require('../components/Spindle.js').Spindle

// Default clearance to 2 to give space during printing
const DEFAULT_CLEARANCE = 2

// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
const DEFAULT_PRESSURE_ANGLE = 20

const DEFAULT_THICKNESS = 5
const DEFAULT_CENTRE_HOLE_RADIUS = 4

module.exports.Gear = Gear

function Gear() {
	var gear = PlaceableComponent(Circle) 

	// Set up contstrainable variables
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

	gear.getNumberOfTeeth = function() {
		return numTeeth
	}

	gear.setNumberOfTeeth = function(num) {
		numTeeth.setValue(num)
	}

	gear.getPitchCircleRadius = function() {
		return pitchCircleRadius
	}

	gear.setPitchCircleRadius = function(r) {
		pitchCircleRadius.setValue(r)
		gear.getPlacementShape().setRadius(r)
	}

	// In degrees
	gear.getPressureAngle = function() {
		return pressureAngle 
	}

	// In degrees
	gear.setPressureAngle = function(value) {
		pressureAngle.setValue(value)
	}

	gear.getClearance = function() {
		return clearance 
	}

	gear.getThickness = function() {
		return thickness 
	}

	gear.getCentreHoleRadius = function() {
		return centreHoleRadius
	}

	gear.getCircularPitch = function() {
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

	gear.toSpecification = function() {
		checkIfCanCalculateCircularPitch()
		var circularPitch = calculateCircularPitch()
		return new GearSpecification(gear)
	}

	gear.getTypeName = function() {
		return "Gear"
	}

	gear.generateSpindle = function() {
		gear.checkCanGenerateSpindle()
		var spindle = new Spindle()
		spindle.setHeight(thickness.getValue())
		spindle.setRadius(centreHoleRadius.getValue())
		spindle.setCentre(gear.getCentre())
		return spindle
	}

	gear.checkCanGenerateSpindle = function() {		
		if (gear.getCentre().isNotFullyDefined()) throw "Point not fully defined"
		if (thickness.isNotSet()) throw "Thickness not set"
		if (centreHoleRadius.isNotSet()) throw "Centre hole radius not set"
		if (centreHoleRadius.getValue() == 0) throw "No centre hole in this Gear"
	}

	gear._componentToString = gear.toString

	gear.toString = function() {
		var string = gear._componentToString().replace('}', '')
		string += 'Number of teeth: ' + numTeeth.getValue() + '\n\t'
		string += 'Pitch circle radius: ' + pitchCircleRadius.getValue() + '\n\t'
		string += 'Bounding circle radius: ' 
		string += gear.getBoundingShape().getRadius().getValue() + '\n\t'
		string += 'Thickness: ' + thickness.getValue() + '\n\t'
		string += 'Clearance: ' + clearance.getValue() + '\n\t'
		string += 'Centre hole radius: ' + centreHoleRadius.getValue() + '\n\t'
		string += 'Pressure angle: ' + pressureAngle.getValue() + '\n\t'
		string += 'Centre point: ' + gear.getCentre().toString() + '\n'
		string += '}'
		return string
	}

	return gear
}
