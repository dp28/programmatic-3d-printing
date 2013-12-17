var should = require("should")
var Value = require('../constraints/Value.js').Value

describe('Value', function() {

	var value

	beforeEach(function() {
		value = new Value()
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
})