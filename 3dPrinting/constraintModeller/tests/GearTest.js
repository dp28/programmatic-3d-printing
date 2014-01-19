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

describe('Gear', function() {
	var gear

	beforeEach(function() {
		gear = new Gear()
	})

	it('should inherit from Component', function() {
		gear.should.be.an.instanceOf(Component)
	})

	it('should have the same methods as a Component', function() {
		gear.should.have.property('getCentre')
		gear.should.have.property('getBoundingCircle')
		gear.should.have.property('toComponentSpecification')
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

			it('should have the same number of teeth as the Gear', function() {
				gearSpec.numTeeth.should.equal(gear.getNumberOfTeeth().getValue())
			})

			it('should have the same circular pitch as the Gear', function() {
				gearSpec.circularPitch.should.equal(gear.getCircularPitch())
			})

			it('should have the same pressure angle as the Gear', function() {
				gearSpec.pressureAngle.should.equal(gear.getPressureAngle().getValue())
			})

			it('should have the same clearance as the Gear', function() {
				gearSpec.clearance.should.equal(gear.getClearance().getValue())
			})

			it('should have the same thickness as the Gear', function() {
				gearSpec.thickness.should.equal(gear.getThickness().getValue())
			})

			it('should have the same centre hole radius as the Gear', function() {
				gearSpec.centreHoleRadius.should.equal(gear.getCentreHoleRadius().getValue())
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

			it('should have the same centre x coordinate as the Component', function() {
				gearSpec.centreX.should.equal(centreX)
			})

			it('should have the same centre y coordinate as the Component', function() {
				gearSpec.centreY.should.equal(centreY)
			})

			it('should have the same centre z coordinate as the Component', function() {
				gearSpec.centreZ.should.equal(centreZ)
			})

			it('should have the type "Gear', function() {
				gearSpec.type.should.equal('Gear')
			})
		})
	})
})