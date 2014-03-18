/*
 * author: Daniel Patterson
 *
 * Tests the base class for all ComponentGroups
 */
var should = require('should')
var ComponentGroup = require('../components/ComponentGroup.js').ComponentGroup
var Component = require('../components/Component.js').Component
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
Circle = require('../geometry/Circle.js').Circle

module.exports.shouldBehaveLikeComponentGroup = shouldBehaveLikeComponentGroup

describe('ComponentGroup', function() {
	var group

	beforeEach(function() {
		group = new ComponentGroup() 
	})

	it('should behave like a ComponentGroup', function() {
		shouldBehaveLikeComponentGroup(group)
	})
})	

function shouldBehaveLikeComponentGroup(group, ComponentType) {
	if (ComponentType == undefined)
		ComponentType = Component
	describe('Anything inheriting from ComponentGroup', function() {
		var component, placeable

		beforeEach(function() {
		 	component = new ComponentType()
		 	placeable = new ComponentType()
		})
		 
		describe('#addComponent', function() {
			it('should increase the number of Components in the ComponentGroup', function() {
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