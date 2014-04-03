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
 * Tests if the intersections of different shapes can be detected
 */
var should = require('should')
var ShapeIntersectionChecker = require('../geometry/ShapeIntersectionChecker.js').ShapeIntersectionChecker
var Rectangle = require('../geometry/Rectangle.js').Rectangle
var Point = require('../geometry/Point.js').Point

describe('ShapeIntersectionChecker', function() {
	var checker

	beforeEach(function() {
		checker = new ShapeIntersectionChecker() 
	})

	describe('#areIntersecting', function() {
		var first, second, secondCentreIntersecting
		var secondCentreJustTouching, secondCentreNotIntersecting

		beforeEach(function() {
			secondCentreIntersecting = new Point() 
			secondCentreJustTouching = new Point() 
			secondCentreNotIntersecting = new Point() 
		})

		function intersectionShouldBeDetected() {	
			describe('ShapeIntersectionChecker#areIntersecting', function() {		
				describe('if the Shapes are intersecting', function() {
					it('should return true', function() {
						second.setCentre(secondCentreIntersecting)
						checker.areIntersecting(first, second).should.be.true
					})
				})
				
				describe('if the Shapes are just touching', function() {
					it('should return true', function() {
						second.setCentre(secondCentreJustTouching)
						checker.areIntersecting(first, second).should.be.true
					})
				})
				
				describe('if the Shapes are not intersecting', function() {
					it('should return false', function() {
						second.setCentre(secondCentreNotIntersecting)
						checker.areIntersecting(first, second).should.be.false
					})
				})		
			})
		}

		describe('if both arguments are Circles', function() {
			beforeEach(function() {
				first = new Circle()
				first.getCentre().setAt(0, 0, 0)
				first.setRadius(1)
				second = new Circle()
				second.setRadius(1)
				secondCentreIntersecting.setAt(0.5, 0.5, 0)
				secondCentreJustTouching.setAt(2, 0, 0)
				secondCentreNotIntersecting.setAt(11.5, 11.5, 0)
			})

			it('should detect any intersections', function() {
				intersectionShouldBeDetected()
			})
		})

		describe('if both arguments are Rectangles', function() {
			beforeEach(function() {
				first = new Rectangle()
				first.getCentre().setAt(0, 0, 0)
				first.setLength(2)
				first.setWidth(2)
				second = new Rectangle()
				second.setLength(2)
				second.setWidth(2)
				secondCentreIntersecting.setAt(0.5, 0.5, 0)
				secondCentreJustTouching.setAt(2, 0, 0)
				secondCentreNotIntersecting.setAt(11.5, 11.5, 0)
			})
			
			it('should detect any intersections', function() {
				intersectionShouldBeDetected()
			})		
		})

		describe('if one argument is a Circle and the other is a Rectangle', function() {
			beforeEach(function() {
				secondCentreIntersecting.setAt(0.5, 0.5, 0)
				secondCentreJustTouching.setAt(2, 0, 0)
				secondCentreNotIntersecting.setAt(11.5, 11.5, 0)
			})
			
			it('should detect any intersections by treating the Circle as a ' 
				 + 'Rectangle', function() {	
				first = new Rectangle()
				first.setLength(2)
				first.setWidth(2)			
				first.getCentre().setAt(0, 0, 0)

				second = new Circle()
				second.setRadius(1)

				intersectionShouldBeDetected()
			})		
			
			it('should be independent of order', function() {	
				second = new Rectangle()
				second.setLength(2)
				second.setWidth(2)			

				first = new Circle()
				first.setRadius(1)
				first.getCentre().setAt(0, 0, 0)

				intersectionShouldBeDetected()
			})
		})
	})	
})