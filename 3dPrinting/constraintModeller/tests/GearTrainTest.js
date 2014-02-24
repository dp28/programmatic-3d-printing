/*
 * author: Daniel Patterson
 *
 * Tests GearTrains which contain a collection of Gears
 */
 var util = require('util')
var should = require('should')
var Component = require('../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var Base = require('../components/Base.js').Base 
var GearTrain = require('../components/GearTrain.js').GearTrain
var ComponentTest = require('../tests/ComponentTest.js')
var GearTest = require('../tests/GearTest.js')
var BaseSpecificationTest = require('../tests/BaseSpecificationTest.js')

module.exports.createTestGearTrain = function() {
	var train = new GearTrain(8) 
	var firstGear = GearTest.createFullySpecifiedTestGear(10, 10, 1, 2, 3)
	firstGear.setPitchCircleRadius(null)
	train.addGear(firstGear)
	var secondGear = GearTest.createFullySpecifiedTestGear(20, 10, 50, 200, 3)
	secondGear.setPitchCircleRadius(null)
	train.addGear(secondGear)
	return train
}

module.exports.createInvalidTrainWithOverlappingGears = createInvalidTrainWithOverlappingGears
function createInvalidTrainWithOverlappingGears() {
	var train = new GearTrain(10)
	var firstGear = train.createGear(10)
	var secondGear = train.createGear(20)
	var thirdGear = train.createGear(15)
	firstGear.meshOnLeftOf(secondGear)
	secondGear.getCentre().setAt(0, 0, 0)
	thirdGear.getCentre().setAt(1, 3, 0)
	return train
}

function createTrainWithMeshingGears() {
	var train = new GearTrain(10)
	var firstGear = train.createGear(10)
	var secondGear = train.createGear(20)
	var thirdGear = train.createGear(15)
	firstGear.meshOnLeftOf(secondGear)
	thirdGear.meshOnRightOf(secondGear)
	secondGear.getCentre().setAt(0, 0, 0)
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
	})

	describe('#shouldGenerateSpindlesOnWrite', function() {
		it('should have a default value of true', function() {
			train.shouldGenerateSpindlesOnWrite().should.be.true
		})
	})

	describe('#shouldGenerateBaseOnWrite', function() {
		it('should have a default value of true', function() {
			train.shouldGenerateBaseOnWrite().should.be.true
		})
	})

	describe('#generateBase', function() {
		it('should return a Base', function() {
			train.generateBase().getTypeName().should.equal("Base")
		})

		describe('the generated Base', function() {
			var base, firstGear, secondGear, thirdGear

			beforeEach(function() {	
				train = new GearTrain(10)
				firstGear = train.createGear(10)
				secondGear = train.createGear(20)
				thirdGear = train.createGear(8)
				firstGear.meshAtFrontOf(secondGear)
				thirdGear.meshAtBackOf(secondGear)
				secondGear.getCentre().setAt(0, 0, 0)
				base = train.generateBase() 
			})

			function containsSupportingCirlce(base, gear) {
				var parts = base.getCircles()
				for (var i = parts.length - 1; i >= 0; i--) {
					if (gearSupportedByPointOnBase(gear, parts[i].getCentre(), base))
						return true 
				}

				return false
			}

			function gearSupportedByPointOnBase(gear, pointOnBase, base) {
				return gearDirectlyAboveOrBelowPoint(gear, pointOnBase) 
				       && isSupporting(gear, pointOnBase, base)
			}

			function gearDirectlyAboveOrBelowPoint(gear, point) {
				var gearX = gear.getCentre().getX().getValue()
				var gearY = gear.getCentre().getY().getValue()
				var pointX = point.getX().getValue()
				var pointY = point.getY().getValue() 
				return pointX == gearX && pointY == gearY
			}

			function isSupporting(gear, pointOnBase, base) {
				var baseHeight = base.getHeight().getValue()
				var gearZ = gear.getCentre().getZ().getValue()
				var gearThickness = gear.getThickness().getValue()
				var pointZ = pointOnBase.getZ().getValue()
				return pointZ == gearZ - gearThickness / 2 - baseHeight / 2 
			}

			function containsSupportingLineBetween(base, startGear, endGear) {
				var lines = base.getLines()
				for (var i = lines.length - 1; i >= 0; i--) {
					if (isSupportingLineFor(lines[i], startGear, endGear, base))
						return true
				};

				return false
			}

			function isSupportingLineFor(line, startGear, endGear, base) {
				return (gearSupportedByPointOnBase(startGear, line.getStart(), base) 
				       && gearSupportedByPointOnBase(endGear, line.getEnd(), base))
				       ||  (gearSupportedByPointOnBase(endGear, line.getStart(), base) 
				           && gearSupportedByPointOnBase(startGear, line.getEnd(), base))
			}


			it('should contain a Circle for each Gear', function() {
				base.getCircles().length.should.equal(3)
				containsSupportingCirlce(base, firstGear).should.be.true
				containsSupportingCirlce(base, secondGear).should.be.true
				containsSupportingCirlce(base, thirdGear).should.be.true
			})

			it('should contain a Line between each meshing Gear', function() {
				containsSupportingLineBetween(base, firstGear, secondGear).should.be.true
				containsSupportingLineBetween(base, thirdGear, secondGear).should.be.true
			})

			describe('#toSpecification', function() {
				it('return a Specification that behaves like a BaseSpecification ' 
					 + 'generated from this Base', function() {
					var baseSpec = base.toSpecification()
					BaseSpecificationTest.testBaseSpecification(baseSpec, base)
				})
			})			
		})
	})

	describe('#getAddendum', function() {
		it('should return the the circular pitch divided by PI', function() {
			train.getAddendum().should.be.approximately(train.getCircularPitch() /
				                                          Math.PI, 0.001)
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
					train.addGear(gear).should.throw(error)
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
				train.getGears()[0].getTypeName().should.equal("Gear")
			})
		})	

		describe('Adding a two Gears with different pressure angles', function() {
			var otherGear

			beforeEach(function() {
				gear.setNumberOfTeeth(numberOfTeeth)
				otherGear = GearTest.createFullySpecifiedTestGear()
				otherGear.setNumberOfTeeth(numberOfTeeth)
				otherGear.setPitchCircleRadius(null)
				otherGear.setPressureAngle(14)
				train.addGear(gear)
			})

			it('should not be possible', function() {
				var error = "Gear pressure angle does not match Gears in GearTrain";
				(function() {
					train.addGear(otherGear)
				}
				).should.throw(error)
			})
		})

		describe('successfully adding a Gear', function() {	
			beforeEach(function() {
				gear.setPitchCircleRadius(pitchCircleRadius)
				train.addGear(gear)
			})			

			it('should give the Gear an id', function() {
				gear.getID().should.not.equal(null)
			})		

			describe('then adding another Gear', function() {
				var secondGear

				beforeEach(function() {
					secondGear = new Gear()
					secondGear.setPitchCircleRadius(pitchCircleRadius)
					train.addGear(secondGear)
				})
				
				it('should give the second Gear a different id', function() {
					secondGear.getID().should.not.equal(gear.getID())
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
			train.getGears().should.contain(gear)
		})

		it('should give the new Gear the correct circular pitch', function() {
			gear.getCircularPitch().should.equal(train.getCircularPitch())
		})

		it('should have a bounding Circle with a radius greater than its pitch '
			 + 'circle radius by the addendum of all Gears in this GearTrain', function() {
			var boundRadius = gear.getBoundingCircle().getRadius().getValue()
			var pitchRadius = gear.getPitchCircleRadius().getValue()
			boundRadius.should.be.approximately(pitchRadius + train.getAddendum(), 
				                                  0.001)
		})
	})

	describe('#onlyMeshingGearsTouching', function() {
		it('should return false if the GearTrain contains Gears that are '
			 + ' overlapping', function() {
			train = createInvalidTrainWithOverlappingGears()
			train.onlyMeshingGearsTouching().should.be.false
		})

		it('should return true if the GearTrain only contains meshing Gears',
		   function() {
			train = createTrainWithMeshingGears()
			train.onlyMeshingGearsTouching().should.be.true
		})		
	})

	describe('#findNonMeshingTouchingGears', function() {
		var firstGear, secondGear

		beforeEach(function() {
			train = new GearTrain(8)
			firstGear = train.createGear(10)
			firstGear.getCentre().setAt(0, 0, 0)
			secondGear = train.createGear(10)
			secondGear.getCentre().setAt(1, 1, 0)
		})
		
		it('should return all the overlapping Gears if there are any', function() {
			train.findNonMeshingTouchingGears().should.contain(firstGear)
			train.findNonMeshingTouchingGears().should.contain(secondGear)
		})

		it('should return an empty array if no Gears overlap', function() {
			train = createTrainWithMeshingGears()
			train.findNonMeshingTouchingGears().should.eql([])
		})
	})
})