/*
 * author: Daniel Patterson
 *
 * Tests the RackSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../../geometry/Point.js').Point
var Rack = require('../components/Rack.js').Rack
var RackSpecification = require('../interface/RackSpecification.js').RackSpecification
var ToothedComponentSpecificationTest = require('../tests/ToothedComponentSpecificationTest.js')

module.exports.testRackSpecification = testRackSpecification

function testRackSpecification(rackSpec, rack) {
	describe('RackSpecification', function() {

		it('should behave like a ToothedSpecification', function() {
			ToothedComponentSpecificationTest.testToothedComponentSpecification(rackSpec, rack)
		})

		describe('#linearPitch', function() {
			it('should have the correct value', function() {
				rackSpec.linearPitch.should.equal(rack.getLinearPitch())
			})
		})

		describe('#length', function() {
			it('should have the correct value', function() {
				rackSpec.length.should.equal(rack.getLength().getValue())
			})
		})

		describe('#width', function() {
			it('should have the correct value', function() {
				rackSpec.width.should.equal(rack.getWidth().getValue())
			})
		})
	})
}