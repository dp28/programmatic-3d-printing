/*
 * author: Daniel Patterson
 *
 * This is a Node.js port of Simon Dobson's version in solid-py, with 
 * convenience methods for creating Constraints
 *
 * Tests of ConstrainableValues
 */
var should = require("should")
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue 

describe('Value', function() {
	var value

	beforeEach(function() {
		value = new ConstrainableValue()
	})

	describe('#setValue', function() {
		it('should change the stored value', function() {
			value.setValue(10)
			value.getValue().should.equal(10)
		})

		it('should throw an exception if the value is rigid', function() {
			(function() { 
				value.fixValue(0)
				value.setValue(10)
			}).should.throw()
		})
	})

	describe('#fixValue', function() {
		beforeEach(function() {			
			value.fixValue(10)
		})

		it('should change the stored value', function() {
			value.getValue().should.equal(10)
		})

		it('should make the value rigid', function() {
			value.isRigid().should.be.true
		})
	})

	describe('#unfixValue', function() {
		beforeEach(function() {			
			value.fixValue(10)
			value.unfixValue()
		})

		it('should not change the stored value', function() {
			value.getValue().should.equal(10)
		})

		it('should stop the value from being rigid', function() {
			value.isRigid().should.be.false
		})
	})

	describe('#isSet', function() {
		it('should return false if the stored value has not been set',
		  function() {
			value.isSet().should.be.false
		})

		it('should return true if the stored value has been set', function() {
			value.setValue(10)
			value.isSet().should.be.true
		})
	})

	describe('#isFlexible', function() {
		it('should return true if the value is not rigid', function() {
			value.isFlexible().should.be.true
		})

		it('should return false if the value is rigid', function() {
			value.fixValue(10)
			value.isFlexible().should.be.false
		})
	})

	describe('Constraint convenience functions', function() {
		var anotherValue

		beforeEach(function() {
			anotherValue = new ConstrainableValue()
		})

		describe('#sameAs', function() {
			it('should add a new Constraint to the ConstrainableValue ', function() {
				var numberOfConstraintsBefore = value.getConstraints().length
				value.sameAs(anotherValue)
				value.getConstraints().length.should.equal(numberOfConstraintsBefore + 1)
			})

			it('should constrain this value to the same value as the other value',
				 function() {
        value.sameAs(anotherValue)
        anotherValue.setValue(10)
        value.getValue().should.equal(anotherValue.getValue())
			})
		})

		describe('#offsetByConstant', function() {
			it('should add a new Constraint to the ConstrainableValue ', function() {
				var numberOfConstraintsBefore = value.getConstraints().length
				value.offsetByConstant(anotherValue, 15)
				value.getConstraints().length.should.equal(numberOfConstraintsBefore + 1)
			})

			it('should constrain this value to be a constant offset from the other '
				 + 'value', function() {
				value.offsetByConstant(anotherValue, 15)
				anotherValue.setValue(10)
        value.getValue().should.equal(anotherValue.getValue() + 15)
			})
		})

		describe('#scaledByConstant', function() {

			it('should add a new Constraint to the ConstrainableValue ', function() {
				var numberOfConstraintsBefore = value.getConstraints().length
				value.scaledByConstant(anotherValue, 1.5)
				value.getConstraints().length.should.equal(numberOfConstraintsBefore + 1)
			})

			it('should constrain this value to be a constant factor larger than the '
				 + 'other value', function() {
				value.scaledByConstant(anotherValue, 1.5)
				anotherValue.setValue(10)
        value.getValue().should.equal(anotherValue.getValue() * 1.5)
			})
		})
	})	
})