/*
 * author: Daniel Patterson
 *
 * Tests the GearSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../geometry/Point.js').Point
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var GearTest = require('../tests/GearTest.js')

module.exports.testGearSpecification = testGearSpecification

describe('GearSpecification', function() {
	var gearSpec, gear	

	beforeEach(function() {
		gear = GearTest.createFullySpecifiedTestGear()
		gearSpec = gear.toSpecification()
	})

	it('should behave like a GearSpecification', function() {
		testGearSpecification(gearSpec, gear)
	})	
})

function testGearSpecification(gearSpec, gear) {
	describe('#numTeeth', function() {
		it('should have the correct value', function() {
			gearSpec.numTeeth.should.equal(gear.getNumberOfTeeth().getValue())
		})
	})

	describe('#circularPitch', function() {
		it('should have the correct value', function() {
			gearSpec.circularPitch.should.equal(gear.getCircularPitch())
		})
	})

	describe('#pressureAngle', function() {
		it('should have the correct value', function() {
			gearSpec.pressureAngle.should.equal(gear.getPressureAngle().getValue())
		})
	})

	describe('#clearance', function() {
		it('should have the correct value', function() {
			gearSpec.clearance.should.equal(gear.getClearance().getValue())
		})
	})

	describe('#thickness', function() {
		it('should have the correct value', function() {
			gearSpec.thickness.should.equal(gear.getThickness().getValue())
		})
	})

	describe('#centreHoleRadius', function() {
		it('should have the correct value', function() {
			gearSpec.centreHoleRadius.should.equal(gear.getCentreHoleRadius().getValue())
		})
	})
}