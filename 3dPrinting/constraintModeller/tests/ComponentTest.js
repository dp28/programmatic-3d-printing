/*
 * author: Daniel Patterson
 *
 * Tests the base class for all components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle
var ComponentSpecificationTest = require('../tests/ComponentSpecificationTest.js')
var ShapeTest = require('../tests/ShapeTest.js')

module.exports.shouldBehaveLikeComponent = shouldBehaveLikeComponent
module.exports.createFullySpecifiedTestComponent = function() {
	var component = new Component() 
	component.getCentre().fixAt(1, 3, 4)
	return component
}

describe('Component', function() {
	var component

	beforeEach(function() {
		component = new Component()
	})

	it('should behave like a Component', function() {
		shouldBehaveLikeComponent(component)
	})

	// Overidden by subclasses
	describe('#toSpecification', function() {
		it('should return null', function() {
			should(component.toSpecification()).be.null
		})
	})

	// Overidden by subclasses
	describe('#getTypeName', function() {
		it('should return "Component"', function() {
			component.getTypeName().should.equal('Component')
		})
	})
})

function shouldBehaveLikeComponent(component) {
	describe('Anything inheriting from Component', function() {

		describe('#getBoundingShape', function() {
			it('should return a Shape', function() {
				ShapeTest.shouldBehaveLikeShape(component.getBoundingShape())
			})
		})

		describe('#getCentre', function() {
			it('should return a Point', function() {
				component.getCentre().should.be.an.instanceOf(Point)
			})
		})

		describe('#setCentre', function() {
			var point, x =1, y = 2, z = 3

			beforeEach(function() {
				point = new Point()
				point.fixAt(x, y, z)
				component.setCentre(point)
			})

			it('should set the centre of the Component to have the same coordinates as '
				 + 'the passed-in Point', function() {
				component.getCentre().atSameLocationAs(point).should.be.true
			})
			
			it('should not have exactly the same Point as its centre', function() {
				component.getCentre().should.not.equal(point)
			})
		})

		describe('#toComponentSpecification', function() {
			var centreX = 1
			var centreY = 2
			var centreZ = 3

			function fixCentre() {
				component.getCentre().fixAt(centreX, centreY, centreZ)
			}

			it('should not be possible if the centre Point is not fully defined',
				 function() {
				component.toComponentSpecification.should.throw()
			})

			it('should be possible if the centre Point is fully defined ', function() {
				(function() {
											fixCentre()
											component.toComponentSpecification()
										}).should.not.throw()
	 		})

			it('should return a ComponentSpecification Object', function() {
				fixCentre()
				component.toComponentSpecification().should.be.an.instanceOf(ComponentSpecification)
			})

			describe('the returned ComponentSpecification', function() {
				var componentSpec

				beforeEach(function() {
					fixCentre()			
					componentSpec = component.toComponentSpecification()				
				})

				it('should behave like a ComponentSpecification derived from the '
					 + 'Component', function() {
					ComponentSpecificationTest.testComponentSpecification(componentSpec,
						                                                    component)
				})
			})
		})
	})
}