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
 * Tests the LineSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Lines
 */
var should = require('should')
var SpecificationTest = require('../tests/SpecificationTest.js')

module.exports.testLineSpecification = testLineSpecification

function testLineSpecification(lineSpec, line) {
	
	describe('LineSpecification', function() {	

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(lineSpec)
		})
		
		it('should have the same length as the Line that created it', function() {
			lineSpec.length.should.equal(line.getLength())
		})

		it('should have the same angle as the Line that created it', function() {
			lineSpec.angleInRadians.should.equal(line.getAngleInRadians())
		})

		it('should have the same centre x coordinate as the Line that created it',
		   function() {
			lineSpec.centreX.should.equal(line.getCentre().getX().getValue())
		})

		it('should have the same centre y coordinate as the Line that created it',
		   function() {
			lineSpec.centreY.should.equal(line.getCentre().getY().getValue())
		})

		it('should have the same centre z coordinate as the Line that created it',
		   function() {
			lineSpec.centreZ.should.equal(line.getCentre().getZ().getValue())
		})

		it('should have the same width as the Line that created it',
		   function() {
			lineSpec.width.should.equal(line.getWidth())
		})

		it('should have the type property of "Line"', function() {
			lineSpec.type.should.equal("Line")
		})
	})
}
