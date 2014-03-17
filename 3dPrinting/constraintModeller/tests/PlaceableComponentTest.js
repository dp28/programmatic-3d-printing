/*
 * author: Daniel Patterson
 *
 * Tests the base class for all placeable components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
var ComponentTest = require('../tests/ComponentTest.js')

module.exports.shouldBehaveLikePlaceableComponent = shouldBehaveLikePlaceableComponent

describe('PlaceableComponent', function() {
	var placeable

	beforeEach(function() {
		placeable = new PlaceableComponent() 
	})

	it('should behave like a PlaceableComponent', function() {
		shouldBehaveLikePlaceableComponent(placeable)
	})
})

function shouldBehaveLikePlaceableComponent(placeable) {
	describe('Anything inheriting from PlaceableComponent', function() {

		it('should behave like a Component', function() {
			ComponentTest.shouldBehaveLikeComponent(placeable)
		})	
	})
}
