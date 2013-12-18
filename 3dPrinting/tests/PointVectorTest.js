/*
 * author: Daniel Patterson
 *
 * Tests different interactions between Points and Vectors 
 */
var should = require('should')
var Point = require('../constraints/Point.js').Point
var Vector = require('../constraints/Vector.js').Vector

describe('Offsetting one Point from another by a Vector', function() {
	var firstPoint, secondPoint, vector

	beforeEach(function() {
		firstPoint = new Point() 
		secondPoint = new Point()
		vector = new Vector()
	})

	describe('When the Vector is fixed by x and y beforehand', function() {
		beforeEach(function() {
			vector.fixXandY(2, 4)
			secondPoint.offsetFrom(firstPoint, vector)
			firstPoint.fixAt(1, 2, 0)
		})

		it('should have an x value which is the sum of the x values of the first ' 
			 + 'Point and the Vector', function() {
			secondPoint.getX().getValue().should.equal(firstPoint.getX().getValue() +
				                                         vector.getX().getValue())
		})

		it('should have a y value which is the sum of the y values of the first ' 
			 + 'Point and the Vector', function() {
			secondPoint.getY().getValue().should.equal(firstPoint.getY().getValue() +
				                                         vector.getY().getValue())
		})

		it('should have a z value which is the same as the z valueof the first ' 
			 + 'Point', function() {
			secondPoint.getZ().getValue().should.equal(firstPoint.getZ().getValue())
		})
	})

	describe('When the Vector is fixed by direction and magnitude', function() {
		beforeEach(function() {
			vector.fixDirectionAndMagnitude(2, 4)
			secondPoint.offsetFrom(firstPoint, vector)
			firstPoint.fixAt(1, 2, 0)
		})

		it('should have an x value which is the sum of the x values of the first ' 
			 + 'Point and the Vector', function() {
			secondPoint.getX().getValue().should.equal(firstPoint.getX().getValue() +
				                                         vector.getX().getValue())
		})

		it('should have a y value which is the sum of the y values of the first ' 
			 + 'Point and the Vector', function() {
			secondPoint.getY().getValue().should.equal(firstPoint.getY().getValue() +
				                                         vector.getY().getValue())
		})
	})

	describe.skip('When the first Point and Vector are fixed beforehand', function() {
		beforeEach(function() {
			firstPoint.fixAt(1, 2, 0)
			vector.fixXandY(2, 4)
			secondPoint.offsetFrom(firstPoint, vector)
		})

		it('should have an x value which is the sum of the x values of the first ' 
			 + 'Point and the Vector', function() {
			secondPoint.getX().getValue().should.equal(firstPoint.getX().getValue() +
				                                         vector.getX().getValue())
		})
	})

	describe('When the first Point is changed several times', function() {
		beforeEach(function() {
			vector.fixXandY(2, 4)
			secondPoint.offsetFrom(firstPoint, vector)
			firstPoint.fixAt(1, 2, 0)
			firstPoint.fixAt(10, 40, 0)
			firstPoint.fixAt(100, -20, 70)
		})

		it('should have an x value which is the sum of the x values of the first ' 
			 + 'point and the vector', function() {
			secondPoint.getX().getValue().should.equal(firstPoint.getX().getValue() +
				                                         vector.getX().getValue())
		})

		it('should have a y value which is the sum of the y values of the first ' 
			 + 'point and the vector', function() {
			secondPoint.getY().getValue().should.equal(firstPoint.getY().getValue() +
				                                         vector.getY().getValue())
		})
	})
})

describe('Creating a right-angled triangle from three Points and two Vectors',
         function() {
	var firstPoint, secondPoint, thirdPoint, firstVector, secondVector
	var hypotenuse

	// Creates the Points without any values and sets up the Vectors to form two
	// sides of the Pythagorean triple 3, 4, 5
	var createElements = function() {
		firstPoint = new Point()
		secondPoint = new Point()
		thirdPoint = new Point()
		firstVector = new Vector()
		secondVector = new Vector()		
		firstVector.fixXandY(0, 3)
		secondVector.fixDirectionAndMagnitude(Math.PI / 2, 4)
	}

	var wireElementsTogether = function() {		
		secondPoint.offsetFrom(firstPoint, firstVector)
		thirdPoint.offsetFrom(secondPoint, secondVector)
	}

	beforeEach(function() {
		createElements()
		wireElementsTogether()
		firstPoint.fixAt(2, 1, 0)
		hypotenuse = firstPoint.getCurrentVectorTo(thirdPoint)
	})

	it('should have a Point which depends on the first Vector and the first Point', 
		 function() {
		secondPoint.getX().getValue().should.equal(firstPoint.getX().getValue() 
			                                         + firstVector.getX().getValue())
		secondPoint.getY().getValue().should.equal(firstPoint.getY().getValue() 
			                                         + firstVector.getY().getValue())
		secondPoint.getZ().getValue().should.equal(firstPoint.getZ().getValue())
  })

	it('should have a Point which depends on the second Vector and the second ' 
		 + 'Point', function() {
		thirdPoint.getX().getValue().should.equal(secondPoint.getX().getValue() 
			                                        + secondVector.getX().getValue())
		thirdPoint.getY().getValue().should.equal(secondPoint.getY().getValue() 
			                                        + secondVector.getY().getValue())
		thirdPoint.getZ().getValue().should.equal(secondPoint.getZ().getValue())
  })

  it('should produce a hypotenuse of magnitude 5', function() {
  	hypotenuse.getMagnitude().getValue().should.be.approximately(5, 0.001)
  })
})


