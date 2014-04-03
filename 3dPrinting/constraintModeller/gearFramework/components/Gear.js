/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

/*
 * author: Daniel Patterson
 *
 * A representation of an involute gear
 */
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
	var circularPitch = null

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

	gear.setCentreHoleRadius = function(c) {
		centreHoleRadius.setValue(c)
	}

	gear.setCircularPitch = function(p) {
		checkHasEitherNumberOfTeethOrPitchCircleRadius()
		circularPitch = p
		if (gear.getNumberOfTeeth().isNotSet()) {
			var numTeeth = calculateNumberOfTeethFromPitchCircleRadius(gear)
			gear.setNumberOfTeeth(numTeeth)
		}
		else if (gear.getPitchCircleRadius().isNotSet()) {
			var radius = calculatePitchCircleRadiusFromNumberOfTeeth(gear)
			gear.setPitchCircleRadius(radius)
		}
	}

	var checkHasEitherNumberOfTeethOrPitchCircleRadius = function() {
		if (gear.getNumberOfTeeth().isNotSet() 
			  && gear.getPitchCircleRadius().isNotSet()) {
			throw new Error("Number of teeth or pitch circle radius not set")
		}
		else if (gear.getNumberOfTeeth().isSet() 
			  && gear.getPitchCircleRadius().isSet()) {
			throw new Error("Circular pitch already set")
		}
	}

	var calculateNumberOfTeethFromPitchCircleRadius = function(gear) {
		return Math.PI * 2 * gear.getPitchCircleRadius().getValue() / circularPitch
	}

	var calculatePitchCircleRadiusFromNumberOfTeeth = function(gear) {
		return circularPitch * gear.getNumberOfTeeth().getValue() / (2 * Math.PI)
	}

	gear.getCircularPitch = function() {
		if (circularPitch == null) {
			checkIfCanCalculateCircularPitch()
			circularPitch = calculateCircularPitch()
		}
		return circularPitch
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

	gear.checkIsValid = function() {
		if(!gear.isValid())
			throw new Error("Invalid Gear - Centre hole radius bigger than root "
				            + "circle radius:\n" + gear.toString())			
	}

	gear.isValid = function() {
		return gear.calculateGearRootRadius() 
		       > gear.getCentreHoleRadius().getValue()
	}

	gear.calculateGearRootRadius = function() {
		return gear.getPitchCircleRadius().getValue() - gear.getAddendum() 
		       - gear.getClearance().getValue()
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

	gear.generateAuxillaryComponents = function() {
		return [gear.generateSpindle()]
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
		string += '\tNumber of teeth: ' + gear.getNumberOfTeeth().getValue() + '\n\t'
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
