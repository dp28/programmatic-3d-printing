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

	describe('distance to boundary functions', function() {
		describe('#getDistanceToRightBoundary', function() {
			it('should return a number', function() {
				var message = "getDistanceToRightBoundary() not implemented in Shape " +
				              "base class"
				shape.getDistanceToRightBoundary.should.throw(message)
			})
		})

		describe('#getDistanceToLeftBoundary', function() {
			it('should return a number', function() {
				var message = "getDistanceToLeftBoundary() not implemented in Shape " +
				              "base class"
				shape.getDistanceToLeftBoundary.should.throw(message)
			})
		})

		describe('#getDistanceToFrontBoundary', function() {
			it('should return a number', function() {
				var message = "getDistanceToFrontBoundary() not implemented in Shape " +
				              "base class"
				shape.getDistanceToFrontBoundary.should.throw(message)
			})
		})

		describe('#getDistanceToBackBoundary', function() {
			it('should return a number', function() {
				var message = "getDistanceToBackBoundary() not implemented in Shape " +
				              "base class"
				shape.getDistanceToBackBoundary.should.throw(message)
			})
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

		describe('distance to boundary functions', function() {
			if (shape.getType() != "Shape") {			
				// These methods are only implemented in Shape subclasses

				describe('#getDistanceToRightBoundary', function() {
					it('should return a number', function() {
						shape.getDistanceToRightBoundary().should.be.a.Number
					})
				})

				describe('#getDistanceToLeftBoundary', function() {
					it('should return a number', function() {
						shape.getDistanceToLeftBoundary().should.be.a.Number
					})
				})

				describe('#getDistanceToFrontBoundary', function() {
					it('should return a number', function() {
						shape.getDistanceToFrontBoundary().should.be.a.Number
					})
				})

				describe('#getDistanceToBackBoundary', function() {
					it('should return a number', function() {
						shape.getDistanceToBackBoundary().should.be.a.Number
					})
				})
			}
		})
	})
}
