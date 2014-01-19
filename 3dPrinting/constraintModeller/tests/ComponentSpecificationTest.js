/*
 * author: Daniel Patterson
 *
 * Tests the ComponentSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../geometry/Point.js').Point
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

describe('ComponentSpecification', function() {
	var componentSpec
	var centreX = 1
	var centreY = 2
	var centreZ = 3
	var centre = new Point()
	centre.fixAt(centreX, centreY, centreZ)
	var type = 'Component'

	before(function() {
		componentSpec = new ComponentSpecification(centre, type)
	})

	describe('#centreX', function() {
		it('should have the correct value', function() {
			componentSpec.centreX.should.equal(centreX)
		})
	})

	describe('#centreY', function() {
		it('should have the correct value', function() {
			componentSpec.centreY.should.equal(centreY)
		})
	})

	describe('#centreZ', function() {
		it('should have the correct value', function() {
			componentSpec.centreZ.should.equal(centreZ)
		})
	})

	describe('#type', function() {
		it('should have the correct value', function() {
			componentSpec.type.should.equal(type)
		})
	})
})