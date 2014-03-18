/*
 * author: Daniel Patterson
 *
 * Tests the base class for all Specifications
 */
var should = require('should')
var Specification = require('../interface/Specification.js').Specification 

module.exports.shouldBehaveLikeSpecification = shouldBehaveLikeSpecification

describe('Specification', function() {
	var specification

	beforeEach(function() {
		specification = new Specification() 
	})
	
	it('should behave like a Specification', function() {
		shouldBehaveLikeSpecification(specification)
	})	
})

function shouldBehaveLikeSpecification(specification) {
	describe('Anything inheriting from Specification', function() {
		var otherSpecification

		beforeEach(function() {
			otherSpecification = new Specification()

			specification.firstTestProperty = 'first'
			otherSpecification.secondTestProperty = 'second' 
		})
		
		describe('#addSpecification', function() {
			beforeEach(function() {
					specification.addSpecification(otherSpecification)  
			})

			it('should have the same properties as the added Specification', function() {
				specification.should.have.property('secondTestProperty', 'second')
			})

			it('should still have its original properties', function() {
				specification.should.have.property('firstTestProperty', 'first')
			})	

			describe('when the added Specification has the same property as the '
				       + 'original property but with a different value', function() {
				beforeEach(function() {
					otherSpecification.firstTestProperty = 'different'
					specification.addSpecification(otherSpecification)  
				})
				
				it('should use the added Specification\'s value', function() {
					specification.firstTestProperty.should.equal('different')
				})
			})	
		})
	})
}