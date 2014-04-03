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
 * A collection of Gears that are standardised so that they can interact 
 * properly
 */
var PlaceableComponentGroup = require('../../components/PlaceableComponentGroup.js').PlaceableComponentGroup
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var Gear = require('../components/Gear.js').Gear
var Rack = require('../components/Rack.js').Rack
var Base = require('../components/Base.js').Base
var BaseFactory = require('../components/BaseFactory.js').BaseFactory
var Utilities = require('../../Utilities.js')
var Point = require('../../geometry/Point.js').Point

module.exports.GearTrain = GearTrain

function checkIfCreationIsLegal(circPitch) {
	if (circPitch == undefined) throw new Error("No circular pitch specified")
	if (circPitch <= 0) throw new Error("Invalid circular pitch specified")
}

/*
 * Creates a GearTrain to collect Gears together. Requires a circular pitch to 
 * be specified so that all Gears in this GearTrain can have the same tooth 
 * size. This is necessary for the gears to mesh.
 */ 
function GearTrain(circPitch, presAngle) {
	const DEFAULT_BASE_HEIGHT = 1
	const DEFAULT_PRESSURE_ANGLE = 20
	checkIfCreationIsLegal(circPitch)
	var train = PlaceableComponentGroup()
	var components = train.getComponents() // rename for convenience
	var circularPitch = circPitch
	var generateBaseOnWrite = true
	var baseFactory = new BaseFactory()
	var pressureAngle = (presAngle == undefined) ? DEFAULT_PRESSURE_ANGLE 
	                                             : presAngle

	train.getTypeName = function() {
		return "GearTrain"
	}

	train.getPressureAngle = function() {
		return pressureAngle
	}

	train._componentGroupAddComponent = train.addComponent
	train.addComponent = function(component) {
		checkIfComponentCanBeAdded(component)	
		component.checkIsValid()
		train._componentGroupAddComponent(component)
	} 

	var checkIfComponentCanBeAdded = function(component) {
		checkPressureAngle(component)
		try {
			component.setCircularPitch(circularPitch)	
		}
		catch (err){
			if (err.message != "Circular pitch already set")
				throw err
		}
		checkCircularPitchMatches(component)
	}

	var checkPressureAngle = function(component) {		
		if (component.getPressureAngle().getValue() != pressureAngle)
			throw new Error("ToothedComponent pressure angle does not match GearTrain")
	}

	var checkCircularPitchMatches = function(component)  {
		try {
			if (component.getCircularPitch() == circularPitch) 
				return
		}
		catch(err) {
			// error should be thrown as circular pitch should not be calculable
			return
		}
		throw new Error("Circular pitch of ToothedComponent does not match GearTrain")
	}

	train.getCircularPitch = function() {
		return circularPitch
	}

	train.shouldGenerateBaseOnWrite = function() {
		return generateBaseOnWrite
	}

	train.setGenerateBaseOnWrite = function(flag) {
		generateBaseOnWrite = flag
	}

	train.createGear = function(numTeeth) {
		var gear = new Gear()
		gear.setNumberOfTeeth(numTeeth)
		train.addComponent(gear)
		var boundRadius = gear.getPitchCircleRadius().getValue() + gear.getAddendum()
		gear.getBoundingShape().setRadius(boundRadius)
		return gear
	}

	train.createRack = function(numTeeth) {
		var rack = new Rack()
		rack.setNumberOfTeeth(numTeeth)
		train.addComponent(rack)
		return rack
	}

	train.getAuxillaryComponents = function() {
		var auxillaries = []
		if (train.shouldGenerateBaseOnWrite())
			auxillaries.push(train.generateBase())
		return auxillaries
	}

	train.generateBase = function() {
		var base = baseFactory.makeBase(components)
		base.setHeight(DEFAULT_BASE_HEIGHT)
		return base
	}

	return train
}