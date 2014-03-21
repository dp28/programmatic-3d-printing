/*
 * author: Daniel Patterson
 *
 * Tests if the intersections of different shapes can be detected
 */
var should = require('should')
var ShapeIntersectionChecker = require('../geometry/ShapeIntersectionChecker.js').ShapeIntersectionChecker
var Rectangle = require('../geometry/Rectangle.js').Rectangle

describe('ShapeIntersectionChecker', function() {
	var checker

	beforeEach(function() {
		checker = new ShapeIntersectionChecker() 
	})

	describe('#areIntersecting', function() {
		var first, second

		describe('if both arguments are Circles', function() {
			beforeEach(function() {
				first = new Circle()
				first.getCentre().setAt(0, 0, 0)
				first.setRadius(1)
				second = new Circle()
				second.setRadius(1) 
			})
			
			describe('if the Circles are intersecting', function() {
				it('should return true', function() {
					second.getCentre().setAt(0.5, 0.5, 0)
					checker.areIntersecting(first, second).should.be.true
				})
			})
			
			describe('if the Circles are just touching', function() {
				it('should return true', function() {
					second.getCentre().setAt(2, 0, 0)
					checker.areIntersecting(first, second).should.be.true
				})
			})
			
			describe('if the Circles are not intersecting', function() {
				it('should return false', function() {
					second.getCentre().setAt(11.5, 11.5, 0)
					checker.areIntersecting(first, second).should.be.false
				})
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
			})
			
			describe('if the Rectangles are intersecting', function() {
				it('should return true', function() {
					second.getCentre().setAt(0.5, 0.5, 0)
					checker.areIntersecting(first, second).should.be.true
				})
			})
			
			describe('if the Rectangles are just touching', function() {
				it('should return true', function() {
					second.getCentre().setAt(2, 0, 0)
					checker.areIntersecting(first, second).should.be.true
				})
			})
			
			describe('if the Rectangles are not intersecting', function() {
				it('should return false', function() {
					second.getCentre().setAt(11.5, 11.5, 0)
					checker.areIntersecting(first, second).should.be.false
				})
			})
			
		})
	})
	
})