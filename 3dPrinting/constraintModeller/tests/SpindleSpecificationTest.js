/*
 * author: Daniel Patterson
 *
 * Tests the SpindleSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect
 */
var should = require('should')
var Point = require('../geometry/Point.js').Point
var SpindleSpecification = require('../interface/SpindleSpecification.js').SpindleSpecification
var SpindleTest = require('../tests/SpindleTest.js')

module.exports.testSpindleSpecification = function(spindleSpec, spindle) {
	it('should have the same height as the Spindle that created it', function() {
		spindleSpec.height.should.equal(spindle.getHeight().getValue())
	})
}