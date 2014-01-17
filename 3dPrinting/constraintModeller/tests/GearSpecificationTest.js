/*
 * author: Daniel Patterson
 *
 * Tests the GearSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification

describe('GearSpecification', function() {
	var gearSpec
	var numTeeth = 5
	var circularPitch = 10
	var pressureAngle = 20
	var clearance = 2
	var thickness = 4  
	var centreHoleRadius = 1.5

	beforeEach(function() {
		gearSpec = new GearSpecification(numTeeth, circularPitch, pressureAngle,
			                               clearance, thickness, centreHoleRadius)
	})

	describe('#numTeeth', function() {
		it('should have the correct value', function() {
			gearSpec.numTeeth.should.equal(numTeeth)
		})
	})

	describe('#circularPitch', function() {
		it('should have the correct value', function() {
			gearSpec.circularPitch.should.equal(circularPitch)
		})
	})

	describe('#pressureAngle', function() {
		it('should have the correct value', function() {
			gearSpec.pressureAngle.should.equal(pressureAngle)
		})
	})

	describe('#clearance', function() {
		it('should have the correct value', function() {
			gearSpec.clearance.should.equal(clearance)
		})
	})

	describe('#thickness', function() {
		it('should have the correct value', function() {
			gearSpec.thickness.should.equal(thickness)
		})
	})

	describe('#centreHoleRadius', function() {
		it('should have the correct value', function() {
			gearSpec.centreHoleRadius.should.equal(centreHoleRadius)
		})
	})
})