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
 * Tests the BaseSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Bases
 */
var should = require('should')
var SpecificationTest = require('../../tests/SpecificationTest.js') 

module.exports.testBaseSpecification = testBaseSpecification

function testBaseSpecification(baseSpec, base) {
	
	describe('BaseSpecification', function() {	
		it('should have the same height as the Base that created it', function() {
			baseSpec.height.should.equal(base.getHeight().getValue())
		})

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(baseSpec)
		})

		describe('.parts', function() {
			it('should contain the specifications of all the Lines in the Base',
			   function() {
			  var lines = base.getLines()
				for (var i = lines.length - 1; i >= 0; i--) {
					containsSpecificationOf(baseSpec.parts, lines[i]).should.be.true
				};
			})

			it('should contain the specifications of all the Circles in the Base',
			   function() {
			  var circles = base.getCircles()
				for (var i = circles.length - 1; i >= 0; i--) {
					containsSpecificationOf(baseSpec.parts, circles[i]).should.be.true
				};
			})

			function containsSpecificationOf(partSpecs, part) {
				for (var i = partSpecs.length - 1; i >= 0; i--) {
					if (isSpecificationOf(part, partSpecs[i]))
						return true
				};

				return false
			}

			function isSpecificationOf(shape, specification) {
				var shapeSpecString = JSON.stringify(shape.toSpecification())
				var specificationString = JSON.stringify(specification)
				return shapeSpecString == specificationString
			}
		})
	})
}