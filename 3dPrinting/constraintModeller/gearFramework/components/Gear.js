/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var util = require('util')
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var Utilities = require('../../Utilities.js')
var Circle = require('../../geometry/Circle.js').Circle
var Spindle = require('../components/Spindle.js').Spindle

module.exports.Gear = Gear

function Gear() {

	// Default clearance to 2 to give space during printing
	const DEFAULT_CLEARANCE = 2
	const DEFAULT_CENTRE_HOLE_RADIUS = 4

	var gear = ToothedComponent(Circle) 

	// Set up contstrainable variables
	var pitchCircleRadius = new ConstrainableValue()
	var clearance = new ConstrainableValue()
	clearance.setValue(DEFAULT_CLEARANCE)	
	var centreHoleRadius = new ConstrainableValue()
	centreHoleRadius.setValue(DEFAULT_CENTRE_HOLE_RADIUS)

	gear.getPitchCircleRadius = function() {
		return pitchCircleRadius
	}

	gear.setPitchCircleRadius = function(r) {
		pitchCircleRadius.setValue(r)
		gear.getPlacementShape().setRadius(r)
	}

	gear.getClearance = function() {
		return clearance 
	}

	gear.getCentreHoleRadius = function() {
		return centreHoleRadius
	}

	gear.getCircularPitch = function() {
		checkIfCanCalculateCircularPitch()
		return calculateCircularPitch()
	}

	// From http://www.cage-gear.com/spur_gear_calculations.htm
	gear.getAddendum = function() {
		return gear.getCircularPitch() / Math.PI
	}

	var checkIfCanCalculateCircularPitch = function() {		
		if (!gear.getNumberOfTeeth().isSet()) throw new Error("Number of teeth not set")
		if (!pitchCircleRadius.isSet())	throw new Error("Pitch radius not set")
	}

	var calculateCircularPitch = function() {
		return Math.PI * pitchCircleRadius.getValue() 
		       * 2 / gear.getNumberOfTeeth().getValue()
	}

	gear.toSpecification = function() {
		return new GearSpecification(gear)
	}

	gear.getTypeName = function() {
		return "Gear"
	}

	gear.generateSpindle = function() {
		gear.checkCanGenerateSpindle()
		var spindle = new Spindle()
		spindle.setHeight(gear.getHeight().getValue())
		spindle.setRadius(centreHoleRadius.getValue())
		spindle.setCentre(gear.getCentre())
		return spindle
	}

	gear.checkCanGenerateSpindle = function() {		
		if (gear.getCentre().isNotFullyDefined()) throw "Point not fully defined"
		if (gear.getHeight().isNotSet()) throw "Height not set"
		if (centreHoleRadius.isNotSet()) throw "Centre hole radius not set"
		if (centreHoleRadius.getValue() == 0) throw "No centre hole in this Gear"
	}

	gear._componentToString = gear.toString

	gear.toString = function() {
		var string = gear._componentToString().replace('}', '')
		string += 'Number of teeth: ' + gear.getNumberOfTeeth().getValue() + '\n\t'
		string += 'Pitch circle radius: ' + pitchCircleRadius.getValue() + '\n\t'
		string += 'Bounding circle radius: ' 
		string += gear.getBoundingShape().getRadius().getValue() + '\n\t'
		string += 'Height: ' + gear.getHeight().getValue() + '\n\t'
		string += 'Clearance: ' + clearance.getValue() + '\n\t'
		string += 'Centre hole radius: ' + centreHoleRadius.getValue() + '\n\t'
		string += 'Pressure angle: ' + gear.getPressureAngle().getValue() + '\n\t'
		string += 'Centre point: ' + gear.getCentre().toString() + '\n'
		string += '}'
		return string
	}

	return gear
}
