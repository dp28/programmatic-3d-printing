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
var Circle = require('../../geometry/Circle.js').Circle
var Line = require('../../geometry/Line.js').Line
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
function GearTrain(circPitch) {
	checkIfCreationIsLegal(circPitch)
	var train = PlaceableComponentGroup()
	var gears = train.getComponents() // rename for convenience
	var circularPitch = circPitch
	var generateBaseOnWrite = true
	var baseFactory = new BaseFactory()

	// From http://www.cage-gear.com/spur_gear_calculations.htm
	train.getAddendum = function() {
		return circularPitch / Math.PI
	}

	train.getTypeName = function() {
		return "GearTrain"
	}

	train._componentGroupAddComponent = train.addComponent

	train.addGear = function(gear) {
		checkIfGearCanBeAdded(gear)
		train.changeGearToHaveSameCircularPitch(gear)
		train.checkIfGearIsValid(gear)
		train._componentGroupAddComponent(gear)
	} 

	var checkIfGearCanBeAdded = function(gear) {
		checkPressureAngle(gear)
		checkHasNumberOfTeethOrPitchCircleRadius(gear)
		checkCircularPitchMatches(gear)
	}

	var checkPressureAngle= function(gear) {		
		if (gears.length > 0 && gears[0].getPressureAngle().getValue() != gear.getPressureAngle().getValue())
			throw new Error("Gear pressure angle does not match Gears in GearTrain")
	}

	var checkHasNumberOfTeethOrPitchCircleRadius = function(gear) {
		if (gear.getNumberOfTeeth().isNotSet() 
			  && gear.getPitchCircleRadius().isNotSet()) {
			throw new Error("Number of teeth or pitch circle radius not set")
		}
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

	train.checkIfGearIsValid = function(gear) {
		if(train.calculateGearRootRadius(gear) <= gear.getCentreHoleRadius().getValue())
			throw new Error("Invalid Gear - Centre hole radius bigger than root "
				            + "circle radius:\n" + gear.toString())
	}

	train.calculateGearRootRadius = function(gear, gearTrain) {
		return gear.getPitchCircleRadius().getValue() - train.getAddendum() 
		       - gear.getClearance().getValue()
	}

	train.changeGearToHaveSameCircularPitch = function(gear) {
		if (gear.getNumberOfTeeth().isNotSet()) {
			var numTeeth = calculateNumberOfTeethFromPitchCircleRadius(gear)
			gear.setNumberOfTeeth(numTeeth)
		}
		else if (gear.getPitchCircleRadius().isNotSet()) {
			var radius = calculatePitchCircleRadiusFromNumberOfTeeth(gear)
			gear.setPitchCircleRadius(radius)
		}
	}

	var calculateNumberOfTeethFromPitchCircleRadius = function(gear) {
		return Math.PI * 2 * gear.getPitchCircleRadius().getValue() / circularPitch
	}

	var calculatePitchCircleRadiusFromNumberOfTeeth = function(gear) {
		return circularPitch * gear.getNumberOfTeeth().getValue() / (2 * Math.PI)
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
		train.addGear(gear)
		var boundRadius = gear.getPitchCircleRadius().getValue() + train.getAddendum()
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
		return baseFactory.makeBase(gears)
	}

	return train
}