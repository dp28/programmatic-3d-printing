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
 * Tests Spindle objects
 */
var should = require('should')
var Component = require('../../components/Component.js').Component
var Spindle = require('../components/Spindle.js').Spindle
var ComponentSpecification = require('../../interface/ComponentSpecification.js').ComponentSpecification
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var ComponentTest = require('../../tests/ComponentTest.js')
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
})