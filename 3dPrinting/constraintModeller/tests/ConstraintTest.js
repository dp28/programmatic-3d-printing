/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

/*
 * author: Daniel Patterson
 *
 * Tests all individual Constraint types
 */
var should = require("should")
var util = require('util')
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

  it('should be one way - a change in the dependent value should not change the'
  	 + ' independent value', function() {
    new constraints.SameAsConstraint(leftValue, rightValue)
    rightValue.setValue(15)
    leftValue.setValue(10)
    leftValue.getValue().should.not.equal(rightValue.getValue())
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

  it('should be one way - a change in the dependent value should not change the '
  	 + 'independent value', function() {
    new constraints.OffsetByConstantConstraint(leftValue, rightValue, 15)
    rightValue.setValue(15)
    leftValue.setValue(10)
		leftValue.getValue().should.not.equal(rightValue.getValue() + 15)
  })

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.OffsetByConstantConstraint(leftValue, 
			                                                      rightValue, 
			                                                      15)
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

  it('should be one way - a change in the dependent value should not change the '
  	 + 'independent value', function() {
    new constraints.ScaledByConstantConstraint(leftValue, rightValue, 15)
    rightValue.setValue(15)
    leftValue.setValue(10)
		leftValue.getValue().should.not.equal(rightValue.getValue() * 15)
  })

	it('should not be satisfied if the left value is not set', function() {
		constraint = new constraints.ScaledByConstantConstraint(leftValue, 
			                                                      rightValue, 
			                                                      1.5)
		constraint.isSatisfied().should.be.false
	})
})
