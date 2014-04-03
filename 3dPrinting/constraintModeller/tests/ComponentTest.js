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
 * Tests the base class for all components
 */
var should = require('should')
var Component = require('../components/Component.js').Component 
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle
var ComponentSpecificationTest = require('../tests/ComponentSpecificationTest.js')
var ShapeTest = require('../tests/ShapeTest.js')

module.exports.shouldBehaveLikeComponent = shouldBehaveLikeComponent
module.exports.createFullySpecifiedTestComponent = function() {
	var component = new Component() 
	component.getCentre().fixAt(1, 3, 4)
	return component
}

describe('Component', function() {
	var component

	beforeEach(function() {
		component = new Component()
	})

	it('should behave like a Component', function() {
		shouldBehaveLikeComponent(component)
	})

	// Overidden by subclasses
	describe('#getTypeName', function() {
		it('should return "Component"', function() {
			component.getTypeName().should.equal('Component')
		})
	})

	describe('creation', function() {
		var otherComponent

		beforeEach(function() {
			otherComponent = new Component() 
		})
		
		it('should create a Component with a unique ID', function() {
			component.getID().should.not.equal(otherComponent.getID())
		})
	})

	describe('#isTouching', function() {
		var otherComponent

		beforeEach(function() {
			otherComponent = new Component()
			otherComponent.getCentre().setAt(0, 0, 0)
			component.getBoundingShape().setRadius(5)
			component.getCentre().setAt(12, 0, 0)
		})

		it('should be false if the Components\' bounding shapes do not intersect', 
			 function() {
			otherComponent.getBoundingShape().setRadius(5)
			component.isTouching(otherComponent).should.be.false
		})
		
		it('should be true if the Components\' bounding shapes intersect', function() {
			otherComponent.getBoundingShape().setRadius(50)
			component.isTouching(otherComponent).should.be.true
		})
	})
})

function shouldBehaveLikeComponent(component) {
	describe('Anything inheriting from Component', function() {

		describe('#getBoundingShape', function() {
			it('should return a Shape', function() {
				ShapeTest.shouldBehaveLikeShape(component.getBoundingShape())
			})
		})

		describe('#getCentre', function() {
			it('should return a Point', function() {
				component.getCentre().should.be.an.instanceOf(Point)
			})
		})

		describe('#setCentre', function() {
			var point, x =1, y = 2, z = 3

			beforeEach(function() {
				point = new Point()
				point.fixAt(x, y, z)
				component.setCentre(point)
			})

			it('should set the centre of the Component to have the same coordinates as '
				 + 'the passed-in Point', function() {
				component.getCentre().isAtSameLocationAs(point).should.be.true
			})
			
			it('should not have exactly the same Point as its centre', function() {
				component.getCentre().should.not.equal(point)
			})
		})

		describe('#toString', function() {
		var id
		var centreX = 1
		var centreY = 2
		var centreZ = 3

		beforeEach(function() {
			component = new Component()
			id = component.getID()
			var centre = new Point()
			centre.setAt(centreX, centreY, centreZ)
			component.setCentre(centre)
		})

		it('should return a string', function() {
			component.toString().should.be.type('string')
		})

		describe('the returned string', function() {
			var string 

			beforeEach(function() {
				string = component.toString() 
			})

			it('should contain the id', function() {
				string.should.contain('ID: ' + id)
			})
			
			it('should contain the centre point', function() {
				string.should.contain('Centre point: (' + centreX + ', ' + centreY 
					                    + ', ' + centreZ + ')')
			})
		})		
	})

		describe('#toSpecification', function() {
			var centreX = 1
			var centreY = 2
			var centreZ = 3

			function fixCentre() {
				component.getCentre().fixAt(centreX, centreY, centreZ)
			}

			it('should not be possible if the centre Point is not fully defined',
				 function() {
				component.toSpecification.should.throw()
			})

			it('should be possible if the centre Point is fully defined ', function() {
				(function() {
											fixCentre()
											component.toSpecification()
										}).should.not.throw()
	 		})

			describe('the returned ComponentSpecification', function() {
				var componentSpec

				beforeEach(function() {
					fixCentre()			
					componentSpec = component.toSpecification()				
				})

				it('should behave like a ComponentSpecification derived from the '
					 + 'Component', function() {
					ComponentSpecificationTest.testComponentSpecification(componentSpec,
						                                                    component)
				})
			})
		})
	})
}