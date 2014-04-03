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
 * This is a Node.js port of Simon Dobson's version in solid-py.
 *
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

describe('Test more complex constraint networks', function() {
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

	describe('A chain of dependencies, an equality and a constant offset', 
		       function() {

	  it('should set the second value to be equal to the first and the third to be '
	  	 + 'a the offset from the second', function() {  	  
			new constraints.OffsetByConstantConstraint(thirdValue, secondValue, 15)
			new constraints.SameAsConstraint(secondValue, firstValue)
			firstValue.setValue(10)
			secondValue.getValue().should.equal(firstValue.getValue())
			thirdValue.getValue().should.equal(10 + 15)
	  })
	})
})
