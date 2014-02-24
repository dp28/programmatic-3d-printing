/*
 * author: Daniel Patterson
 *
 * Tests the base class for all meshable components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 
var MeshableComponent = require('../components/MeshableComponent.js').MeshableComponent
var ComponentTest = require('../tests/ComponentTest.js')

module.exports.shouldBehaveLikeMeshableComponent = shouldBehaveLikeMeshableComponent

describe('MeshableComponent', function() {
	var meshable

	beforeEach(function() {
		meshable = new MeshableComponent() 
	})

	it('should behave like a MeshableComponent', function() {
		shouldBehaveLikeMeshableComponent(meshable)
	})
})

function shouldBehaveLikeMeshableComponent(meshable) {
	describe('Anything inheriting from MeshableComponent', function() {
		
		it('should inherit from MeshableComponent', function() {
			meshable.should.be.an.instanceOf(MeshableComponent)
		})

		it('should behave like a Component', function() {
			ComponentTest.shouldBehaveLikeComponent(meshable)
		})	
	})
}
