/*
 * author: Daniel Patterson
 *
 * Tests individual Vectors and their creation
 */
var should = require('should')
var Vector = require('../geometry/Vector.js').Vector
var Point = require('../geometry/Point.js').Point
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

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

  	it('should have an x value of -10', function() {
  		vector.getX().getValue().should.be.approximately(-10, 0.001)
  	})

  	it('should have a y value of 0', function() {
  		vector.getY().getValue().should.be.approximately(0, 0.001)
  	})
  })

  describe('#fixXandY', function() {
  	beforeEach(function() {
  		vector = new Vector()
  		vector.fixXandY(3, 4) // Pythagorean triple
  	})

  	it('should have a fixed x value of 3', function() {
  		vector.getX().getValue().should.equal(3)
  		vector.getX().isRigid().should.be.true
  	})

  	it('should have a fixed y value of 4', function() {
  		vector.getY().getValue().should.equal(4)
  		vector.getY().isRigid().should.be.true
  	})

  	it('should have a fixed direction of atan(4/3)', function() {
  		vector.getDirection().getValue().should.be.approximately(Math.atan(4/3), 
  			                                                       0.001)
  	})

  	it('should have a fixed magnitude of 5', function() {
  		vector.getMagnitude().getValue().should.be.approximately(5, 0.001)
  	})
  })

  describe('#constructFromPoints', function() {
  	var start, end

  	beforeEach(function() {
  		start = new Point()
  		end = new Point()
  		vector.constructFromPoints(start, end)
  		end.fixAt(2, 3, 3)
  		start.fixAt(1, 2, 3)
  	})

  	it('should create a vector with x and y values of 1', function() {
  		vector.getX().getValue().should.be.approximately(1, .001)
  		vector.getY().getValue().should.be.approximately(1, .001)
  	})
  })
})