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
 * Tests the RackSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../../geometry/Point.js').Point
var Rack = require('../components/Rack.js').Rack
var RackSpecification = require('../interface/RackSpecification.js').RackSpecification
var ToothedComponentSpecificationTest = require('../tests/ToothedComponentSpecificationTest.js')

module.exports.testRackSpecification = testRackSpecification

function testRackSpecification(rackSpec, rack) {
	describe('RackSpecification', function() {

		it('should behave like a ToothedSpecification', function() {
			ToothedComponentSpecificationTest.testToothedComponentSpecification(rackSpec, rack)
		})

		describe('#linearPitch', function() {
			it('should have the correct value', function() {
				rackSpec.linearPitch.should.equal(rack.getLinearPitch())
			})
		})

		describe('#length', function() {
			it('should have the correct value', function() {
				rackSpec.length.should.equal(rack.getLength().getValue())
			})
		})

		describe('#width', function() {
			it('should have the correct value', function() {
				rackSpec.width.should.equal(rack.getWidth().getValue())
			})
		})

		describe('#toothedFace', function() {
			it('should have the correct value', function() {
				rackSpec.toothedFace.should.equal(rack.getToothedFace())
			})
		})
	})
}