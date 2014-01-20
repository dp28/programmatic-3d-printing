/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a constrainable circle
 */
var should = require('should')
var Circle = require('../geometry/Circle.js').Circle
var Point = require('../geometry/Point.js').Point

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
			component.getCentre().should.not.equal(point)
		})
	})

	describe('#setRadius', function() {
		beforeEach(function() {
			circle.setRadius(10)
		})

		it('should set the radius of the circle', function() {
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
})