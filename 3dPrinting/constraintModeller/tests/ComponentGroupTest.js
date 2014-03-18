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

describe('ComponentGroup', function() {
 	var group, component, placeable

 	beforeEach(function() {
 		group = new ComponentGroup() 
 		component = new Component()
 		placeable = new PlaceableComponent(Circle)
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