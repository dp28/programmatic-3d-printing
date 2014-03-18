/*
 * author: Daniel Patterson
 *
 * Tests the base class for all ComponentGroups
 */
var should = require('should')
var PlaceableComponentGroup = require('../components/PlaceableComponentGroup.js').PlaceableComponentGroup
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
Circle = require('../geometry/Circle.js').Circle

module.exports.shouldBehaveLikeComponentGroup = shouldBehaveLikeComponentGroup

describe('ComponentGroup', function() {
	var group

	beforeEach(function() {
		group = new PlaceableComponentGroup() 
	})

	it('should behave like a PlaceableComponentGroup', function() {
		shouldBehaveLikeComponentGroup(group)
	})
})	

function shouldBehaveLikeComponentGroup(group, ComponentType) {
	if (ComponentType == undefined)
		ComponentType = PlaceableComponent
	describe('Anything inheriting from PlaceableComponentGroup', function() {
		var component

		beforeEach(function() {
		 	component = new ComponentType()
		})
		 
		describe('#addComponent', function() {
			it('should increase the number of Components in the PlaceableComponentGroup', function() {
				group.getSize().should.equal(0)
				group.addComponent(component)
				group.getSize().should.equal(1)
			})

			it('should contain the Components that were added', function() {
				group.addComponent(component)
				group.getComponents().should.contain(component)
			})
		})
	}) 
}