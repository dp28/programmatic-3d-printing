/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a constrainable circle
 */
var should = require('should')
var Circle = require('../geometry/Circle.js').Circle
var Point = require('../geometry/Point.js').Point
var CircleSpecification = require('../interface/CircleSpecification.js').CircleSpecification
var CircleSpecificationTest = require('../tests/CircleSpecificationTest.js')
var ShapeTest = require('../tests/ShapeTest.js')

describe('Circle', function() {
	var circle

	beforeEach(function() {
		circle = new Circle()
	})

	it('should behave like a Shape', function() {
		ShapeTest.shouldBehaveLikeShape(circle)
	})

	describe('#setRadius', function() {
		beforeEach(function() {
			circle.setRadius(10)
		})

		it('should set the radius of the Circle', function() {
			circle.getRadius().getValue().should.equal(10)
		})
	})

	describe('#getDiameter', function() {
		var radius = 10

		beforeEach(function() {
			circle.setRadius(radius)
		})

		it('should be twice the radius', function() {
			circle.getDiameter().getValue().should.equal(2 * radius)
		})
	})

	describe('#toSpecification', function() {

		function setRadiusAndCentre() {
			circle.setRadius(10)
			point = new Point()
			point.fixAt(1, 2, 3)
			circle.setCentre(point)
		}

		beforeEach(function() {
			circle = new Circle() 
		})
		
		it('should not be possible if the radius is not set', function() {
			circle.toSpecification.should.throw("Radius not set")
		})

		it('should not be possible if the centre is not set even if the radius is',
		   function() {
			circle.setRadius(1)
			circle.toSpecification.should.throw("Centre not fully defined")
		})

		it('should be possible if both the centre and radius are set', function() {
			(function() {
				setRadiusAndCentre()
				circle.toSpecification()
			}).should.not.throw()
		})

		describe('the returned CircleSpecification', function() {
			var circleSpec

			beforeEach(function() {
				setRadiusAndCentre()
				circleSpec = circle.toSpecification() 
			})

			it('should behave like a CircleSpecification', function() {
				CircleSpecificationTest.testCircleSpecification(circleSpec, circle)
			})			
		})
	})

	describe('distance to boundary functions', function() {
		var radius = 10

		beforeEach(function() {
			circle.setRadius(radius)
		})		

		describe('#getDistanceToRightBoundary', function() {
			it('should return the value of the radius', function() {
				circle.getDistanceToRightBoundary().should.equal(radius)
			})
		})

		describe('#getDistanceToLeftBoundary', function() {
			it('should return the negative of the value of the radius', function() {
				circle.getDistanceToLeftBoundary().should.equal(-radius)
			})
		})

		describe('#getDistanceToFrontBoundary', function() {
			it('should return the value of the radius', function() {
				circle.getDistanceToFrontBoundary().should.equal(radius)
			})
		})

		describe('#getDistanceToBackBoundary', function() {
			it('should return the negative of the value of the radius', function() {
				circle.getDistanceToBackBoundary().should.equal(-radius)
			})
		})
	}) 
})