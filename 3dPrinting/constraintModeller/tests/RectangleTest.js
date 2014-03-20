/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a Rectangle built from two Points
 */
var Point = require('../geometry/Point.js').Point
var Rectangle = require('../geometry/Rectangle.js').Rectangle
var RectangleSpecificationTest = require('../tests/RectangleSpecificationTest.js')

describe('Rectangle', function() {
	var rectangle, firstPoint, secondPoint
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
		rectangle = new Rectangle(firstPoint, secondPoint)
	})

	describe('construction', function() {
		it('should not be possible without two Points as arguments', function() {
			(function(){
				new Rectangle()
			}).should.throw("Two Points required")
		})
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

	describe('#getWidth', function() {
		it('should have a default value of 1', function() {
			rectangle.getWidth().should.equal(1)
		})
	})

	describe('#getLength', function() {
		it('should be the hypotenuse of the triangle defined by the x and y '
			  + 'differences between the Points', function() {
			var length = Math.sqrt(xDifference * xDifference 
								             + yDifference * yDifference
								             + zDifference * zDifference)
			rectangle.getLength().should.equal(length)
		})
	})

	describe('#getAngleInRadians', function() {
		it('should return the angle this rectangle makes with the x axis', function() {
			var angle = Math.atan2(yDifference, xDifference)
			rectangle.getAngleInRadians().should.be.approximately(angle, 0.001)
		})
	})

	describe('#toSpecification', function() {
		describe('the returned RectangleSpecification', function() {
			var rectangleSpec

			beforeEach(function() {
				rectangleSpec = rectangle.toSpecification() 
			})

			it('should behave like a RectangleSpecification', function() {
				RectangleSpecificationTest.testRectangleSpecification(rectangleSpec, rectangle)
			})			
		})
	})
})