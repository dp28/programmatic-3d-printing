/*
 * author: Daniel Patterson
 *
 * Tests a Rack component (part of a rack and pinion)
 */
var should = require('should')
var Rack = require('../components/Rack.js').Rack
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var ToothedComponentTest = require('../tests/ToothedComponentTest.js')

describe('Rack', function() {
	var rack 

	beforeEach(function() {
		rack = new Rack() 
	})
	
  it('should behave like a ToothedComponent', function() {

		function setupTestBoundaries(gear) {
		}

		function fullySpecify(gear) {
			rack.setNumberOfTeeth(10) 			
			rack.setLinearPitch(10)
		}

		ToothedComponentTest.shouldBehaveLikeToothedComponent(Rack, 
			                                                    setupTestBoundaries, 
			                                                    Circle,
			                                                    fullySpecify)
	})

	describe('#getPlacementShape', function() {
		var placementShape 

		beforeEach(function() {
			placementShape = rack.getPlacementShape()
		})

		it('should return a Rectangle', function() {
			placementShape.getType().should.equal("Rectangle")
		})

		describe.skip('the returned placement shape', function() {
			beforeEach(function() {
				rack.setLength(2)
				rack.setWidth(1) 
			})
			
			
			it('should be smaller than the bounding shape', function() {
				var boundingShape = rack.getBoundingShape()
				var placeLength = placementShape.getLength().getValue()
				var placeWidth = placementShape.getWidth().getValue()
				var boundLength = boundingShape.getLength().getValue()
				var boundWidth = boundingShape.getWidth().getValue()
				var placeSize = placeWidth + placeLength
				placeSize.should.be.lessThan(boundWidth + boundLength)
			})
		})
	})

	describe('#getBoundingShape', function() {
		it('should return a Rectangle', function() {
			rack.getBoundingShape().getType().should.equal("Rectangle")
		})
	})

	describe('#setToothedFace', function() {
		var toothedFace = "FRONT"
		
		it('should set which face of the Rack the teeth will be on', function() {
			rack.setToothedFace(toothedFace)
			rack.getToothedFace().should.equal(toothedFace)
		})

		it('should not be possible to set to an arbitrary value', function() {
			(function() {
				rack.setToothedFace("arbitrary")
			}).should.throw("Invalid face")
		})

		it('should be possible to set the face to any of Rack.FACES', function() {
			Rack.FACES.forEach(function(face) {
				rack.setToothedFace(face)
				rack.getToothedFace().should.equal(face)				
			})
		})
	})
})