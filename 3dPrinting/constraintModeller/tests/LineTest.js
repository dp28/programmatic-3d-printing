/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a Line built from two Points
 */
var Point = require('../geometry/Point.js').Point
var Line = require('../geometry/Line.js').Line

describe('Line', function() {
	var line, firstPoint, secondPoint
	var startX = 0
	var startY = 0
	var endX = 4
	var endY = 3
	var xDifference = endX - startX
	var yDifference = endY - startY

	beforeEach(function() {
		firstPoint = new Point()
		firstPoint.setAt(startX, startY, 0)
		secondPoint = new Point()
		secondPoint.setAt(endX, endY, 0)
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
				centre.getX().getValue().should.equal(xDifference / 2)
			})
			
			it('should have a y coordinate at half the distance between the two '
				 + 'Points', function() {
				centre.getY().getValue().should.equal(yDifference / 2)
			})
		})

		describe('#getLength', function() {
			it('should be the hypotenuse of the triangle defined by the x and y '
				  + 'differences between the Points', function() {
				var length = 5 // Pythagorean triple
				line.getLength().should.equal(length)
			})
		})

		describe('#getAngleInRadians', function() {
			it('should return the angle this line makes with the x axis', function() {
				var angle = Math.atan2(3, 4)
				line.getAngleInRadians().should.be.approximately(angle, 0.001)
			})
		})
	})
})