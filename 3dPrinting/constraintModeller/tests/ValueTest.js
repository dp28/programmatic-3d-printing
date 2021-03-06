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
 * This is a Node.js port of Simon Dobson's version in solid-py, with 
 * convenience methods for creating Constraints
 *
 * Tests of ConstrainableValues
 */
var should = require("should")
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue 

describe('ConstrainableValue', function() {
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

	describe('Two-way Constraint functions', function() {
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

			it('should constrain the other value to be the same as this value if this'
				 + ' value is set first', function() {
        value.sameAs(anotherValue)
        value.setValue(10)
        value.getValue().should.equal(anotherValue.getValue())
        value.getValue().should.equal(10)
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

			it('should constrain the other value to be a constant offset from this '
				 + 'value if this value is set first', function() {
        value.offsetByConstant(anotherValue, 15)
        value.setValue(10)
        value.getValue().should.equal(anotherValue.getValue() + 15)
        anotherValue.getValue().should.equal(value.getValue() - 15)
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

			it('should constrain the other value to be a constant factor smaller than'
				 + ' this value if this value is set first', function() {
        value.scaledByConstant(anotherValue, 15)
        value.setValue(10)
        value.getValue().should.equal(anotherValue.getValue() *  15)
        anotherValue.getValue().should.be.approximately(value.getValue() /  15, 
        	                                              0.001)
			})
		})
	})	
})