/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a constrainable shape
 */
var should = require('should')
var Shape = require('../geometry/Shape.js').Shape
var Point = require('../geometry/Point.js').Point

module.exports.shouldBehaveLikeShape = shouldBehaveLikeShape

describe('Shape', function() {
	var shape 

	beforeEach(function() {
		shape = new Shape() 
	})

	it('should behave like a Shape', function() {
		shouldBehaveLikeShape(shape)
	})

	// Overidden by subclasses
	describe('#getType', function() {
		it('should return "Shape"', function() {
			shape.getType().should.equal('Shape')
		})
	})
	
})

function shouldBehaveLikeShape(shape) {
	describe('Anything inheriting from Shape', function() {

		describe('#setCentre', function() {
			var point
			
			beforeEach(function() {
				point = new Point()
				point.fixAt(1, 2, 3)
				shape.setCentre(point)
			})

			it('should have an x coordinate of 1', function() {
				shape.getCentre().getX().getValue().should.equal(1)
			})

			it('should have a y coordinate of 2', function() {
				shape.getCentre().getY().getValue().should.equal(2)
			})

			it('should have a z coordinate of 3', function() {
				shape.getCentre().getZ().getValue().should.equal(3)
			})
			
			it('should not have exactly the same Point as its centre', function() {
				shape.getCentre().should.not.equal(point)
			})
		})

		describe('#getRightPoint', function() {
			it('should return a Point', function() {
				shape.getRightPoint().should.be.an.instanceof(Point)
			})
		})

		describe('#getLeftPoint', function() {
			it('should return a Point', function() {
				shape.getLeftPoint().should.be.an.instanceof(Point)
			})
		})

		describe('#getFrontPoint', function() {
			it('should return a Point', function() {
				shape.getFrontPoint().should.be.an.instanceof(Point)
			})
		})

		describe('#getBackPoint', function() {
			it('should return a Point', function() {
				shape.getBackPoint().should.be.an.instanceof(Point)
			})
		})
	})
}
