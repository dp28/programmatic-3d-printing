/*
 * author: Daniel Patterson
 *
 * Tests the GearSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../../geometry/Point.js').Point
var Gear = require('../components/Gear.js').Gear
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var GearTest = require('../tests/GearTest.js')
var SpecificationTest = require('../../tests/SpecificationTest.js')

module.exports.testGearSpecification = testGearSpecification

function testGearSpecification(gearSpec, gear) {
	describe('GearSpecification', function() {

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(gearSpec)
		})
		
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

		describe('#height', function() {
			it('should have the correct value', function() {
				gearSpec.height.should.equal(gear.getThickness().getValue())
			})
		})

		describe('#centreHoleRadius', function() {
			it('should have the correct value', function() {
				gearSpec.centreHoleRadius.should.equal(gear.getCentreHoleRadius().getValue())
			})
		})
	})
}