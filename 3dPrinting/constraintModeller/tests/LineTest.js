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
 * Tests the geometry of a Line built from two Points
 */
var Point = require('../geometry/Point.js').Point
var Line = require('../geometry/Line.js').Line
var LineSpecificationTest = require('../tests/LineSpecificationTest.js')

describe('Line', function() { 
	var line, firstPoint, secondPoint
	var startX = 1
	var startY = 2
	var startZ = 3
	var endX = 4
	var endY = 3
	var endZ = 1
	var xDifference = endX - startX
	var yDifference = endY - startY
	var zDifference = endZ - startZ

	beforeEach(function() {
		firstPoint = new Point()
		firstPoint.setAt(startX, startY, startZ)
		secondPoint = new Point()
		secondPoint.setAt(endX, endY, endZ)
		line = new Line(firstPoint, secondPoint)
	})

	describe('construction', function() {
		it('should not be possible without two Points as arguments', function() {
			(function(){
				new Line()
			}).should.throw("Two Points required")
		})
	})

	describe('#getCentre', function() {
		it('should return a Point', function() {
			line.getCentre().should.be.an.instanceof(Point)
		})

		describe('the returned Point', function() {
			var centre 

			beforeEach(function() {
				centre = line.getCentre() 
			})
			
			it('should have an x coordinate at half the distance between the two '
				 + 'Points', function() {
				centre.getX().getValue().should.equal(startX + xDifference / 2)
			})
			
			it('should have a y coordinate at half the distance between the two '
				 + 'Points', function() {
				centre.getY().getValue().should.equal(startY + yDifference / 2)
			})
			
			it('should have a z coordinate at half the distance between the two '
				 + 'Points', function() {
				centre.getZ().getValue().should.equal(startZ + zDifference / 2)
			})
		})		
	})

	describe('#getWidth', function() {
		it('should have a default value of 4', function() {
			line.getWidth().should.equal(4)
		})
	})

	describe('#getLength', function() {
		it('should be the hypotenuse of the triangle defined by the x and y '
			  + 'differences between the Points', function() {
			var length = Math.sqrt(xDifference * xDifference 
								             + yDifference * yDifference
								             + zDifference * zDifference)
			line.getLength().should.equal(length)
		})
	})

	describe('#getAngleInRadians', function() {
		it('should return the angle this line makes with the x axis', function() {
			var angle = Math.atan2(yDifference, xDifference)
			line.getAngleInRadians().should.be.approximately(angle, 0.001)
		})
	})

	describe('#toSpecification', function() {
		describe('the returned LineSpecification', function() {
			var lineSpec

			beforeEach(function() {
				lineSpec = line.toSpecification() 
			})

			it('should behave like a LineSpecification', function() {
				LineSpecificationTest.testLineSpecification(lineSpec, line)
			})			
		})
	})
})