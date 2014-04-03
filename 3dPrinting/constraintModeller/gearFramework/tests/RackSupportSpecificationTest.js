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
 * Tests the RackSupportSpecification Object that is used to interface between  
 * the Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../../geometry/Point.js').Point
var Rack = require('../components/Rack.js').Rack
var RackSupportSpecification = require('../interface/RackSupportSpecification.js').RackSupportSpecification
var ComponentSpecificationTest = require('../../tests/ComponentSpecificationTest.js')

module.exports.testRackSupportSpecification = testRackSupportSpecification

function testRackSupportSpecification(supportSpec, support) {
	describe('RackSupportSpecification', function() {

		it('should behave like a ComponentSpecification', function() {
			ComponentSpecificationTest.testComponentSpecification(supportSpec, support)
		})

		describe('#length', function() {
			it('should have the correct value', function() {
				supportSpec.length.should.equal(support.getLength().getValue())
			})
		})

		describe('#width', function() {
			it('should have the correct value', function() {
				supportSpec.width.should.equal(support.getWidth().getValue())
			})
		})

		describe('#baseHeight', function() {
			it('should have the correct value', function() {
				supportSpec.baseHeight.should.equal(support.getBaseHeight().getValue())
			})
		})

		describe('#wallHeight', function() {
			it('should have the correct value', function() {
				supportSpec.wallHeight.should.equal(support.getWallHeight().getValue())
			})

			it('should be a number', function() {
				supportSpec.wallHeight.should.be.a.Number
			})
		})

		describe('#wallWidth', function() {
			it('should have the correct value', function() {
				supportSpec.wallWidth.should.equal(support.getWallWidth().getValue())
			})
		})

		describe('#wallCentreX', function() {
			it('should have the correct value', function() {
				supportSpec.wallCentreX.should.equal(support.getCentre().getX().getValue())
			})
		})

		describe('#wallCentreY', function() {
			it('should have the correct value', function() {
				supportSpec.wallCentreY.should.equal(support.getCentre().getY().getValue())
			})
		})

		describe('#wallCentreZ', function() {
			it('should have the correct value', function() {
				supportSpec.wallCentreZ.should.equal(support.getCentre().getZ().getValue())
			})
		})

		describe('#toothedFace', function() {
			it('should have the correct value', function() {
				supportSpec.toothedFace.should.equal(support.getToothedFace())
			})
		})
	})
}