/*
 * author: Daniel Patterson
 *
 * Tests a Rack component (part of a rack and pinion)
 */
var should = require('should')
var Point = require('../../geometry/Point.js').Point
var Rack = require('../components/Rack.js').Rack
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var PlaceableComponent = require('../../components/PlaceableComponent.js').PlaceableComponent
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var ToothedComponentTest = require('../tests/ToothedComponentTest.js')
var RackSpecificationTest = require('../tests/RackSpecificationTest.js')

describe('Rack', function() {
	var rack 

	beforeEach(function() {
		rack = new Rack() 
	})
	
  it('should behave like a ToothedComponent', function() {

		function setupTestBoundaries(rack) {
		}

		function fullySpecify(rack) {
			rack.setNumberOfTeeth(10) 		
			rack.setLinearPitch(4)	
			rack.getCentre().fixAt(0, 0, 0)
			rack.setWidth(1)
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

	describe('#getWidth', function() {
		it('should have a default value of 15', function() {
			rack.getWidth().getValue().should.equal(15)
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

	describe('#isValid', function() {
		var toothed, otherToothed

		beforeEach(function() {
			toothed = new ToothedComponent() 
			otherToothed = new ToothedComponent()
		})
		
		it('should return true if the Rack has no adjacent components', function() {
			rack.isValid().should.be.true
		})

		it('should return true if the Rack has one adjacent component', function() {
			rack.placeOnLeftOf(toothed)
			rack.isValid().should.be.true
		})

		it('should return false if the Rack has more than one adjacent component',
		   function() {
			toothed.placeOnLeftOf(rack)
			otherToothed.placeAtBackOf(rack)
			rack.isValid().should.be.false
		})
	})

	describe('#checkIsValid', function() {
		it('should throw an Error if the Rack is invalid', function() {
			rack.placeOnLeftOf(new ToothedComponent())
			rack.placeOnRightOf(new ToothedComponent())
			try {
				rack.checkIsValid()	
			} catch(err) {
				err.message.should.equal("Invalid Rack - only one adjacent component allowed")
			}
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

		describe('placing other components with respect to the Rack', function() {
			describe('#placeAtBackOf', function() {
				beforeEach(function() {
					otherComponent.placeAtBackOf(rack) 
				})
				
				it('should set the Rack\'s tooth face to "Back"', function() {
					rack.getToothedFace().should.equal("Back")
				})
			})

			describe('#placeAtFrontOf', function() {
				beforeEach(function() {
					otherComponent.placeAtFrontOf(rack) 
				})
				
				it('should set the Rack\'s tooth face to "Front"', function() {
					rack.getToothedFace().should.equal("Front")
				})
			})

			describe('#placeOnLeftOf', function() {
				beforeEach(function() {
					otherComponent.placeOnLeftOf(rack) 
				})
				
				it('should set the Rack\'s tooth face to "Left"', function() {
					rack.getToothedFace().should.equal("Left")
				})
			})

			describe('#placeOnRightOf', function() {
				beforeEach(function() {
					otherComponent.placeOnRightOf(rack) 
				})
				
				it('should set the Rack\'s tooth face to "Right"', function() {
					rack.getToothedFace().should.equal("Right")
				})
			})			
		})	
	})

	describe('#generateAuxillaryComponents', function() {
		beforeEach(function() {
			rack = new Rack()
			rack.setLength(10)
			rack.setWidth(5)
			rack.setLinearPitch(4)
			rack.getCentre().setAt(0, 0, 0)
		})

		it('should return an Array containing a single RackSupport', function() {
			var support = rack.generateAuxillaryComponents()[0]
			shouldBeAMatchingRackSupport(rack, support)
		})
	})

	describe('#generateSupport', function() {

		beforeEach(function() {
			rack = new Rack()
		})

		it('should not be possible if the centre of the Rack is not defined',
			 function() {
				try {
					rack.generateSupport().should.throw("Point not fully defined")
				}
				catch(err) {
					err.should.equal("Point not fully defined")
				}
		}) 

		it('should not be possible if the height of the Rack is not defined',
			 function() {
			rack.getHeight().setValue(null)
			rack.getCentre().fixAt(0, 0, 0)
			try {
				rack.generateSupport().should.throw("Height not set")
			}
			catch(err) {
				err.should.equal("Height not set")
			} 
		})

		it('should not be possible if the width of the Rack is not defined',
			 function() {
			rack.setWidth(null)
			try {
				rack.generateSupport().should.throw("Width not set")
			}
			catch(err) {
				err.should.equal("Width not set")
			} 
		})

		it('should generate a RackSupport for the Rack', function() {			
			Rack.FACES.forEach(function(face) {
				rack = new Rack()
				rack.setToothedFace(face)
				rack.setLength(10)
				rack.setWidth(5)
				rack.setLinearPitch(4)
				rack.getCentre().fixAt(0, 0, 0)
				var support = rack.generateSupport() 
				shouldBeAMatchingRackSupport(rack, support)				
			})
		})
	})

	function shouldBeAMatchingRackSupport(rack, support) {
		describe('the generated RackSupport', function() {

			it('should be a RackSupport', function() {
				support.getTypeName().should.equal("RackSupport")
			})

			it('should have the same length as the Rack', function() {
				support.getLength().getValue().should.equal(rack.getLength().getValue())
			})

			it('should have the same toothed face as the Rack', function() {
				support.getToothedFace().should.equal(rack.getToothedFace())
			})

			it('should have the same width as the Rack', function() {
				support.getWidth().getValue().should.equal(rack.getWidth().getValue())
			})

			it('should have the same centre as the Rack', function() {
				support.getCentre().isAtSameLocationAs(rack.getCentre()).should.be.true
			})	

			describe('the wall of the support', function() {
				it('should have the same height as the Rack', function() {
					support.getWallHeight().getValue().should.equal(rack.getHeight().getValue())
				})

				it('should have a wall width the same as the addendum of the rack',
				   function() {
					support.getWallWidth().getValue().should.equal(rack.getAddendum())
				})

				it('should be centred at a distance of half the width of the Rack ' 
					 + 'minus half its addendum relative to the centre of the rack ' 
					 + 'nearest to the opposite face of the Rack\'s teeth', function() {
					var origin = new Point()
					origin.setAt(0, 0, 0)
					var wallCentre = support.getWallCentre()
					var distanceBetween = origin.distanceToOnXYPlane(wallCentre)
					var width = support.getWidth().getValue()
					var addendum = rack.getAddendum()
					var distanceFromOrigin = width / 2 - addendum / 2
					distanceBetween.should.equal(distanceFromOrigin)
				})
			})
		})
	}

	describe('#toSpecification', function() {

		beforeEach(function() {
			rack.getCentre().setAt(1, 2, 3) // Necessary for component.toSpecification 
		})
		
		it('should not be possible if neither the number of teeth nor the pitch '
			 + ' radius has been set', function() {
			rack.toSpecification.should.throw("Number of teeth not set")
		})

		it('should not be possible if the number of teeth has not been set even if '
			 + ' the length has been', function() {
			rack.setLength(10)
			rack.toSpecification.should.throw("Number of teeth not set")
		})

		it('should not be possible if the length has not been set even if'
			 + ' the number of teeth has been', function() {
			rack.setNumberOfTeeth(5)
			rack.toSpecification.should.throw("Length not set")
		})

		it('should be possible if it is fully specified', function() {
			rack.setLength(10)
			rack.setNumberOfTeeth(5)
			rack.toSpecification.should.not.throw()
 		})

		describe('the returned RackSpecification', function() {
			var rackSpec

			beforeEach(function() {
			rack.setLength(10)
			rack.setNumberOfTeeth(5)		
				rackSpec = rack.toSpecification()				
			})

			it('should behave like a RackSpecification created by the Rack',
			   function() {
				RackSpecificationTest.testRackSpecification(rackSpec, rack)
			})
		})
	})



	describe('#toString', function() {
		var numTeeth = 10
		var width = 15
		var length = 18
		var centreX = 1
		var centreY = 2
		var centreZ = 3
		beforeEach(function() {
			rack.setWidth(width)
			rack.setLength(length)
			rack.setNumberOfTeeth(numTeeth)
			rack.getCentre().setAt(centreX, centreY, centreZ)
		})

		it('should return a string', function() {
			rack.toString().should.be.type('string')
		})

		describe('the returned string', function() {
			var string 

			beforeEach(function() {
				string = rack.toString() 
			})

			it('should contain the id', function() {
				string.should.contain('ID: ')
			})
			
			it('should contain the number of teeth', function() {
				string.should.contain('Number of teeth: ' + numTeeth)
			})
			
			it('should contain the centre point', function() {
				string.should.contain('Centre point: (' + centreX + ', ' + centreY 
					                    + ', ' + centreZ + ')')
			})

			it('should describe the height', function() {
				string.should.contain('Height: ')
			})

			it('should describe the width', function() {
				string.should.contain('Width: ')
			})

			it('should describe the pressure angle', function() {
				string.should.contain('Pressure angle: ')
			})

			it('should describe the length', function() {
				string.should.contain('Length: ')
			})
		})		
	})
})