/*
 * author: Daniel Patterson
 *
 * Tests the ComponentSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../geometry/Point.js').Point
var Component = require('../components/Component.js').Component
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

module.exports.testComponentSpecification = testComponentSpecification

function testComponentSpecification(componentSpec, component) {	
	var centre = component.getCentre()

	describe('#centreX', function() {
		it('should have the correct value', function() {
			componentSpec.centreX.should.equal(centre.getX().getValue())
		})
	})

	describe('#centreY', function() {
		it('should have the correct value', function() {
			componentSpec.centreY.should.equal(centre.getY().getValue())
		})
	})

	describe('#centreZ', function() {
		it('should have the correct value', function() {
			componentSpec.centreZ.should.equal(centre.getZ().getValue())
		})
	})

	describe('#type', function() {
		it('should have the correct value', function() {
			componentSpec.type.should.equal(component.getTypeName())
		})
	})
}