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

  describe('#isAtSameLocationAs', function() {
    var otherPoint, x = 1, y = 2, z = 3

    beforeEach(function() {
      otherPoint = new Point()
      point.fixAt(x, y, z)
    })

    it('should return true if the Points are co-located', function() {      
      otherPoint.setAt(x, y, z)
      point.isAtSameLocationAs(otherPoint).should.be.true
    })

    it('should return false if the Points are not co-located', function() {      
      otherPoint.setAt(x, y, z + 1)
      point.isAtSameLocationAs(otherPoint).should.be.false
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

  	describe('when the indpendent Point is set after the constraints are ' 
  		       + 'created', function() {
	  	beforeEach(function() {
	  		point = new Point()
	  		otherPoint = new Point()
	  		offsets = [1, 2, 3]
	  		point.offsetFrom(otherPoint, offsets)
	  		otherPoint.setAt(1, 2, 3)
	  	})

	  	it('should set the x coordinate of the dependent Point to the combination' 
	  		 + ' of the x offset and the indpendent x coordinate', function() {
	  		point.getX().getValue().should.equal(offsets[0] 
	  			                                   + otherPoint.getX().getValue())
	  	})

	  	it('should set the y coordinate of the dependent Point to the combination' 
	  		 + ' of the y offset and the indpendent y coordinate', function() {
	  		point.getY().getValue().should.equal(offsets[1] 
	  			                                   + otherPoint.getY().getValue())
	  	})

	  	it('should set the z coordinate of the dependent Point to the combination' 
	  		 + ' of the z offset and the indpendent z coordinate', function() {
	  		point.getZ().getValue().should.equal(offsets[2] 
	  			                                   + otherPoint.getZ().getValue())
	  	})
  	})
  })

  describe('#isFullyDefined', function() {
    beforeEach(function() {
      point = new Point()
    })

    it('should be false if not all coordinates of the Point have been set', 
       function() {
      point.isFullyDefined().should.be.false
    })

    it('should be true if all coordinates of the Point have been set', function() {
      point.setAt(1, 2, 3)
      point.isFullyDefined().should.be.true
    })
  })

  describe('#isNotFullyDefined', function() {
    beforeEach(function() {
      point = new Point()
    })
    
    it('should be true if not all coordinates of the Point have been set', 
       function() {
      point.isNotFullyDefined().should.be.true
    })

    it('should be false if all coordinates of the Point have been set', function() {
      point.setAt(1, 2, 3)
      point.isNotFullyDefined().should.be.false
    })
  })

  describe('sameAs', function() {
    beforeEach(function() {
      otherPoint = new Point()
      point = new Point()
      point.sameAs(otherPoint) 
      otherPoint.setAt(1, 2, 3)
    })

    it('should have all its values set', function() {
      point.isFullyDefined().should.be.true
    })
    
    it('should have the same coordinates as the indpendent Point', function() {
      point.isAtSameLocationAs(otherPoint).should.be.true
    })
  })

  describe('#samePointOnAxes', function() {
    beforeEach(function() {
      otherPoint = new Point()
      point = new Point()
      point.samePointOnAxes(otherPoint, Point.getAxesNames()) 
      otherPoint.setAt(1, 2, 3)
    })

    it('should have all its values set', function() {
      point.isFullyDefined().should.be.true
    })
    
    it('should have the same coordinates as the indpendent Point', function() {
      point.isAtSameLocationAs(otherPoint).should.be.true
    })
  })

  describe('#offsetOnAxis', function() {
    var offset = 10

    beforeEach(function() {
      otherPoint = new Point()
      point = new Point()
      point.samePointOnAxes(otherPoint, Point.getAxesNamesWithout('X')) 
      point.offsetOnAxis(otherPoint, 'X', offset)
      otherPoint.setAt(1, 2, 3)
    })

    it('should have an x coordinate offset from the independent Point', 
      function() {
      point.getX().getValue().should.equal(otherPoint.getX().getValue() + offset)
    })
  })

  describe('Point.getAxesNames', function() {
    it('should return an array of the capitalised axes names', function() {
      Point.getAxesNames().should.eql(['X', 'Y', 'Z'])
    })
  })

  describe('Point.getAxesNamesWithout', function() {
    it('should return the array of axes names without the passed in argument',
      function() {
      Point.getAxesNamesWithout('X').should.eql(['Y', 'Z'])
    })

    it('should ignore values that are not axes names', function() {
      Point.getAxesNamesWithout('b').should.eql(['X', 'Y', 'Z'])
    })
  })
})