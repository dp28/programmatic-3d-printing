/*
 * author: Daniel Patterson
 *
 * Tests the Gear class
 */
var should = require('should')
var Component = require('../components/Component.js').Component
var Gear = require('../components/Gear.js').Gear 
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../geometry/Circle.js').Circle
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var ComponentTest = require('../tests/ComponentTest.js')
var GearSpecificationTest = require('../tests/GearSpecificationTest.js')
var ComponentSpecificationTest = require('../tests/ComponentSpecificationTest.js')

module.exports.createFullySpecifiedTestGear = function() {
	var gear = new Gear()
	gear.getCentre().fixAt(50, 20, 8)
	gear.setNumberOfTeeth(15) 
	gear.setPitchCircleRadius(20)		
	return gear
}

module.exports.createSecondFullySpecifiedTestGear = function() {
	var gear = new Gear()
	gear.getCentre().fixAt(4, 5, 6)
	gear.setNumberOfTeeth(10) 
	gear.setPitchCircleRadius(20)		
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

	describe('#toComponentSpecification', function() {
		it('should return an Object when the centre is fixed', function() {
			gear.getCentre().fixAt(1, 2, 3)
			gear.toComponentSpecification().should.be.an.instanceof(Object)
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
			gear.toSpecification.should.throw()
		})

		it('should not be possible if the number of teeth has been set even if '
			 + ' the pitch radius has been', function() {
			gear.setPitchCircleRadius(10)
			gear.toSpecification.should.throw()
		})

		it('should not be possible if the pitch radius has been set even if '
			 + ' the number of teeth has been', function() {
			gear.setNumberOfTeeth(5)
			gear.toSpecification.should.throw()
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

	describe('#toComponentSpecification', function() {
		var centreX = 1
		var centreY = 2
		var centreZ = 3

		function setCentre() {
			gear.getCentre().fixAt(centreX, centreY, centreZ)
		}

		it('should not be possible if the centre point is not fully defined',
			 function() {
			gear.toComponentSpecification.should.throw()
		})

		it('should be possible if the centre point is fully defined ', function() {
			(function() {
										setCentre()
										gear.toComponentSpecification()
									}).should.not.throw()
 		})

		it('should return a ComponentSpecification Object', function() {
			setCentre()
			gear.toComponentSpecification().should.be.an.instanceOf(ComponentSpecification)
		})

		describe('the returned ComponentSpecification', function() {
			var gearSpec

			beforeEach(function() {
				setCentre()			
				gearSpec = gear.toComponentSpecification()				
			})

			it('should behave like a ComponentSpecification created from the Gear',
			   function() {
				ComponentSpecificationTest.testComponentSpecification(gearSpec, gear)
			})
		})
	})
})