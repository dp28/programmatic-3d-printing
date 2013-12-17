/*
 * Tests progressively more complex constraint networks
 */
var should = require("should")
var constraints = require('../constraints/Constraint.js')
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue 

var firstValue = new ConstrainableValue()
var secondValue = new ConstrainableValue()
var thirdValue = new ConstrainableValue()

beforeEach(function() {
	firstValue = new ConstrainableValue()
	secondValue = new ConstrainableValue()
	thirdValue = new ConstrainableValue()
})

describe('Two values depending on the same value', function() {
	it('should set both dependent values to the stored value of the independent ' 
		 + 'value', function() {
		new constraints.SameAsConstraint(thirdValue, firstValue)
		new constraints.SameAsConstraint(secondValue, firstValue)
		firstValue.setValue(10)
		secondValue.getValue().should.equal(firstValue.getValue())
		thirdValue.getValue().should.equal(firstValue.getValue())
	})
})

describe('A chain of equality dependencies', function() {
	it('should set all the values to be equal', function() {
		new constraints.SameAsConstraint(thirdValue, secondValue)
		new constraints.SameAsConstraint(secondValue, firstValue)
		firstValue.setValue(10)
		secondValue.getValue().should.equal(firstValue.getValue())
		thirdValue.getValue().should.equal(secondValue.getValue())
	})
})

describe('A chain of dependencies, an equality and a constant offset', 
	       function() {
  it('should set the second value to be equal to the first and the third to be '
  	 + 'a constant from the second', function() {  	  
		new constraints.OffsetByConstantConstraint(thirdValue, secondValue, 15)
		new constraints.SameAsConstraint(secondValue, firstValue)
		firstValue.setValue(10)
		secondValue.getValue().should.equal(firstValue.getValue())
		thirdValue.getValue().should.equal(secondValue.getValue() + 15)
  })
})

describe('A chain of dependencies, an equality and a constrainable offset', 
	       function() {
	var offset = new ConstrainableValue()

  it('should set the second value to be equal to the first and the third to be '
  	 + 'a the offset from the second', function() {  	  
		new constraints.OffsetByConstrainableValueConstraint(thirdValue,
		                                                     secondValue,
		                                                     offset)
		new constraints.SameAsConstraint(secondValue, firstValue)
		offset.setValue(15)
		firstValue.setValue(10)
		secondValue.getValue().should.equal(firstValue.getValue())
		thirdValue.getValue().should.equal(10 + 15)
  })
})
