/*
 * author: Daniel Patterson
 *
 * Tests the base class for all components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 

describe('Component', function() {
	var component

	beforeEach(function() {
		component = new Component()
	})

	describe('#getBoundingCircle', function() {
		it('should return a circle', function() {
			component.getBoundingCircle().should.have.property('getRadius')
			component.getBoundingCircle().should.have.property('getCentre')
		})
	})
})