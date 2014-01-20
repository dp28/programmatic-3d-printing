/*
 * author: Daniel Patterson
 *
 * Tests GearTrains which contain a collection of Gears
 */
var should = require('should')
var Component = require('../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var GearTrain = require('../components/GearTrain.js').GearTrain
var ComponentTest = require('../tests/ComponentTest.js')

describe('GearTrain', function() {
	var train 

	beforeEach(function() {
		train = new GearTrain() 
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(train)
	})

	
})