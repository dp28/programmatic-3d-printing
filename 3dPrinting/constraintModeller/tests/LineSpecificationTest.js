/*
 * author: Daniel Patterson
 *
 * Tests the LineSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Lines
 */
var should = require('should')

module.exports.testLineSpecification = testLineSpecification

function testLineSpecification(lineSpec, line) {
	
	describe('LineSpecification', function() {	
		it('should have the same length as the Line that created it', function() {
			lineSpec.length.should.equal(line.getLength())
		})

		it('should have the same angle as the Line that created it', function() {
			lineSpec.angleInRadians.should.equal(line.getAngleInRadians())
		})

		it('should have the same centre x coordinate as the Line that created it',
		   function() {
			lineSpec.centreX.should.equal(line.getCentre().getX().getValue())
		})

		it('should have the same centre y coordinate as the Line that created it',
		   function() {
			lineSpec.centreY.should.equal(line.getCentre().getY().getValue())
		})

		it('should have the same centre z coordinate as the Line that created it',
		   function() {
			lineSpec.centreZ.should.equal(line.getCentre().getZ().getValue())
		})

		it('should have the same width as the Line that created it',
		   function() {
			lineSpec.width.should.equal(line.getWidth())
		})

		it('should have the type property of "Line"', function() {
			lineSpec.type.should.equal("Line")
		})
	})
}
