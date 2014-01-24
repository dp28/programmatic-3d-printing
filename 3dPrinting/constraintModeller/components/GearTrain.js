/*
 * author: Daniel Patterson
 *
 * A collection of Gears that are standardised so that they can interact 
 * properly
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Gear = require('../components/Gear.js').Gear
var Base = require('../components/Base.js').Base
var Utilities = require('../Utilities.js')
var util = require('util')

module.exports.GearTrain = GearTrain

Utilities.inheritPrototype(GearTrain, Component)

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
	Component.call(this)
	var gears = []
	var circularPitch = circPitch
	var generateSpindlesOnWrite = true
	var generateBaseOnWrite = true

	// From http://www.cage-gear.com/spur_gear_calculations.htm
	this.getAddendum = function() {
		return circularPitch / Math.PI
	}

	this.addGear = function(gear) {
		this.checkIfGearCanBeAdded(gear)
		this.changeGearToHaveSameCircularPitch(gear)
		gears.push(gear)
	} 

	this.checkIfGearCanBeAdded = function(gear) {
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

	this.changeGearToHaveSameCircularPitch = function(gear) {
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

	this.getGears = function() {
		return gears
	}

	this.getCircularPitch = function() {
		return circularPitch
	}

	this.shouldGenerateSpindlesOnWrite = function() {
		return generateSpindlesOnWrite
	}

	this.setGenerateSpindlesOnWrite = function(flag) {
		generateSpindlesOnWrite = flag
	}

	this.shouldGenerateBaseOnWrite = function() {
		return generateBaseOnWrite
	}

	this.setGenerateBaseOnWrite = function(flag) {
		generateBaseOnWrite = flag
	}

	this.createGear = function(numTeeth) {
		var gear = new Gear()
		gear.setNumberOfTeeth(numTeeth)
		this.addGear(gear)
		var boundRadius = gear.getPitchCircleRadius().getValue() + this.getAddendum()
		gear.getBoundingCircle().setRadius(boundRadius)
		return gear
	}

	this.onlyMeshingGearsTouching = function() {
		for (var i = 0; i < gears.length; i++) {
			for (var j = 0; j < gears.length && j != i; j++) {
				if (gears[i].isTouching(gears[j]) && !gears[i].isMeshingWith(gears[j]))
					return false
			}
		}
		return true
	}

	this.findNonMeshingTouchingGears = function() {
		var overlapping = []
		for (var i = 0; i < gears.length; i++) {
			for (var j = 0; j < gears.length && j != i; j++) {
				if (gears[i].isTouching(gears[j]) && !gears[i].isMeshingWith(gears[j]))
					overlapping.push(gears[i], gears[j])
			}
		}
		// Remove duplicates
		return overlapping.filter(function(element, position, self) {
			return self.indexOf(element) == position
		})
	}

	this.generateBase = function() {
		var base = new Base()
		base.getCentre().setAt(0, 0, 0)
		base.setHeight(1)
		base.setRadius(100)
		return base
	}
}