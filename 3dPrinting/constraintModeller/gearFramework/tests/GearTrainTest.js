/*
 * author: Daniel Patterson
 *
 * Tests GearTrains which contain a collection of Gears
 */
var should = require('should')
var Component = require('../../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent 
var Rack = require('../components/Rack.js').Rack 
var Base = require('../components/Base.js').Base 
var GearTrain = require('../components/GearTrain.js').GearTrain
var PlaceableComponentGroupTest = require('../../tests/PlaceableComponentGroupTest.js')
var GearTest = require('../tests/GearTest.js')
var BaseSpecificationTest = require('../tests/BaseSpecificationTest.js')

module.exports.createTestGearTrain = function() {
	var train = new GearTrain(8) 
	var firstGear = GearTest.createFullySpecifiedTestGear(10, 10, 1, 2, 3)
	firstGear.setPitchCircleRadius(null)
	train.addComponent(firstGear)
	var secondGear = GearTest.createFullySpecifiedTestGear(20, 10, 50, 200, 3)
	secondGear.setPitchCircleRadius(null)
	train.addComponent(secondGear)
	return train
}

module.exports.createInvalidTrainWithOverlappingGears = createInvalidTrainWithOverlappingGears
function createInvalidTrainWithOverlappingGears() {
	var train = new GearTrain(10)
	var firstGear = train.createGear(10)
	var secondGear = train.createGear(20)
	var thirdGear = train.createGear(15)
	firstGear.placeOnLeftOf(secondGear)
	secondGear.getCentre().setAt(0, 0, 0)
	thirdGear.getCentre().setAt(1, 3, 0)
	return train
}

module.exports.createTrainWithMeshingGears = createTrainWithMeshingGears
function createTrainWithMeshingGears() {
	var train = new GearTrain(10)
	var firstGear = train.createGear(10)
	var secondGear = train.createGear(20)
	var thirdGear = train.createGear(15)
	firstGear.placeOnRightOf(secondGear)
	thirdGear.placeOnLeftOf(secondGear)
	secondGear.getCentre().setAt(0, 0, 0)
	return train
}

describe('GearTrain', function() {
	var train 

	beforeEach(function() {
		train = new GearTrain(8) 
	})

	function exampleComponent() {
		var component = new Rack()
		component.setCircularPitch(8)
		return component
	}

	it('should behave like a Component', function() {
		PlaceableComponentGroupTest.shouldBehaveLikeComponentGroup(train,
		                                                           exampleComponent)
	})

	describe('#getTypeName', function() {
		it('should return "GearTrain"', function() {
			train.getTypeName().should.equal("GearTrain")
		})
	})

	describe('construction', function() {
		it('should not be possible to create a GearTrain without specifying a ' 
			 + 'circular pitch', function(){
			(function() {
				new GearTrain()
			}).should.throw("No circular pitch specified")
		})

		it('should not be possible to create a GearTrain by specifying a ' 
			 + 'circular pitch of 0 or below', function(){
			(function() {
				new GearTrain(0)
			}).should.throw("Invalid circular pitch specified")
		})

		it('should be possible to create a GearTrain with a circular pitch greater '
			 + 'than 0', function() {
			(function() {
				new GearTrain(10)
			}).should.not.throw()
		})

		it('should be possible to add an optional pressure angle', function() {
			var train = new GearTrain(10, 14)
			train.getPressureAngle().should.equal(14)
		})
	})

	describe('#shouldGenerateBaseOnWrite', function() {
		it('should have a default value of true', function() {
			train.shouldGenerateBaseOnWrite().should.be.true
		})
	})

	describe('#getPressureAngle', function() {
		it('should return the pressure angle that all ToothedComponents in the '
			 + 'GearTrain have', function() {
			train.getPressureAngle().should.be.a.Number
		})
	})

	describe('#addComponent', function() {
		var numberOfTeeth = 15
		var pitchCircleRadius = 20

		// Formula for circular pitch, see
		// http://www.cs.cmu.edu/~rapidproto/mechanisms/chpt7.html#HDR116A 
		var circularPitch = Math.PI * pitchCircleRadius * 2 / numberOfTeeth

		beforeEach(function() {
			gear = new Gear()
			train = new GearTrain(circularPitch)
		})

		describe('adding a Rack', function() {
			var rack 

			beforeEach(function() {
				rack = new Rack() 
				rack.setCircularPitch(train.getCircularPitch())
			})

			it('should set the linear pitch of the Rack', function() {
				train.addComponent(rack)
				rack.getLinearPitch().should.equal(circularPitch)
			})
			
		})

		describe('Adding a ToothedComponents with a different pressure angle', 
			       function() {

			beforeEach(function() {
				gear = GearTest.createFullySpecifiedTestGear(10, 50, 1, 2, 3)
				gear.setNumberOfTeeth(numberOfTeeth)
				gear.setPressureAngle(12)
			})

			it('should not be possible', function() {
				var error = "ToothedComponent pressure angle does not match GearTrain";
				(function() {
					train.addComponent(gear)
				}
				).should.throw(error)
			})
		})

		describe('adding a Gear', function() {
			var gear

			beforeEach(function() {
				gear = new Gear()
			})

			describe('Adding a Gear with a centre hole radius bigger than it\'s root '
				       + 'circle radius', function() {
				beforeEach(function() {
					// root circle radius must be less than pitch circle radius - clearance
					gear.setPitchCircleRadius(2) 
					gear.getCentreHoleRadius().setValue(2) 
				})
				
				it('should not be possible', function() {
					var error = "Invalid Gear - Centre hole radius bigger than root circle"
					            + " radius"
					try {
						train.addComponent(gear).should.throw(error)
					}
					catch(err) {
						err.message.should.contain(error)
					}
				})
			})

			describe('Adding a Gear with neither its number of teeth or pitch circle '
				       + 'radius set', function() {
				it ('should not be possible', function() {
					var error = "Number of teeth or pitch circle radius not set"
					try {
						train.addComponent(gear).should.throw(error)
					}
					catch(err) {
						err.message.should.eql(error)
					}
				})
			})

			describe('Adding a Gear with its number of teeth set but pitch circle radius'
			         + ' not yet set', function() {
				beforeEach(function() {
					gear.setNumberOfTeeth(numberOfTeeth)
					train.addComponent(gear)
				})

				it('should set the pitch circle radius of the Gear to the value '
					 + 'corresponding to the circular pitch of the GearTrain', function() {
					gear.getPitchCircleRadius().getValue().should.be.approximately(pitchCircleRadius, 0.001)
				})
			})

			describe('Adding a Gear with its pitch circle radius set but its number of '
				       + 'teeth not set', function() {
				beforeEach(function() {
					gear.setPitchCircleRadius(pitchCircleRadius)
					train.addComponent(gear)
				})

				it('should set the pitch circle radius of the Gear to the value '
					 + 'corresponding to the circular pitch of the GearTrain', function() {
					gear.getNumberOfTeeth().getValue().should.be.approximately(numberOfTeeth, 0.001)
				})
				
			})

			describe('Adding a Gear with both its number of teeth and pitch circle ' 
				       + 'radius set', function() {
				beforeEach(function() {
					gear.setNumberOfTeeth(numberOfTeeth)
					gear.setPitchCircleRadius(pitchCircleRadius)
				})

				it('should not be possible if the circular pitch of the Gear is different '
					 + 'from that of the GearTrain', function() {
					train = new GearTrain(circularPitch + 1)
					var error = "Circular pitch of ToothedComponent does not match GearTrain";
					(function() {
						train.addComponent(gear)
					}
					).should.throw(error)
				})

				it('should be possible if their circular pitches are the same',
				   function() {
					train = new GearTrain(circularPitch)
					train.getComponents().length.should.equal(0)			
					train.addComponent(gear)
					train.getComponents().length.should.equal(1)			
					train.getComponents()[0].getTypeName().should.equal("Gear")
				})
			})

			describe('successfully adding a Gear', function() {	
				beforeEach(function() {
					gear.setPitchCircleRadius(pitchCircleRadius)
					train.addComponent(gear)
				})			

				it('should give the Gear an id', function() {
					gear.getID().should.not.equal(null)
				})		

				describe('then adding another Gear', function() {
					var secondGear

					beforeEach(function() {
						secondGear = new Gear()
						secondGear.setPitchCircleRadius(pitchCircleRadius)
						train.addComponent(secondGear)
					})
					
					it('should give the second Gear a different id', function() {
						secondGear.getID().should.not.equal(gear.getID())
					})
				})
			})
		})
	})

	describe('#getCircularPitch', function() {
		it('should be the same as the value used to create it', function() {
			var circularPitch = 10
			train = new GearTrain(circularPitch)
			train.getCircularPitch().should.equal(circularPitch)
		})
	})

	describe('#createGear', function() {
		var gear, numTeeth = 10

		beforeEach(function() {
			gear = train.createGear(numTeeth) 
		})
		
		it('should return a Gear with the specified number of teeth', function() {
			gear.getNumberOfTeeth().getValue().should.equal(numTeeth)
		})

		it('should attach the new Gear to the GearTrain', function() {
			train.getComponents().should.contain(gear)
		})

		it('should give the new Gear the correct circular pitch', function() {
			gear.getCircularPitch().should.equal(train.getCircularPitch())
		})

		it('should have a bounding Circle with a radius greater than its pitch '
			 + 'circle radius by the addendum of all Gears in this GearTrain', function() {
			var boundRadius = gear.getBoundingShape().getRadius().getValue()
			var pitchRadius = gear.getPitchCircleRadius().getValue()
			boundRadius.should.be.approximately(pitchRadius + gear.getAddendum(), 
				                                  0.001)
			gear.getAddendum().should.be.greaterThan(0)
		})
	})

	describe('#onlyAdjacentComponentsTouching', function() {
		it('should return false if the GearTrain contains Gears that are '
			 + ' overlapping', function() {
			train = createInvalidTrainWithOverlappingGears()
			train.onlyAdjacentComponentsTouching().should.be.false
		})

		it('should return true if the GearTrain only contains meshing Gears',
		   function() {
			train = createTrainWithMeshingGears()
			train.onlyAdjacentComponentsTouching().should.be.true
		})		
	})

	describe('#findTouchingNonAdjacentComponents', function() {
		var firstGear, secondGear

		beforeEach(function() {
			train = new GearTrain(8)
			firstGear = train.createGear(10)
			firstGear.getCentre().setAt(0, 0, 0)
			secondGear = train.createGear(10)
			secondGear.getCentre().setAt(1, 1, 0)
		})
		
		it('should return all the overlapping ToothedComponents if there are any',
		   function() {
			train.findTouchingNonAdjacentComponents().should.contain(firstGear)
			train.findTouchingNonAdjacentComponents().should.contain(secondGear)
		})

		it('should return an empty array if no ToothedComponents overlap',
		   function() {
			train = createTrainWithMeshingGears()
			train.findTouchingNonAdjacentComponents().should.eql([])
		})
	})
})