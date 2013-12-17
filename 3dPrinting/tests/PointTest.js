/*
 * author: Daniel Patterson
 *
 * Tests individual Points and their creation
 */
var should = require('should')
var Point = require('../constraints/Point.js').Point

describe('Point', function() {
  var point

  describe('#createFixedPoint', function() {
  	beforeEach(function() {  		
  	  point = Point.createFixedPoint(10, 20, 30)
  	})

  	it('should have a fixed x coordinate of 10', function() {
  		point.getX().getValue().should.equal(10)
  		point.getX().isRigid().should.be.true
  	})

  	it('should have a fixed y coordinate of 20', function() {
  		point.getY().getValue().should.equal(20)
  		point.getY().isRigid().should.be.true
  	})

  	it('should have a fixed z coordinate of 30', function() {
  		point.getZ().getValue().should.equal(30)
  		point.getZ().isRigid().should.be.true
  	})
  }) 
})