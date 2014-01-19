/*
 * author: Daniel Patterson
 *
 * Tests Spindle objects
 */
var should = require('should')
var Component = require('../components/Component.js').Component
var Spindle = require('../components/Spindle.js').Spindle
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var ComponentTest = require('../tests/ComponentTest.js')
var SpindleSpecificationTest = require('../tests/SpindleSpecificationTest.js')

module.exports.createFullySpecifiedTestSpindle = createFullySpecifiedTestSpindle

function createFullySpecifiedTestSpindle() {
	var spindle = new Spindle()
	spindle.getCentre().fixAt(1, 2, 3)
	spindle.getHeight().fixValue(5)
	return spindle
}

describe('Spindle', function() {
	var spindle 

	beforeEach(function() {
		spindle = new Spindle()
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(spindle)
	})

	describe('#getTypeName', function() {
		it('should return "Spindle"', function() {
			spindle.getTypeName().should.equal("Spindle")
		})
	})

	describe('#getHeight', function() {
		it('should return a ConstrainableValue', function() {
			spindle.getHeight().should.be.an.instanceof(ConstrainableValue)
		})
	})

	describe('#toSpecification', function() {
		it('should not be possible if the height has not been set', function() {
			spindle.toSpecification.should.throw('Height not set')
		})

		describe('the returned SpindleSpecification', function() {
			var spindleSpec

			beforeEach(function() {
				spindle = createFullySpecifiedTestSpindle()
				spindleSpec = spindle.toSpecification()
			})

			it('should behave like a SpindleSpecification created from the Spindle',
				 function() {
				SpindleSpecificationTest.testSpindleSpecification(spindleSpec, spindle)
			})
		})
	})

	describe('#toComponentSpecification', function() {

	})
})