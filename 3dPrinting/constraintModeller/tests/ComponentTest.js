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

module.exports.createFullySpecifiedTestComponent = function() {
	var component = new Component() 
	component.getCentre().fixAt(1, 3, 4)
	return component
}

module.exports.shouldBehaveLikeComponent = function(component) {
	it('should inherit from Component', function() {
		component.should.be.an.instanceOf(Component)
	})

	it('should have the same methods as a Component', function() {
		component.should.have.property('getCentre')
		component.should.have.property('getBoundingCircle')
		component.should.have.property('toComponentSpecification')
	})
}

describe('Component', function() {
	var component

	beforeEach(function() {
		component = new Component()
	})

	describe('#getBoundingCircle', function() {
		it('should return a circle', function() {
			component.getBoundingCircle().should.be.an.instanceOf(Circle)
		})
	})

	describe('#getCentre', function() {
		it('should return a Point', function() {
			component.getCentre().should.be.an.instanceOf(Point)
		})
	})

	describe('#toSpecification', function() {
		it('should return null', function() {
			should(component.toSpecification()).be.null
		})
	})

	describe('#getTypeName', function() {
		it('should return "Component"', function() {
			component.getTypeName().should.equal('Component')
		})
	})

	describe('#toComponentSpecification', function() {
		var centreX = 1
		var centreY = 2
		var centreZ = 3

		function setCentre() {
			component.getCentre().fixAt(centreX, centreY, centreZ)
		}

		it('should not be possible if the centre point is not fully defined',
			 function() {
			component.toComponentSpecification.should.throw()
		})

		it('should be possible if the centre point is fully defined ', function() {
			(function() {
										setCentre()
										component.toComponentSpecification()
									}).should.not.throw()
 		})

		it('should return a ComponentSpecification Object', function() {
			setCentre()
			component.toComponentSpecification().should.be.an.instanceOf(ComponentSpecification)
		})

		describe('the returned ComponentSpecification', function() {
			var componentSpec

			beforeEach(function() {
				setCentre()			
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