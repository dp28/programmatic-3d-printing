/*
 * author: Daniel Patterson
 *
 * Tests the CircleSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Circles
 */
var should = require('should')
var SpecificationTest = require('../tests/SpecificationTest.js')

module.exports.testCircleSpecification = testCircleSpecification

function testCircleSpecification(circleSpec, circle) {
	
	describe('CircleSpecification', function() {	
		it('should have the same radius as the Circle that created it', function() {
			circleSpec.radius.should.equal(circle.getRadius().getValue())
		})

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(circleSpec)
		})

		it('should have the same centre x coordinate as the Circle that created it',
		   function() {
			circleSpec.centreX.should.equal(circle.getCentre().getX().getValue())
		})

		it('should have the same centre y coordinate as the Circle that created it',
		   function() {
			circleSpec.centreY.should.equal(circle.getCentre().getY().getValue())
		})

		it('should have the same centre z coordinate as the Circle that created it',
		   function() {
			circleSpec.centreZ.should.equal(circle.getCentre().getZ().getValue())
		})

		it('should have the type property of "Circle"', function() {
			circleSpec.type.should.equal("Circle")
		})
	})
}