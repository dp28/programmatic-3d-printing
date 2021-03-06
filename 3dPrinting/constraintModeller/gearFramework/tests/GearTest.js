/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

/*
 * author: Daniel Patterson
 *
 * Tests the Gear class
 */
var should = require('should')
var Gear = require('../components/Gear.js').Gear 
var Spindle = require('../components/Spindle.js').Spindle
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var Circle = require('../../geometry/Circle.js').Circle
var Point = require('../../geometry/Point.js').Point
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var ToothedComponentTest = require('../tests/ToothedComponentTest.js')
var GearSpecificationTest = require('../tests/GearSpecificationTest.js')
var ComponentSpecificationTest = require('../../tests/ComponentSpecificationTest.js')

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
	var gear, otherGear

	beforeEach(function() {
		gear = new Gear()
	})

	it('should behave like a ToothedComponent', function() {

		function setupTestBoundaries(gear) {			
			gear.setPitchCircleRadius(10)
		}

		function fullySpecify(gear) {
			gear.setNumberOfTeeth(10) 
			gear.setPitchCircleRadius(5)	
			point = new Point()
			point.setAt(1, 2, 3)
			gear.setCentre(point)
		}

		ToothedComponentTest.shouldBehaveLikeToothedComponent(Gear, 
			                                                    setupTestBoundaries, 
			                                                    Circle,
			                                                    fullySpecify)
	})

	describe('#getTypeName', function() {
		it('should return "Gear"', function() {
			gear.getTypeName().should.equal("Gear")
		})
	})

	describe('#getPitchCircleRadius', function() {
		it('should return a ConstrainableValue', function() {
			gear.getPitchCircleRadius().should.be.an.instanceOf(ConstrainableValue)
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

	describe('#getCentreHoleRadius', function() {
		it('should return a ConstrainableValue', function() {
			gear.getCentreHoleRadius().should.be.an.instanceOf(ConstrainableValue)
		})

		it('should have a default value', function() {
			gear.getCentreHoleRadius().getValue().should.not.be.undefined
		})
	})

	describe('#isValid', function() {
		beforeEach(function() {
			gear.setCentreHoleRadius(100)
			gear.setPitchCircleRadius(50)
			gear.setNumberOfTeeth(5) 
		})
		
		it('should be false if the centre hole radius is larger than the pitch '
			 + 'radius', function() {
			gear.isValid().should.be.false
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

		beforeEach(function() {
			gear.getCentre().setAt(1, 2, 3) // Necessary for component.toSpecification 
		})
		
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

			it('should behave like a ComponentSpecification created by the Gear',
				 function() {
				ComponentSpecificationTest.testComponentSpecification(gearSpec, gear)
			})
		})

		describe('when the Gear is meshing with another Gear', function() {
			describe('the returned GearSpecification', function() {
				var gearSpec

				beforeEach(function() {
					setExampleNumTeethAndPitchRadius()
					var anotherGear = new Gear() 
					gear.placeOnRightOf(anotherGear)
					gearSpec = gear.toSpecification()
				})
				
				it('should behave like a GearSpecification created by the Gear',
				   function() {
					GearSpecificationTest.testGearSpecification(gearSpec, gear)
				})
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

		it('should not be possible if the height of the Gear is not defined',
			 function() {
			gear.getHeight().setValue(null)
			gear.getCentre().fixAt(0, 0, 0)
			try {
				gear.generateSpindle().should.throw("Height not set")
			}
			catch(err) {
				err.should.equal("Height not set")
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
			gear.generateSpindle().getTypeName().should.equal("Spindle")
		})

		describe('the produced Spindle', function() {
			var spindle

			beforeEach(function() {
				gear = createFullySpecifiedTestGear()
				spindle = gear.generateSpindle()
			})

			it('should behave like a Spindle generated by this Gear',
				 function() {
				shouldBeAMatchingSpindle(gear, spindle)
			})
		})
	})

	describe('#generateAuxillaryComponents', function() {
		beforeEach(function() {
			gear = createFullySpecifiedTestGear()
		})

		it('should return an Array containing a single Spindle', function() {
			var spindle = gear.generateAuxillaryComponents()[0]
			shouldBeAMatchingSpindle(gear, spindle)
		})
	})

	function shouldBeAMatchingSpindle(gear, spindle) {
		describe('the produced Spindle', function() {
			it('should have a height at least as large as the height of the Gear',
				 function() {
				spindle.getHeight().getValue().should.not.be.lessThan(gear.getHeight().getValue())
			})

			it('should have a radius at most as large as the centre hole radius of '
				 + 'the Gear', function() {
				spindle.getRadius().getValue().should.not.be.greaterThan(gear.getCentreHoleRadius().getValue())
			})

			it('should have the same centre point as the Gear', function() {
				spindle.getCentre().isAtSameLocationAs(gear.getCentre()).should.be.true
			})
		})
	}

	describe('#isAdjacentTo', function() {
		beforeEach(function() {
			gear = new Gear()
			gear.setPitchCircleRadius(10)
			gear.getCentre().setAt(10, 11, 12)
			otherGear = new Gear()
			otherGear.setPitchCircleRadius(20)
			otherGear.getCentre().setAt(1, 2, 3)
		})
		
		it('should be false if the Gears\' pitch circles overlap', function() {
			gear.isAdjacentTo(otherGear).should.be.false
		})

		it('should be false if the Gears\' pitch circles do not touch', function() {
			otherGear.setPitchCircleRadius(1)
			gear.isAdjacentTo(otherGear).should.be.false
		})

		it('should be true if the Gears have been set to mesh', function() {
			gear.placeOnLeftOf(otherGear)
			otherGear.getCentre().setAt(1.6, 2.9, 30)
			gear.isAdjacentTo(otherGear).should.be.true
		})
	})

	describe('#toString', function() {
		var id
		var numTeeth = 10
		var pitchCircleRadius = 15
		var boundRadius = 18
		var centreX = 1
		var centreY = 2
		var centreZ = 3
		beforeEach(function() {
			gear = createFullySpecifiedTestGear(numTeeth,
																					pitchCircleRadius,
																					centreX,
																					centreY,
																					centreZ)
			id = gear.getID()
			gear.getBoundingShape().setRadius(boundRadius)
		})

		it('should return a string', function() {
			gear.toString().should.be.type('string')
		})

		describe('the returned string', function() {
			var string 

			beforeEach(function() {
				string = gear.toString() 
			})

			it('should contain the id', function() {
				string.should.contain('ID: ' + id)
			})
			
			it('should contain the number of teeth', function() {
				string.should.contain('Number of teeth: ' + numTeeth)
			})
			
			it('should contain the pitch circle radius', function() {
				string.should.contain('Pitch circle radius: ' + pitchCircleRadius)
			})
			
			it('should contain the bounding radius', function() {
				string.should.contain('Bounding circle radius: ' + boundRadius)
			})
			
			it('should contain the centre point', function() {
				string.should.contain('Centre point: (' + centreX + ', ' + centreY 
					                    + ', ' + centreZ + ')')
			})

			it('should describe the height', function() {
				string.should.contain('Height: ')
			})

			it('should describe the clearance', function() {
				string.should.contain('Clearance: ')
			})

			it('should describe the pressure angle', function() {
				string.should.contain('Pressure angle: ')
			})

			it('should describe the centre hole radius', function() {
				string.should.contain('Centre hole radius: ')
			})
		})		
	})
})