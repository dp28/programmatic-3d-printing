/*
 * author: Daniel Patterson
 *
 * Tests any ToothedComponentSpecification
 */
var should = require('should')
var ToothedComponentSpecification = require('../interface/ToothedComponentSpecification.js').ToothedComponentSpecification
var GearTest = require('../tests/GearTest.js')
var SpecificationTest = require('../../tests/SpecificationTest.js')

module.exports.testToothedComponentSpecification = testToothedComponentSpecification

function testToothedComponentSpecification(toothedSpec, toothed) {
	describe('ToothedComponentSpecification', function() {

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(toothedSpec)
		})
		
		describe('#numTeeth', function() {
			it('should have the correct value', function() {
				toothedSpec.numTeeth.should.equal(toothed.getNumberOfTeeth().getValue())
			})
		})

		describe('#pressureAngle', function() {
			it('should have the correct value', function() {
				toothedSpec.pressureAngle.should.equal(toothed.getPressureAngle().getValue())
			})
		})

		describe('#height', function() {
			it('should have the correct value', function() {
				toothedSpec.height.should.equal(toothed.getHeight().getValue())
			})
		})
	})
}