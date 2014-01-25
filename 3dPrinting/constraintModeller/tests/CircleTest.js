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

describe('Circle', function() {
	var circle

	beforeEach(function() {
		circle = new Circle()
	})

	describe('#setCentre', function() {
		var point
		
		beforeEach(function() {
			point = new Point()
			point.fixAt(1, 2, 3)
			circle.setCentre(point)
		})

		it('should have an x coordinate of 1', function() {
			circle.getCentre().getX().getValue().should.equal(1)
		})

		it('should have a y coordinate of 2', function() {
			circle.getCentre().getY().getValue().should.equal(2)
		})

		it('should have a z coordinate of 3', function() {
			circle.getCentre().getZ().getValue().should.equal(3)
		})
		
		it('should not have exactly the same Point as its centre', function() {
			circle.getCentre().should.not.equal(point)
		})
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
})