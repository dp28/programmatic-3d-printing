/*
 * author: Daniel Patterson
 *
 * Tests individual Vectors and their creation
 */
var should = require('should')
var Vector = require('../constraints/Vector.js').Vector

describe('Vector', function() {
  var vector

  describe('just after construction',function() {
  	beforeEach(function() {
  		vector = new Vector()
  	})

  	it('should have a null direction', function() {
  		should.strictEqual(vector.getDirection().getValue(), null)
  	})

  	it('should have a null magnitude', function() {
  		should.strictEqual(vector.getMagnitude().getValue(), null)
  	})

  	it('should have a null x value', function() {
  		should.strictEqual(vector.getX().getValue(), null)
  	})

  	it('should have a null y value', function() {
  		should.strictEqual(vector.getY().getValue(), null)
  	})
  })

  describe('#fixDirectionAndMagnitude', function() {
  	beforeEach(function() {
  		vector = new Vector()
  		vector.fixDirectionAndMagnitude(Math.PI, 10)
  	})

  	it('should have a fixed direction of PI', function() {
  		vector.getDirection().isRigid().should.be.true
  		vector.getDirection().getValue().should.equal(Math.PI)
  	})

  	it('should have a fixed magnitude of 10', function() {
  		vector.getMagnitude().isRigid().should.be.true
  		vector.getMagnitude().getValue().should.equal(10)
  	})

  	it('should have an x value of cos(PI) * 10', function() {
  		vector.getX().getValue().should.equal(Math.cos(Math.PI) * 10)
  	})
  })
})