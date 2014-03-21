/*
 * author: Daniel Patterson
 *
 * Tests the RectangleSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Rectangles
 */
var should = require('should')
var SpecificationTest = require('../tests/SpecificationTest.js')

module.exports.testRectangleSpecification = testRectangleSpecification

function testRectangleSpecification(rectangleSpec, rectangle) {
	
	describe('RectangleSpecification', function() {	

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(rectangleSpec)
		})
		
		it('should have the same length as the Rectangle that created it', function() {
			rectangleSpec.length.should.equal(rectangle.getLength())
		})

		it('should have the same angle as the Rectangle that created it', function() {
			rectangleSpec.angleInRadians.should.equal(rectangle.getAngleInRadians())
		})

		it('should have the same centre x coordinate as the Rectangle that created it',
		   function() {
			rectangleSpec.centreX.should.equal(rectangle.getCentre().getX().getValue())
		})

		it('should have the same centre y coordinate as the Rectangle that created it',
		   function() {
			rectangleSpec.centreY.should.equal(rectangle.getCentre().getY().getValue())
		})

		it('should have the same centre z coordinate as the Rectangle that created it',
		   function() {
			rectangleSpec.centreZ.should.equal(rectangle.getCentre().getZ().getValue())
		})

		it('should have the same width as the Rectangle that created it',
		   function() {
			rectangleSpec.width.should.equal(rectangle.getWidth())
		})

		it('should have the type property of "Rectangle"', function() {
			rectangleSpec.type.should.equal("Rectangle")
		})
	})
}