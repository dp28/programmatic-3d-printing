/*
 * author: Daniel Patterson
 *
 * Tests a Rack component (part of a rack and pinion)
 */
var should = require('should')
var RackSupport = require('../components/RackSupport.js').RackSupport
var ComponentTest = require('../../tests/ComponentTest.js')
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue

describe('RackSupport', function() {
	var support 

	beforeEach(function() {
		support = new RackSupport() 
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(support)
	})

	describe('#getTypeName', function() {
		it('should return "RackSupport"', function() {
			support.getTypeName().should.equal("RackSupport")
		})
	})

	describe('#getBaseHeight', function() {
		it('should return a ConstrainableValue', function() {
			support.getBaseHeight().should.be.an.instanceOf(ConstrainableValue)
		})
	})
	
})