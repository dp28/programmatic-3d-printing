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
		
		it('should not be possible if the angle is not set', function() {
			rectangle.setAngleInRadians(null)
			rectangle.toSpecification.should.throw("Angle not set")
		})

		it('should not be possible if the centre is not set even if the angle is',
		   function() {
			rectangle.setAngleInRadians(1)
			rectangle.toSpecification.should.throw("Centre not fully defined")
		})

		it('should not be possible if the length is not set even if the angle and '
			 + 'centre are set', function() {
			rectangle.setAngleInRadians(1)
			rectangle.getCentre().setAt(0, 0, 0)
			rectangle.toSpecification.should.throw("Length not set")
		})

		it('should not be possible if the width is not set even if the angle, width'
			 + ' and centre are set', function() {
			rectangle.setAngleInRadians(1)
			rectangle.getCentre().setAt(0, 0, 0)
			rectangle.setLength(1)
			rectangle.setWidth(null)
			rectangle.toSpecification.should.throw("Width not set")
		})

		it('should be possible if both the centre and radius are set', function() {
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