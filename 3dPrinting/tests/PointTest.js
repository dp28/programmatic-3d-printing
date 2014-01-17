/*
 * author: Daniel Patterson
 *
 * Tests individual Points and their creation
 */
var should = require('should')
var Point = require('../geometry/Point.js').Point

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

  describe('#createPoint', function() {
  	beforeEach(function() {  		
  	  point = Point.createPoint()
  	})

  	it('should have an unfixed x coordinate', function() {
  		point.getX().isRigid().should.be.false
  	})

  	it('should have an unfixed y coordinate', function() {
  		point.getY().isRigid().should.be.false
  	})

  	it('should have an unfixed z coordinate', function() {
  		point.getZ().isRigid().should.be.false
  	})
  }) 

  describe('#fixAt', function() {
  	beforeEach(function() {
  		point = new Point()
  		point.fixAt(1, 2, 3)
  	})

  	it('should have a fixed x coordinate of 1', function() {
  		point.getX().getValue().should.equal(1)
  		point.getX().isRigid().should.be.true
  	})

  	it('should have a fixed y coordinate of 2', function() {
  		point.getY().getValue().should.equal(2)
  		point.getY().isRigid().should.be.true
  	})

  	it('should have a fixed z coordinate of 3', function() {
  		point.getZ().getValue().should.equal(3)
  		point.getZ().isRigid().should.be.true
  	})
  })

  describe('#setAt', function() {
  	beforeEach(function() {
  		point = new Point()
  		point.setAt(1, 2, 3)
  	})

  	it('should have an unfixed x coordinate of 1', function() {
  		point.getX().getValue().should.equal(1)
  		point.getX().isRigid().should.be.false
  	})

  	it('should have an unfixed y coordinate of 2', function() {
  		point.getY().getValue().should.equal(2)
  		point.getY().isRigid().should.be.false
  	})

  	it('should have an unfixed z coordinate of 3', function() {
  		point.getZ().getValue().should.equal(3)
  		point.getZ().isRigid().should.be.false
  	})
  })

  describe('#offsetFrom', function() {
  	var otherPoint, offsets

  	beforeEach(function() {
  		point = new Point()
  		otherPoint = new Point()
  		offsets = [1, 2, 3]
  		point.offsetFrom(otherPoint, offsets)
  		otherPoint.setAt(1, 2, 3)
  	})

  	it('should set the x coordinate of the dependent point to the combination' 
  		 + ' of the x offset and the indpendent x coordinate', function() {
  		point.getX().getValue().should.equal(offsets[0] 
  			                                   + otherPoint.getX().getValue())
  	})

  	it('should set the y coordinate of the dependent point to the combination' 
  		 + ' of the y offset and the indpendent y coordinate', function() {
  		point.getY().getValue().should.equal(offsets[1] 
  			                                   + otherPoint.getY().getValue())
  	})

  	it('should set the z coordinate of the dependent point to the combination' 
  		 + ' of the z offset and the indpendent z coordinate', function() {
  		point.getZ().getValue().should.equal(offsets[2] 
  			                                   + otherPoint.getZ().getValue())
  	})
  })
})