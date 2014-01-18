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


	describe('#toCompleteSpecification', function() {
		var centreX = 1
		var centreY = 2
		var centreZ = 3

		function setCentre() {
			component.getCentre().fixAt(centreX, centreY, centreZ)
		}

		it('should not be possible if the centre point is not fully defined',
			 function() {
			component.toCompleteSpecification.should.throw()
		})

		it('should be possible if the centre point is fully defined ', function() {
			(function() {
										setCentre()
										component.toCompleteSpecification()
									}).should.not.throw()
 		})

		it('should return a ComponentSpecification Object', function() {
			setCentre()
			component.toCompleteSpecification().should.be.an.instanceOf(ComponentSpecification)
		})

		describe('the returned ComponentSpecification', function() {
			var componentSpec

			beforeEach(function() {
				setCentre()			
				componentSpec = component.toCompleteSpecification()				
			})

			it('should have the same centre x coordinate as the Component', function() {
				componentSpec.centreX.should.equal(centreX)
			})

			it('should have the same centre y coordinate as the Component', function() {
				componentSpec.centreY.should.equal(centreY)
			})

			it('should have the same centre z coordinate as the Component', function() {
				componentSpec.centreZ.should.equal(centreZ)
			})
		})
	})
})