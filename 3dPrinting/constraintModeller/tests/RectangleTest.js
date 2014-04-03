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
 * Tests the geometry of a Rectangle built from two Points
 */
var Point = require('../geometry/Point.js').Point
var Rectangle = require('../geometry/Rectangle.js').Rectangle
var RectangleSpecificationTest = require('../tests/RectangleSpecificationTest.js')
var ShapeTest = require('../tests/ShapeTest.js')

describe('Rectangle', function() { 
	var rectangle, firstPoint, secondPoint

	beforeEach(function() {
		rectangle = new Rectangle()
	})

	it('should behave like a Shape', function() {
		ShapeTest.shouldBehaveLikeShape(rectangle)
	})

	describe('#getWidth', function() {
		it('should have a default value of 0', function() {
			rectangle.getWidth().getValue().should.equal(0)
		})
	})

	describe('#toSpecification', function() {

		it('should not be possible if the centre is not set even if the angle is',
		   function() {
			rectangle.toSpecification.should.throw("Centre not fully defined")
		})

		it('should not be possible if the length is not set even if the angle and '
			 + 'centre are set', function() {
			rectangle.getCentre().setAt(0, 0, 0)
			rectangle.toSpecification.should.throw("Length not set")
		})

		it('should not be possible if the width is not set even if the angle, width'
			 + ' and centre are set', function() {
			rectangle.getCentre().setAt(0, 0, 0)
			rectangle.setLength(1)
			rectangle.setWidth(null)
			rectangle.toSpecification.should.throw("Width not set")
		})

		it('should be possible if the centre, length and width are set', function() {
			(function() {
				rectangle.getCentre().setAt(0, 0, 0)
				rectangle.setLength(1)
				rectangle.toSpecification()
			}).should.not.throw()
		})

		describe('the returned RectangleSpecification', function() {
			var rectangleSpec

			beforeEach(function() {
				rectangle.getCentre().setAt(0, 0, 0)
				rectangle.setLength(0)
				rectangleSpec = rectangle.toSpecification() 
			})

			it('should behave like a RectangleSpecification', function() {
				RectangleSpecificationTest.testRectangleSpecification(rectangleSpec, rectangle)
			})			
		})
	})
})