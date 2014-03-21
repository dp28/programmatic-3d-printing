/*
 * author: Daniel Patterson
 *
 * Tests any ToothedComponent, eg a Gear
 */
var should = require('should')
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var Spindle = require('../components/Spindle.js').Spindle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../../geometry/Circle.js').Circle
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var PlaceableComponentTest = require('../../tests/PlaceableComponentTest.js')
var GearSpecificationTest = require('../tests/GearSpecificationTest.js')
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
				                                                        boundaryShape)
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
				toothed.getHeight().getValue().should.not.be.undefined
			})
		})

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