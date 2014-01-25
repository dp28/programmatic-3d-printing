/*
 * author: Daniel Patterson
 *
 * Tests the BaseSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Bases
 */
var should = require('should')

module.exports.testBaseSpecification = testBaseSpecification

function testBaseSpecification(baseSpec, base) {
	
	describe('BaseSpecification', function() {	
		it('should have the same height as the Base that created it', function() {
			baseSpec.height.should.equal(base.getHeight().getValue())
		})
	})
}