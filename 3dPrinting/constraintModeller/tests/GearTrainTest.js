/*
 * author: Daniel Patterson
 *
 * Tests GearTrains which contain a collection of Gears
 */
var should = require('should')
var Component = require('../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var GearTrain = require('../components/GearTrain.js').GearTrain
var ComponentTest = require('../tests/ComponentTest.js')
var GearTest = require('../tests/GearTest.js')

module.exports.createTestGearTrain = function() {
	var train = new GearTrain(8) 
	var firstGear = GearTest.createFullySpecifiedTestGear(10, 10, 1, 2, 3)
	firstGear.setPitchCircleRadius(null)
	train.addGear(firstGear)
	var secondGear = GearTest.createFullySpecifiedTestGear(20, 10, 50, 20, 3)
	secondGear.setPitchCircleRadius(null)
	train.addGear(secondGear)
	return train
}

describe('GearTrain', function() {
	var train 

	beforeEach(function() {
		train = new GearTrain(8) 
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(train)
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
	})

	describe('#getGenerateSpindlesOnWrite', function() {
		it('should have a default value of true', function() {
			train.getGenerateSpindlesOnWrite().should.be.true
		})
	})

	describe('#addGear', function() {
		var gear
		var numberOfTeeth = 15
		var pitchCircleRadius = 20

		// Formula for circular pitch, see
		// http://www.cs.cmu.edu/~rapidproto/mechanisms/chpt7.html#HDR116A 
		var circularPitch = Math.PI * pitchCircleRadius * 2 / numberOfTeeth

		beforeEach(function() {
			gear = new Gear()
			train = new GearTrain(circularPitch)
		})

		describe('Adding a Gear with neither its number of teeth or pitch circle '
			       + 'radius set', function() {
			it ('should not be possible', function() {
				var error = "Number of teeth or pitch circle radius not set"
				try {
					train.addGear(gear).should.throw(error)
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
				train.addGear(gear)
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
				train.addGear(gear)
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
				var error = "Circular pitch of Gear does not match GearTrain";
				(function() {
					train.addGear(gear)
				}
				).should.throw(error)
			})

			it('should be possible if their circular pitches are the same',
			   function() {
				train = new GearTrain(circularPitch)
				train.getGears().length.should.equal(0)			
				train.addGear(gear)
				train.getGears().length.should.equal(1)			
				train.getGears()[0].should.be.an.instanceof(Gear)	
			})
		})

		describe('Adding a Gear with the number of teeth specified but the pitch radius unspecified', function() {
			beforeEach(function() {
				gear = new Gear()
				gear.setNumberOfTeeth()
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
})