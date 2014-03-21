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

	describe('Rectangle.createFromPoints', function() {
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
			var start = new Point()
			start.setAt(startX, startY, startZ)
			var end = new Point()
			end.setAt(endX, endY, endZ)
			rectangle = Rectangle.createFromPoints(start, end) 
		})
		
		it('should not be possible without two Points as arguments', function() {
			(function(){
				Rectangle.createFromPoints()
			}).should.throw("Two Points required")
		})

		describe('#getCentre', function() {
			it('should return a Point', function() {
				rectangle.getCentre().should.be.an.instanceof(Point)
			})

			describe('the returned Point', function() {
				var centre 

				beforeEach(function() {
					centre = rectangle.getCentre() 
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

		describe('#getLength', function() {
			it('should be the hypotenuse of the triangle defined by the x and y '
				  + 'differences between the Points', function() {
				var length = Math.sqrt(xDifference * xDifference 
									             + yDifference * yDifference
									             + zDifference * zDifference)
				rectangle.getLength().getValue().should.equal(length)
			})
		})

		describe('#getAngleInRadians', function() {
			it('should return the angle this rectangle makes with the x axis', function() {
				var angle = Math.atan2(yDifference, xDifference)
				rectangle.getAngleInRadians().getValue().should.be.approximately(angle, 0.001)
			})
		})
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