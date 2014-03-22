/*
 * author: Daniel Patterson
 *
 * Tests any ToothedComponent, eg a Gear
 */
var should = require('should')
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var PlaceableComponentTest = require('../../tests/PlaceableComponentTest.js')
var ToothedComponentSpecificationTest = require('../tests/ToothedComponentSpecificationTest.js')

module.exports.shouldBehaveLikeToothedComponent = shouldBehaveLikeToothedComponent

describe('ToothedComponent', function() {
	var toothed 

	beforeEach(function() {
		toothed = new ToothedComponent(Circle) 
	})	

	function setupTestBoundaries() {}

	function fullySpecify() {}

	it('should behave like a ToothedComponent', function() {
		shouldBehaveLikeToothedComponent(ToothedComponent, 
			                               setupTestBoundaries, 
			                               Circle,
			                               fullySpecify)
	})

	describe('#getTypeName', function() {
		it('should return "ToothedComponent"', function() {
			toothed.getTypeName().should.equal("ToothedComponent")
		})
	})

	describe('#getAddendum', function() {
		it('should only be implemented by subclasses', function() {
			(function() {
				toothed.getAddendum()
			}).should.throw("Not implemented in this instance")
		})
	})
})

function shouldBehaveLikeToothedComponent(toothedType, 
	                                        setupTestBoundaries,
	                                        boundaryShape,
	                                        fullySpecify) {

	describe('Anything inheriting from ToothedComponent', function() {	
		var toothed	

		beforeEach(function() {
			toothed = new toothedType() 
		})
		

		it('should behave like a PlaceableComponent', function() {
			PlaceableComponentTest.shouldBehaveLikePlaceableComponent(toothedType, 
				                                                        setupTestBoundaries, 
				                                                        boundaryShape,
				                                                        fullySpecify)
		})

		describe('#getNumberOfTeeth', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getNumberOfTeeth().should.be.an.instanceOf(ConstrainableValue)
			})
		})

		describe('#getPressureAngle', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getPressureAngle().should.be.an.instanceOf(ConstrainableValue)
			})

			it('should have a default value', function() {
				toothed.getPressureAngle().getValue().should.not.be.undefined
			})
		})

		describe('#getHeight', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getHeight().should.be.an.instanceOf(ConstrainableValue)
			})

			it('should have a default value', function() {
				toothed.getHeight().getValue().should.not.be.null
			})
		})

		describe('#setHeight', function() {
			it('should set the height of the ToothedComponent', function() {
				toothed.setHeight(1)
				toothed.getHeight().getValue().should.equal(1)
			})
		})

		if (toothedType != ToothedComponent) {
			describe('#getAddendum', function() {
				beforeEach(function() {
					fullySpecify(toothed) 
				})
				
				it('should return a number', function() {
						toothed.getAddendum().should.be.a.Number
				})
			})
		}

		describe('#toSpecification', function() {
			
			it('should not be possible if the number of teeth has not been set',
			   function() {
				toothed.toSpecification.should.throw("Number of teeth not set")
			})

			describe('the returned ToothedComponentSpecification', function() {
				var spec 

 				beforeEach(function() {
 					// Necessary for component.toSpecification
 					toothed.getCentre().setAt(1, 2, 3) 
 					// Necessary for toothed.toSpecification
 					toothed.setNumberOfTeeth(10)
 					fullySpecify(toothed)
 					spec = toothed.toSpecification() 
 				}) 				

				it('should behave like a ToothedComponentSpecification', function() {
					ToothedComponentSpecificationTest.testToothedComponentSpecification(spec,
					 toothed)
				})
			})
		})
	})
}