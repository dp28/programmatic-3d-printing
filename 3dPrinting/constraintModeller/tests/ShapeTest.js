/*
 * author: Daniel Patterson
 *
 * Tests the geometry of a constrainable shape
 */
var should = require('should')
var util = require('util')
var Shape = require('../geometry/Shape.js').Shape
var Point = require('../geometry/Point.js').Point
var Rectangle = require('../geometry/Rectangle.js').Rectangle

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
		var centreX = 1
		var centreY = 2
		var centreZ = 3

		describe('#setCentre', function() {
			var point
			
			beforeEach(function() {
				point = new Point()
				point.fixAt(centreX, centreY, centreZ)
				shape.setCentre(point)
			})

			it('should have an x coordinate of ' + centreX, function() {
				shape.getCentre().getX().getValue().should.equal(centreX)
			})

			it('should have a y coordinate of ' + centreY, function() {
				shape.getCentre().getY().getValue().should.equal(centreY)
			})

			it('should have a z coordinate of ' + centreZ, function() {
				shape.getCentre().getZ().getValue().should.equal(centreZ)
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

		describe('#isAdjacentTo Circle', function() {
			function createCircle() {
				var circle = new Circle()
				circle.setRadius(1)
				return circle
			}

			shouldBeAbleToBeAdjacentTo(shape, createCircle)
		})

		describe('#isAdjacentTo Rectangle', function() {
			function createRectangle() {
				var rectangle = new Rectangle()
				rectangle.setLength(2)
				rectangle.setWidth(2)
				return rectangle
			}

			shouldBeAbleToBeAdjacentTo(shape, createRectangle)
		})

		function shouldBeAbleToBeAdjacentTo(testShape, adjacentShapeTypeCreation) {
			describe('#isAdjacentTo with specific adjacent Shape', function() {
				if (shape.getType() != "Shape") {
					var adjacentShape

					beforeEach(function() {
						point = new Point()
						adjacentShape = adjacentShapeTypeCreation()
					})

					it('should return false if the adjacent Shape is not touching the '
						 + 'test Shape', function() {
						point.setAt(centreX - 100, centreY, centreZ)
						adjacentShape.setCentre(point)
						shape.isAdjacentTo(adjacentShape).should.be.false
					})

					it('should return true if the adjacent Shape is to it\'s left', function() {				
						point.setAt(centreX - 1, centreY, centreZ)
						adjacentShape.setCentre(point)
						util.puts()
						shape.isAdjacentTo(adjacentShape).should.be.true
					})

					it('should return true if the adjacent Shape is to it\'s right', function() {				
						point.setAt(centreX + 1, centreY, centreZ)
						adjacentShape.setCentre(point)
						shape.isAdjacentTo(adjacentShape).should.be.true
					})

					it('should return true if the adjacent Shape is to it\'s front', function() {				
						point.setAt(centreX, centreY + 1, centreZ)
						adjacentShape.setCentre(point)
						shape.isAdjacentTo(adjacentShape).should.be.true
					})

					it('should return true if the adjacent Shape is to it\'s back', function() {				
						point.setAt(centreX, centreY - 1, centreZ)
						adjacentShape.setCentre(point)
						shape.isAdjacentTo(adjacentShape).should.be.true
					})
				}			
			})
		}
	})
}
