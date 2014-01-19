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

module.exports.createFullySpecifiedTestSpindle = function() {
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

	describe('#getHeight', function() {
		it('should return a ConstrainableValue', function() {
			spindle.getHeight().should.be.an.instanceof(ConstrainableValue)
		})
	})

})