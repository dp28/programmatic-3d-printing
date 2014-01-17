/*
 * author: Daniel Patterson
 *
 * Tests the base class for all components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 
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
})