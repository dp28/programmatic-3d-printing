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

	function setHeightAndRadius() {
		base.setHeight(2)
		base.setRadius(10)
	}
	
	describe('#toSpecification', function() {

		it('should not be possible if the height has not been set', function() {
			base.toSpecification.should.throw("Height not set")
		})

		it('should not be possible if the bounding radius has not been set', 
			 function() {
			base.setHeight(10)
			try {
				base.toSpecification().should.throw('Radius not set')
			}
			catch(err) {
				err.should.eql(new Error('Radius not set'))
			}
		})

		it('should be possible if both the bounding radius and the height are '
			 + 'set', function() {
			(function() {
				setHeightAndRadius()
				base.toSpecification()
			}).should.not.throw()
 		})

		it('should return a BaseSpecification Object', function() {
			setHeightAndRadius()
			base.toSpecification().should.be.an.instanceof(BaseSpecification)
		})

		describe('the returned BaseSpecification', function() {
			var baseSpec

			beforeEach(function() {
				setHeightAndRadius()			
				baseSpec = base.toSpecification()				
			})

			it('should behave like a BaseSpecification created by the Base',
			   function() {
				BaseSpecificationTest.testBaseSpecification(baseSpec, base)
			})
		})
	})
})