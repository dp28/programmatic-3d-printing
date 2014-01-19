/*
 * author: Daniel Patterson
 *
 * Tests the SpecificationComposer, which should transform Components into a 
 * complete Specification
 */
var should = require('should')
var util = require('util')
var Component = require('../components/Component.js').Component 
var Gear = require('../components/Gear.js').Gear 
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var SpecificationComposer = require('../interface/SpecificationComposer.js').SpecificationComposer
var GearSpecificationTest = require('../tests/GearSpecificationTest.js')
var ComponentSpecificationTest = require('../tests/ComponentSpecificationTest.js')

describe('SpecificationComposer', function() {
	var composer, gear

	beforeEach(function() {
		composer = new SpecificationComposer()
		gear = new Gear()
		fullyConstrainGear()
		component = new Component()
		fullyConstrainComponent()
	})

	function fullyConstrainGear() {		
		gear.setNumberOfTeeth(4) 
		gear.setPitchCircleRadius(3)	
		gear.getCentre().fixAt(1, 2, 3)
	}

	function fullyConstrainComponent() {
		component.getCentre().fixAt(1, 3, 5)
	}

	describe('#makeSpecification', function() {

		function componentBehaviour(componentToTest) {			
			it('should return an Object', function() {
				composer.makeSpecification(componentToTest).should.be.an.instanceof(Object)
			})

			describe('the returned Object', function() {
				var specification 

				before(function() {
					specification = composer.makeSpecification(componentToTest)
				})

				it('should behave like a ComponentSpecification', function() {
					ComponentSpecificationTest.testComponentSpecification(specification, 
						                                                    componentToTest)
				})
			})
		}

		describe('passing a Component as an argument', function() {
			it('should behave like a Component', function() {
				componentBehaviour(component)				
			})
		})

		describe('passing a Gear as an argument', function() {
			it('should behave like a Component', function() {
				componentBehaviour(gear)				
			})

			describe('the returned Object', function() {
				var specification 

				before(function() {
					specification = composer.makeSpecification(gear)
				})

				it('should behave like a GearSpecification', function() {
					GearSpecificationTest.testGearSpecification(specification, gear)
				})
			})
		})
	})
})
