/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
var util = require('util')
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var Utilities = require('../Utilities.js')
var Circle = require('../geometry/Circle.js').Circle
var Spindle = require('../components/Spindle.js').Spindle

// Default clearance to 2 to give space during printing
const DEFAULT_CLEARANCE = 2

// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
const DEFAULT_PRESSURE_ANGLE = 20

const DEFAULT_THICKNESS = 5
const DEFAULT_CENTRE_HOLE_RADIUS = 4

module.exports.Gear = Gear

function Gear() {
	var id = null
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
	
	var meshingGears = []

	gear.setID = function(newID) {
		id = newID
	}

	gear.getID = function() {
		return id
	}

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

	gear.getMeshingGears = function() {
		return meshingGears
	}

	gear.addMeshingGear = function(gear) {
		meshingGears.push(gear)
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
		return new GearSpecification(id,
																 numTeeth.getValue(),
		                             circularPitch, 
			                           pressureAngle.getValue(),
			                           clearance.getValue(),
			                           thickness.getValue(),
			                           centreHoleRadius.getValue(),
			                           meshingGears)
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

	gear.meshOnLeftOf = function(otherGear) {
		gear.meshWithOtherGear(otherGear, 'X', true)
	}

	gear.meshOnRightOf = function(otherGear) {
		gear.meshWithOtherGear(otherGear, 'X', false)
	}

	gear.meshAtFrontOf = function(otherGear) {
		gear.meshWithOtherGear(otherGear, 'Y', false)
	}

	gear.meshAtBackOf = function(otherGear) {
		gear.meshWithOtherGear(otherGear, 'Y', true)
	}

	gear.meshWithOtherGear = function(otherGear, axis, negativeOffset) {
		var offset = calculateOffsetForGearsToMesh(otherGear, negativeOffset)
		var axes = Point.getAxesNamesWithout(axis)
		var centre = gear.getCentre()
		var otherGearCentre = otherGear.getCentre()
		centre.offsetOnAxis(otherGearCentre, axis, offset)
		centre.samePointOnAxes(otherGearCentre, axes)
		meshingGears.push(otherGear)
		otherGear.addMeshingGear(gear)
	}

	var calculateOffsetForGearsToMesh = function(otherGear, negativeOffset) {
		var offset = otherGear.getPitchCircleRadius().getValue() 
		             + pitchCircleRadius.getValue()
		if (negativeOffset) 
			offset = -offset
		return offset
	}

	gear.isTouching = function(otherGear) {
		var boundingRadius = gear.getBoundingShape().getRadius().getValue()
		var otherBoundingRadius = otherGear.getBoundingShape().getRadius().getValue()
		var distanceBetween = gear.getCentre().distanceToOnXYPlane(otherGear.getCentre())
		return distanceBetween < (boundingRadius + otherBoundingRadius)
	} 

	gear.isMeshingWith = function(otherGear) {
		var pitchRadius = pitchCircleRadius.getValue()
		var otherPitchRadius = otherGear.getPitchCircleRadius().getValue()
		var distanceBetween = gear.getCentre().distanceToOnXYPlane(otherGear.getCentre())
		var combinedRadii = pitchRadius + otherPitchRadius
		return Utilities.approximatelyEqual(distanceBetween, combinedRadii, 0.001)
	}

	gear.toString = function() {
		var string = 'Gear {\n\tID: ' + id + '\n\t' 
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
