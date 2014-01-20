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
	spindle.setRadius(10)
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

	describe('#setRadius', function() {
		var newRadius = 10

		beforeEach(function() {
			spindle.setRadius(newRadius)
		})

		it('should set the radius of the Spindle', function() {
			spindle.getRadius().getValue().should.equal(newRadius)
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

		it('should not be possible if the radius has not been set', function() {
			spindle.getHeight().fixValue(5)
			try {
				spindle.toSpecification().should.throw('Radius not set')
			}
			catch(err) {
				err.should.eql(new Error('Radius not set'))
			}
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