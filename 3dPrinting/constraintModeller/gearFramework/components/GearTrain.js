/*
 * author: Daniel Patterson
 *
 * A collection of Gears that are standardised so that they can interact 
 * properly
 */
var util = require('util')
var PlaceableComponentGroup = require('../../components/PlaceableComponentGroup.js').PlaceableComponentGroup
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var Gear = require('../components/Gear.js').Gear
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
	var gears = train.getComponents() // rename for convenience
	var circularPitch = circPitch
	var generateBaseOnWrite = true
	var baseFactory = new BaseFactory()
	var pressureAngle = (presAngle == undefined) ? DEFAULT_PRESSURE_ANGLE 
	                                             : presAngle

	train.getTypeName = function() {
		return "GearTrain"
	}

	train._componentGroupAddComponent = train.addComponent

	train.addToothedComponent = function(gear) {
		checkIfGearCanBeAdded(gear)
		gear.setCircularPitch(circularPitch)		
		gear.checkIsValid()
		train._componentGroupAddComponent(gear)
	} 

	train.getPressureAngle = function() {
		return pressureAngle
	}

	var checkIfGearCanBeAdded = function(gear) {
		checkPressureAngle(gear)
		checkCircularPitchMatches(gear)
	}

	var checkPressureAngle = function(gear) {		
		if (gear.getPressureAngle().getValue() != pressureAngle)
			throw new Error("ToothedComponent pressure angle does not match GearTrain")
	}

	var checkCircularPitchMatches = function(gear)  {
		try {
			if (gear.getCircularPitch() == circularPitch) 
				return
		}
		catch(err) {
			// error should be thrown as circular pitch should not be calculable
			return
		}
		throw new Error("Circular pitch of Gear does not match GearTrain")
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
		train.addToothedComponent(gear)
		var boundRadius = gear.getPitchCircleRadius().getValue() + gear.getAddendum()
		gear.getBoundingShape().setRadius(boundRadius)
		return gear
	}

	train.getAuxillaryComponents = function() {
		var auxillaries = []
		if (train.shouldGenerateBaseOnWrite())
			auxillaries.push(train.generateBase())
		return auxillaries
	}

	train.generateBase = function() {
		var base = baseFactory.makeBase(gears)
		base.setHeight(DEFAULT_BASE_HEIGHT)
		return base
	}

	return train
}