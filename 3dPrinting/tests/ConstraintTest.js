/*
 * author: Daniel Patterson
 *
 * Tests all individual Constraint types
 */
var should = require("should")
var constraints = require('../constraints/Constraint.js')
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

var rightValue, leftValue

beforeEach(function() {
 	rightValue = new ConstrainableValue()
  leftValue = new ConstrainableValue()
})

describe('SameAsConstraint', function(){ 
  it('should constrain a dependent value to be equal to the independent value',
    function(){
    new constraints.SameAsConstraint(leftValue, rightValue)
    rightValue.setValue(10)
    leftValue.getValue().should.equal(rightValue.getValue())
  })

  describe('#isSatisfied', function() {
  	it('should return true if both values have the same stored value', function() {
  		rightValue.setValue(10)
  		leftValue.setValue(10)
  		var sameAs = new constraints.SameAsConstraint(leftValue, rightValue)
  		sameAs.isSatisfied().should.be.true
  	})

  	it('should return false if the values are different', function() {
  		rightValue.setValue(10)
  		leftValue.setValue(12)
  		var sameAs = new constraints.SameAsConstraint(leftValue, rightValue)
  		sameAs.isSatisfied().should.be.false
  	})
  })
})

describe('OffsetByConstantConstraint', function() {
	it('should constrain a dependent value to be a constant distance from the ' 
		 + 'independent value', function() {
		new constraints.OffsetByConstantConstraint(leftValue, rightValue, 15)
		rightValue.setValue(10)
		leftValue.getValue().should.equal(rightValue.getValue() + 15)
	})

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.OffsetByConstantConstraint(leftValue, 
			                                                      rightValue, 
			                                                      15)
		constraint.isSatisfied().should.be.false
	})
})

describe('OffsetByConstrainableConstraint', function() {
	var offset

	beforeEach(function() {
		offset = new ConstrainableValue()
	})

	it('should constrain a dependent value to be a constrainable distance from ' 
		 + 'the independent value', function() {
		new constraints.OffsetByConstrainableConstraint(leftValue, 
			                                                   rightValue, 
			                                                   offset)
		offset.setValue(15)
		rightValue.setValue(10)
		leftValue.getValue().should.equal(rightValue.getValue() + offset.getValue())
	})

	it.skip('should constrain a dependent value to be a constrainable distance from ' 
		 + 'the independent value even if the offset is set after the independent ' 
		 + 'value', function() {
		new constraints.OffsetByConstrainableConstraint(leftValue, 
			                                                   rightValue, 
			                                                   offset)
		rightValue.setValue(10)
		offset.setValue(15)
		leftValue.getValue().should.equal(rightValue.getValue() + offset.getValue())
	})

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.OffsetByConstrainableConstraint(leftValue, 
			                                                           rightValue, 
			                                                           offset)
		offset.setValue(15)
		constraint.isSatisfied().should.be.false
	})

	it('should not be satisfied if the offset value is not set', function() {
		constraint = new constraints.OffsetByConstrainableConstraint(leftValue, 
			                                                           rightValue, 
			                                                           offset)
		leftValue.setValue(10)
		constraint.isSatisfied().should.be.false
	})
})

describe('ScaledByConstantConstraint', function() {
	it('should constrain a dependent value to be a constant factor larger than ' 
		 + 'the independent value', function() {
		new constraints.ScaledByConstantConstraint(leftValue, rightValue, 1.5)
		rightValue.setValue(10)
		leftValue.getValue().should.equal(rightValue.getValue() * 1.5)
	})

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.ScaledByConstantConstraint(leftValue, 
			                                                      rightValue, 
			                                                      1.5)
		constraint.isSatisfied().should.be.false
	})
})

describe('ScaleByConstrainableConstraint', function() {
	var factor

	beforeEach(function() {
		factor = new ConstrainableValue()
	})

	it('should constrain a dependent value to be a constrainable factor larger ' 
		 + 'than the independent value', function() {
		new constraints.ScaledByConstrainableConstraint(leftValue, 
			                                              rightValue, 
			                                              factor)
		rightValue.setValue(10)
		leftValue.getValue().should.equal(rightValue.getValue() * factor.getValue())
	})

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.ScaledByConstrainableConstraint(leftValue, 
			                                                           rightValue, 
			                                                           factor)
		constraint.isSatisfied().should.be.false
	})
})

describe('FunctionOfConstrainableConstraint', function() {
	var factor

	function cos(theta) {
		return Math.cos(theta)
	}

	beforeEach(function() {
		factor = new ConstrainableValue()
	})

	it('should constrain a dependent value to be a function of the independent ' 
		 + 'value', function() {
		new constraints.FunctionOfConstrainableConstraint(leftValue, 
			                                                rightValue, 
			                                                cos)
		rightValue.setValue(10)
		leftValue.getValue().should.equal(cos(rightValue.getValue()))
	})

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.FunctionOfConstrainableConstraint(leftValue, 
			                                                             rightValue, 
			                                                             cos)
		constraint.isSatisfied().should.be.false
	})
})