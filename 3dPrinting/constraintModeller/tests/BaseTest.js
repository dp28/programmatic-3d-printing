/*
 * author: Daniel Patterson
 *
 * Tests the Base Component
 */
var should = require('should')
var Base = require('../components/Base.js').Base
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../geometry/Circle.js').Circle
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification
var ComponentTest = require('../tests/ComponentTest.js')
var BaseSpecificationTest = require('../tests/BaseSpecificationTest.js')


describe('Base', function() {
	var base

	beforeEach(function() {
		base = new Base()
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(base)
	})

	describe('#getHeight', function() {
		it('should return a ConstrainableValue', function() {
			base.getHeight().should.be.an.instanceof(ConstrainableValue)
		})
	})
	
	describe('#toSpecification', function() {

		it('should not be possible if the height has not been set', function() {
			base.toSpecification.should.throw("Height not set")
		})

		it('should be possible if the the height is set', function() {
			(function() {
				base.setHeight(10)
				base.toSpecification()
			}).should.not.throw()
 		})

		it('should return a BaseSpecification Object', function() {
			base.setHeight(10)
			base.toSpecification().should.be.an.instanceof(BaseSpecification)
		})

		describe('the returned BaseSpecification', function() {
			var baseSpec

			beforeEach(function() {
				base.setHeight(10)
				baseSpec = base.toSpecification()				
			})

			it('should behave like a BaseSpecification created by the Base',
			   function() {
				BaseSpecificationTest.testBaseSpecification(baseSpec, base)
			})
		})
	})
})