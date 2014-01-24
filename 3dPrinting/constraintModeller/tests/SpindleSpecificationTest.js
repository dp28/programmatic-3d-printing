/*
 * author: Daniel Patterson
 *
 * Tests the SpindleSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
module.exports.testSpindleSpecification = testSpindleSpecification

function testSpindleSpecification(spindleSpec, spindle) {
	
	describe('SpindleSpecification', function() {	
		it('should have the same radius as the Spindle that created it', function() {
			spindleSpec.radius.should.equal(spindle.getRadius().getValue()) 
		})

		it('should have the same height as the Spindle that created it', function() {
			spindleSpec.height.should.equal(spindle.getHeight().getValue())
		})
	})
}