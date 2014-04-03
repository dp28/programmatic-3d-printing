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
 * Tests a Rack component (part of a rack and pinion)
 */
var should = require('should')
var RackSupport = require('../components/RackSupport.js').RackSupport
var ComponentTest = require('../../tests/ComponentTest.js')
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var RackSupportSpecificationTest = require('../tests/RackSupportSpecificationTest.js')

describe('RackSupport', function() {
	var support 

	beforeEach(function() {
		support = new RackSupport() 
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(support)
	})

	describe('#getTypeName', function() {
		it('should return "RackSupport"', function() {
			support.getTypeName().should.equal("RackSupport")
		})
	})

	describe('#getBaseHeight', function() {
		it('should return a ConstrainableValue', function() {
			support.getBaseHeight().should.be.an.instanceOf(ConstrainableValue)
		})
	})	

	describe('#toSpecification', function() {

		beforeEach(function() {
			support.getCentre().setAt(1, 2, 3) // Necessary for component.toSpecification 
		})

		it('should not be possible if the length has not been set', function() {
			support.toSpecification.should.throw("Length not set")
		})

		it('should not be possible if the width has not been set', function() {
			support.setLength(5)
			support.setWidth(null)
			support.toSpecification.should.throw("Width not set")
		})

		it('should not be possible if the base height has not been set', function() {
			support.setLength(5)
			support.setBaseHeight(null)
			support.toSpecification.should.throw("Base height not set")
		})

		it('should not be possible if the wall height has not been set', function() {
			support.setLength(5)
			support.setBaseHeight(1)
			support.toSpecification.should.throw("Wall height not set")
		})

		it('should not be possible if the wall width has not been set', function() {
			support.setLength(5)
			support.setBaseHeight(1)
			support.setWallHeight(1)
			support.setWallWidth(null)
			support.toSpecification.should.throw("Wall width not set")
		})

		it('should not be possible if the wall centre has not been set', function() {
			support.setLength(5)
			support.setBaseHeight(1)
			support.setWallHeight(1)
			support.setWallWidth(1)
			support.toSpecification.should.throw("Wall centre not fully defined")
		})

		it('should not be possible if the toothed face has not been set', function() {
			support.setLength(5)
			support.setBaseHeight(1)
			support.setWallHeight(1)
			support.setWallWidth(1)
			support.setWallCentre(1, 2, 3)
			support.toSpecification.should.throw("Toothed face not set")
		})

		describe('the returned RackSupportSpecification', function() {
			var spec 

			beforeEach(function() {
				support.setLength(5)
				support.setBaseHeight(1)
				support.setWallHeight(1)
				support.setWallWidth(1)
				support.setWallCentre(1, 2, 3)
				support.setToothedFace("Front")
				spec = support.toSpecification() 
			})
			
			it('should behave like a RackSupportSpecification', function() {
				RackSupportSpecificationTest.testRackSupportSpecification(spec, support)
			})
		})
	})
})