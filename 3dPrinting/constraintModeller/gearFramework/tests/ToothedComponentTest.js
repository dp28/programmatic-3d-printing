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
 * Tests any ToothedComponent, eg a Gear
 */
var should = require('should')
var ToothedComponent = require('../components/ToothedComponent.js').ToothedComponent
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var PlaceableComponentTest = require('../../tests/PlaceableComponentTest.js')
var ToothedComponentSpecificationTest = require('../tests/ToothedComponentSpecificationTest.js')

module.exports.shouldBehaveLikeToothedComponent = shouldBehaveLikeToothedComponent

describe('ToothedComponent', function() {
	var toothed 

	beforeEach(function() {
		toothed = new ToothedComponent(Circle) 
	})	

	function setupTestBoundaries() {}

	function fullySpecify() {}

	it('should behave like a ToothedComponent', function() {
		shouldBehaveLikeToothedComponent(ToothedComponent, 
			                               setupTestBoundaries, 
			                               Circle,
			                               fullySpecify)
	})

	describe('#getTypeName', function() {
		it('should return "ToothedComponent"', function() {
			toothed.getTypeName().should.equal("ToothedComponent")
		})
	})

	describe('#getAddendum', function() {
		it('should only be implemented by subclasses', function() {
			(function() {
				toothed.getAddendum()
			}).should.throw("Not implemented in this instance")
		})
	})

	describe('getCircularPitch', function() {
		it('should only be implemented by subclasses', function() {
			(function() {
				toothed.getCircularPitch()
			}).should.throw("Not implemented in this instance")
		})
	})

	describe('setCircularPitch', function() {
		it('should only be implemented by subclasses', function() {
			(function() {
				toothed.setCircularPitch()
			}).should.throw("Not implemented in this instance")
		})
	})

	describe('#isValid', function() {
		it('return true, but can be overriden by subclasses', function() {
			toothed.isValid().should.be.true
		})
	})

	describe('#checkIsValid', function() {
		it('should not throw an error if the ToothedComponent is valid', function() {
			toothed.checkIsValid.should.not.throw()
		})

		it('should throw an error if the ToothedComponent is invalid', function() {
			toothed.isValid = function() {return false}
			toothed.checkIsValid.should.throw("Invalid ToothedComponent")
		})
	})
})

function shouldBehaveLikeToothedComponent(toothedType, 
	                                        setupTestBoundaries,
	                                        boundaryShape,
	                                        fullySpecify) {

	describe('Anything inheriting from ToothedComponent', function() {	
		var toothed	

		beforeEach(function() {
			toothed = new toothedType() 
		})
		

		it('should behave like a PlaceableComponent', function() {
			PlaceableComponentTest.shouldBehaveLikePlaceableComponent(toothedType, 
				                                                        setupTestBoundaries, 
				                                                        boundaryShape,
				                                                        fullySpecify)
		})

		describe('#getNumberOfTeeth', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getNumberOfTeeth().should.be.an.instanceOf(ConstrainableValue)
			})
		})

		describe('#getPressureAngle', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getPressureAngle().should.be.an.instanceOf(ConstrainableValue)
			})

			it('should have a default value', function() {
				toothed.getPressureAngle().getValue().should.not.be.undefined
			})
		})

		describe('#getHeight', function() {
			it('should return a ConstrainableValue', function() {
				toothed.getHeight().should.be.an.instanceOf(ConstrainableValue)
			})

			it('should have a default value', function() {
				toothed.getHeight().getValue().should.not.be.null
			})
		})

		describe('#setHeight', function() {
			it('should set the height of the ToothedComponent', function() {
				toothed.setHeight(1)
				toothed.getHeight().getValue().should.equal(1)
			})
		})

		if (toothedType != ToothedComponent) {
			describe('#getAddendum', function() {
				beforeEach(function() {
					fullySpecify(toothed) 
				})
				
				it('should return a number', function() {
						toothed.getAddendum().should.be.a.Number
				})
			})

			describe('getCircularPitch when fully specified', function() {
				beforeEach(function() {
					fullySpecify(toothed) 
				})
				
				it('should return a number ', function() {
					toothed.getCircularPitch().should.be.a.Number
				})
			})
		}

		describe('#toSpecification', function() {
			
			it('should not be possible if the number of teeth has not been set',
			   function() {
				toothed.toSpecification.should.throw("Number of teeth not set")
			})

			it('should not be possible if the ToothedComponent is invalid', function() {
				toothed.isValid = function() {return false}
 				toothed.setNumberOfTeeth(10)
 				fullySpecify(toothed)
 				try {
					toothed.toSpecification()
				}
				catch(err) {
					err.message.should.contain("Invalid")
				}
			})

			describe('the returned ToothedComponentSpecification', function() {
				var spec 

 				beforeEach(function() {
 					// Necessary for component.toSpecification
 					toothed.getCentre().setAt(1, 2, 3) 
 					// Necessary for toothed.toSpecification
 					toothed.setNumberOfTeeth(10)
 					fullySpecify(toothed)
 					spec = toothed.toSpecification() 
 				}) 				

				it('should behave like a ToothedComponentSpecification', function() {
					ToothedComponentSpecificationTest.testToothedComponentSpecification(spec,
					 toothed)
				})
			})
		})
	})
}