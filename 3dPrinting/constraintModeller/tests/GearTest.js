/*
 * author: Daniel Patterson
 *
 * Tests the Gear class
 */
var should = require('should')
var Component = require('../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var Spindle = require('../components/Spindle.js').Spindle
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../geometry/Circle.js').Circle
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var ComponentTest = require('../tests/ComponentTest.js')
var GearSpecificationTest = require('../tests/GearSpecificationTest.js')
var ComponentSpecificationTest = require('../tests/ComponentSpecificationTest.js')

module.exports.createFullySpecifiedTestGear = createFullySpecifiedTestGear

function createFullySpecifiedTestGear(numTeeth, radius, x, y, z) {
	// defaults:
	numTeeth = (numTeeth == undefined) ? 15 : numTeeth
	radius = (radius == undefined) ? 20 : radius
	x = (x == undefined) ? 50 : x
	y = (y == undefined) ? 20 : y 
	z = (z == undefined) ? 8 : z

	var gear = new Gear()
	gear.getCentre().fixAt(x, y, z)
	gear.setNumberOfTeeth(numTeeth) 
	gear.setPitchCircleRadius(radius)		
	return gear
}

describe('Gear', function() {
	var gear

	beforeEach(function() {
		gear = new Gear()
	})

	it('should behave like a Component', function() {
		ComponentTest.shouldBehaveLikeComponent(gear)
	})

	describe('#getTypeName', function() {
		it('should return "Gear"', function() {
			gear.getTypeName().should.equal("Gear")
		})
	})

	describe('#getNumberOfTeeth', function() {
		it('should return a ConstrainableValue', function() {
			gear.getNumberOfTeeth().should.be.an.instanceOf(ConstrainableValue)
		})
	})

	describe('#getPitchCircleRadius', function() {
		it('should return a ConstrainableValue', function() {
			gear.getPitchCircleRadius().should.be.an.instanceOf(ConstrainableValue)
		})
	})

	describe('#getPressureAngle', function() {
		it('should return a ConstrainableValue', function() {
			gear.getPressureAngle().should.be.an.instanceOf(ConstrainableValue)
		})

		it('should have a default value', function() {
			gear.getPressureAngle().getValue().should.not.be.undefined
		})
	})

	describe('#getClearance', function() {
		it('should return a ConstrainableValue', function() {
			gear.getClearance().should.be.an.instanceOf(ConstrainableValue)
		})

		it('should have a default value', function() {
			gear.getClearance().getValue().should.not.be.undefined
		})
	})

	describe('#getThickness', function() {
		it('should return a ConstrainableValue', function() {
			gear.getThickness().should.be.an.instanceOf(ConstrainableValue)
		})

		it('should have a default value', function() {
			gear.getThickness().getValue().should.not.be.undefined
		})
	})

	describe('#getCentreHoleRadius', function() {
		it('should return a ConstrainableValue', function() {
			gear.getCentreHoleRadius().should.be.an.instanceOf(ConstrainableValue)
		})

		it('should have a default value', function() {
			gear.getCentreHoleRadius().getValue().should.not.be.undefined
		})
	})


	var exampleDiameter = 20
	var exampleNumTeeth = 5

  function setExampleNumTeethAndPitchRadius() {
		gear.setNumberOfTeeth(exampleNumTeeth) 
		gear.setPitchCircleRadius(exampleDiameter / 2)	
	}

	describe('#getCircularPitch', function() {

		it('should not be calculable if neither the number of teeth nor the pitch '
			 + ' radius has been set', function() {
			gear.getCircularPitch.should.throw()
		})

		it('should not be calculable if the number of teeth has been set even if '
			 + ' the pitch radius has been', function() {
			gear.setPitchCircleRadius(10)
			gear.getCircularPitch.should.throw()
		})

		it('should not be calculable if the pitch radius has been set even if '
			 + ' the number of teeth has been', function() {
			gear.setNumberOfTeeth(5)
			gear.getCircularPitch.should.throw()
		})

		it('should be calculable if both the number of teeth and pitch radius are '
			 + 'set', function() {
			setExampleNumTeethAndPitchRadius()
			gear.getCircularPitch.should.not.throw()
 		})

 		it('should be PI times the pitch diameter divided by the number of teeth', 
 			 function() {
 			setExampleNumTeethAndPitchRadius()
 			gear.getCircularPitch().should.be.approximately(Math.PI * exampleDiameter/
 			                                                exampleNumTeeth, .001)
 		})
	})

	describe('#toSpecification', function() {
		it('should not be possible if neither the number of teeth nor the pitch '
			 + ' radius has been set', function() {
			gear.toSpecification.should.throw("Number of teeth not set")
		})

		it('should not be possible if the number of teeth has not been set even if '
			 + ' the pitch radius has been', function() {
			gear.setPitchCircleRadius(10)
			gear.toSpecification.should.throw("Number of teeth not set")
		})

		it('should not be possible if the pitch radius has not been set even if '
			 + ' the number of teeth has been', function() {
			gear.setNumberOfTeeth(5)
			gear.toSpecification.should.throw("Pitch radius not set")
		})

		it('should be possible if both the number of teeth and pitch radius are '
			 + 'set', function() {
			setExampleNumTeethAndPitchRadius()
			gear.toSpecification.should.not.throw()
 		})

		it('should return a GearSpecification Object', function() {
			setExampleNumTeethAndPitchRadius()
			gear.toSpecification().should.be.an.instanceOf(GearSpecification)
		})

		describe('the returned GearSpecification', function() {
			var gearSpec

			beforeEach(function() {
				setExampleNumTeethAndPitchRadius()			
				gearSpec = gear.toSpecification()				
			})

			it('should behave like a GearSpecification created by the Gear',
			   function() {
				GearSpecificationTest.testGearSpecification(gearSpec, gear)
			})
		})
	})

	describe('#generateSpindle', function() {
		beforeEach(function() {
			gear = new Gear()
		})

		it('should not be possible if the centre of the Gear is not defined',
			 function() {
				try {
					gear.generateSpindle().should.throw("Point not fully defined")
				}
				catch(err) {
					err.should.equal("Point not fully defined")
				}
		}) 

		it('should not be possible if the thickness of the Gear is not defined',
			 function() {
			gear.getThickness().setValue(null)
			gear.getCentre().fixAt(0, 0, 0)
			try {
				gear.generateSpindle().should.throw("Thickness not set")
			}
			catch(err) {
				err.should.equal("Thickness not set")
			} 
		})

		it('should not be posible if the centre hole radius is not defined',
		   function() {
		  gear.getCentreHoleRadius().setValue(null)
			gear.getCentre().fixAt(0, 0, 0)
			try {
				gear.generateSpindle().should.throw("Centre hole radius not set")
			}
			catch(err) {
				err.should.equal("Centre hole radius not set")
			} 
		})

		it('should not be posible if the centre hole radius is 0',
		   function() {
		  gear.getCentreHoleRadius().setValue(0)
			gear.getCentre().fixAt(0, 0, 0)
			try {
				gear.generateSpindle().should.throw("No centre hole in this Gear")
			}
			catch(err) {
				err.should.equal("No centre hole in this Gear")
			} 
		})

		it('should produce a Spindle', function() {
			gear = createFullySpecifiedTestGear()
			gear.generateSpindle().should.be.an.instanceof(Spindle)
		})

		describe('the produced Spindle', function() {
			var spindle

			beforeEach(function() {
				gear = createFullySpecifiedTestGear()
				spindle = gear.generateSpindle()
			})

			it('should have a height at least as large as the thickness of the Gear',
				 function() {
				spindle.getHeight().getValue().should.not.be.lessThan(gear.getThickness().getValue())
			})

			it('should have a radius at most as large as the centre hole radius of '
				 + 'the Gear', function() {
				spindle.getRadius().getValue().should.not.be.greaterThan(gear.getCentreHoleRadius().getValue())
			})

			it('should have the same centre point as the Gear', function() {
				spindle.getCentre().atSameLocationAs(gear.getCentre()).should.be.true
			})
		})
	})

	describe('#meshOnLeftOf', function() {
		var otherGear

		beforeEach(function() {
			gear = new Gear()
			gear.setPitchCircleRadius(10)
			otherGear = new Gear()
			otherGear.setPitchCircleRadius(20)
			gear.meshOnLeftOf(otherGear)
			otherGear.getCentre().setAt(1, 2, 3)
		})

		describe('the dependent Gear', function() {
			it('should have its centre set when the independent Gear\'s centre is set',
				 function() {
				gear.getCentre().isFullyDefined().should.be.true
			})

			it('should be centred to the left of the independent Gear by a distance '
				 + 'of the sum of their pitch circle radii', function() {
				var gearCentreX = gear.getCentre().getX().getValue()
				var otherGearCentreX = otherGear.getCentre().getX().getValue()
				var gearPitchRadius = gear.getPitchCircleRadius().getValue()
				var otherGearPitchRadius = otherGear.getPitchCircleRadius().getValue()
				gearCentreX.should.equal(otherGearCentreX - (gearPitchRadius 
					                                           + otherGearPitchRadius))
			})
		})
	})

	describe('#meshOnRightOf', function() {
		var otherGear

		beforeEach(function() {
			gear = new Gear()
			gear.setPitchCircleRadius(10)
			otherGear = new Gear()
			otherGear.setPitchCircleRadius(20)
			gear.meshOnRightOf(otherGear)
			otherGear.getCentre().setAt(1, 2, 3)
		})

		describe('the dependent Gear', function() {
			it('should have its centre set when the independent Gear\'s centre is set',
				 function() {
				gear.getCentre().isFullyDefined().should.be.true
			})

			it('should be centred to the right of the independent Gear by a distance '
				 + 'of the sum of their pitch circle radii', function() {
				var gearCentreX = gear.getCentre().getX().getValue()
				var otherGearCentreX = otherGear.getCentre().getX().getValue()
				var gearPitchRadius = gear.getPitchCircleRadius().getValue()
				var otherGearPitchRadius = otherGear.getPitchCircleRadius().getValue()
				gearCentreX.should.equal(otherGearCentreX + (gearPitchRadius 
					                                           + otherGearPitchRadius))
			})
		})
	})

	describe('#meshAtFrontOf', function() {
		var otherGear

		beforeEach(function() {
			gear = new Gear()
			gear.setPitchCircleRadius(10)
			otherGear = new Gear()
			otherGear.setPitchCircleRadius(20)
			gear.meshAtFrontOf(otherGear)
			otherGear.getCentre().setAt(1, 2, 3)
		})

		describe('the dependent Gear', function() {
			it('should have its centre set when the independent Gear\'s centre is set',
				 function() {
				gear.getCentre().isFullyDefined().should.be.true
			})

			it('should be centred to the right of the independent Gear by a distance '
				 + 'of the sum of their pitch circle radii', function() {
				var gearCentreY = gear.getCentre().getY().getValue()
				var otherGearCentreY = otherGear.getCentre().getY().getValue()
				var gearPitchRadius = gear.getPitchCircleRadius().getValue()
				var otherGearPitchRadius = otherGear.getPitchCircleRadius().getValue()
				gearCentreY.should.equal(otherGearCentreY + (gearPitchRadius 
					                                           + otherGearPitchRadius))
			})
		})
	})

	describe('#meshAtBackOf', function() {
		var otherGear

		beforeEach(function() {
			gear = new Gear()
			gear.setPitchCircleRadius(10)
			otherGear = new Gear()
			otherGear.setPitchCircleRadius(20)
			gear.meshAtBackOf(otherGear)
			otherGear.getCentre().setAt(1, 2, 3)
		})

		describe('the dependent Gear', function() {
			it('should have its centre set when the independent Gear\'s centre is set',
				 function() {
				gear.getCentre().isFullyDefined().should.be.true
			})

			it('should be centred to the right of the independent Gear by a distance '
				 + 'of the sum of their pitch circle radii', function() {
				var gearCentreY = gear.getCentre().getY().getValue()
				var otherGearCentreY = otherGear.getCentre().getY().getValue()
				var gearPitchRadius = gear.getPitchCircleRadius().getValue()
				var otherGearPitchRadius = otherGear.getPitchCircleRadius().getValue()
				gearCentreY.should.equal(otherGearCentreY + -(gearPitchRadius 
					                                           + otherGearPitchRadius))
			})
		})
	})
})