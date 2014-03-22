/*
 * author: Daniel Patterson
 *
 * Tests a Rack component (part of a rack and pinion)
 */
var should = require('should')
var Rack = require('../components/Rack.js').Rack
var PlaceableComponent = require('../../components/PlaceableComponent.js').PlaceableComponent
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

	describe('#getTypeName', function() {
		it('should return "Rack"', function() {
			rack.getTypeName().should.equal("Rack")
		})
	})

	describe('#getPlacementShape', function() {
		var placementShape 

		beforeEach(function() {
			placementShape = rack.getPlacementShape()
		})

		it('should return a Rectangle', function() {
			placementShape.getType().should.equal("Rectangle")
		})

		describe('the returned placement shape', function() {
			var placeSize, boundSize

			beforeEach(function() {
				rack.setLength(20)
				rack.setWidth(5) 
				rack.setLinearPitch(2)
				var boundingShape = rack.getBoundingShape()
				var placeLength = placementShape.getLength().getValue()
				var placeWidth = placementShape.getWidth().getValue()
				var boundLength = boundingShape.getLength().getValue()
				var boundWidth = boundingShape.getWidth().getValue()
				placeSize = placeWidth + placeLength
				boundSize = boundWidth + boundLength
			})

			it('should be smaller than the bounding shape by twice the Rack\'s '
				 + 'addendum', function() {
				placeSize.should.be.equal(boundSize - 2 * rack.getAddendum())
			})

			it('should change depending on which face is the toothed face', function() {
				var addendum = rack.getAddendum()
				var bounds = rack.getBoundingShape()
				var frontAndBack = ["Front", "Back"]
				frontAndBack.forEach(function(face) {
					rack.setToothedFace(face)
					placementShape.getWidth().getValue().should.equal(bounds.getWidth().getValue() - 2 * addendum)
				})
				var leftAndRight = ["Left", "Right"]
				leftAndRight.forEach(function(face) {
					rack.setToothedFace(face)
					placementShape.getLength().getValue().should.equal(bounds.getLength().getValue() - 2 * addendum)
				})
			})
		})
	})

	describe('#getBoundingShape', function() {
		it('should return a Rectangle', function() {
			rack.getBoundingShape().getType().should.equal("Rectangle")
		})
	})

	describe('#setToothedFace', function() {
		var toothedFace = "Front"
		
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

	describe('placement methods', function() {
		var otherToothed

		beforeEach(function() {
			otherComponent= new PlaceableComponent() 
		})

		describe('#placeOnRightOf', function() {

			beforeEach(function() {
				rack.placeOnRightOf(otherComponent)
			})

			it('should set the Rack\'s toothed face to "Left"', function() {
				rack.getToothedFace().should.equal("Left")
			})
		})

		describe('#placeOnLeftOf', function() {

			beforeEach(function() {
				rack.placeOnLeftOf(otherComponent)
			})

			it('should set the Rack\'s toothed face to "Right"', function() {
				rack.getToothedFace().should.equal("Right")
			})
		})

		describe('#placeAtBackOf', function() {

			beforeEach(function() {
				rack.placeAtBackOf(otherComponent)
			})

			it('should set the Rack\'s toothed face to "Front"', function() {
				rack.getToothedFace().should.equal("Front")
			})
		})

		describe('#placeAtFrontOf', function() {

			beforeEach(function() {
				rack.placeAtFrontOf(otherComponent)
			})

			it('should set the Rack\'s toothed face to "Back"', function() {
				rack.getToothedFace().should.equal("Back")
			})
		})		
	})

	describe('#generateSupport', function() {
		it('should generate a RackSupport for the Rack', function() {
			rack.generateSupport().getTypeName().should.equal("RackSupport")
		})

		describe('the generated RackSupport', function() {
			var support 

			beforeEach(function() {
				rack.setLength(1)
				rack.setWidth(1)
				rack.setLinearPitch(4)
				support = rack.generateSupport() 
			})

			it('should have the same length as the Rack', function() {
				support.getLength().getValue().should.equal(rack.getLength().getValue())
			})

			it('should have the same width as the Rack', function() {
				support.getWidth().getValue().should.equal(rack.getWidth().getValue())
			})

			it('should have the same centre as the Rack', function() {
				support.getCentre().isAtSameLocationAs(rack.getCentre()).should.be.true
			})	

			describe('the wall of the support', function() {
				it('should have the same height as the Rack', function() {
					support.getWallHeight().getValue().should.equal(rack.getHeight())
				})

				it('should have a wall width the same as the addendum of the rack',
				   function() {
					support.getWallWidth().getValue().should.equal(rack.getAddendum())
				})
			})

		})
	})

})