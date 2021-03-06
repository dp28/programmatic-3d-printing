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
 * Tests the base class for all placeable components
 */
var util = require('util')
var should = require('should')
var Component = require('../components/Component.js').Component 
var Circle = require('../geometry/Circle.js').Circle
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
var ComponentTest = require('../tests/ComponentTest.js')
var ShapeTest = require('../tests/ShapeTest.js')

module.exports.shouldBehaveLikePlaceableComponent = shouldBehaveLikePlaceableComponent
module.exports.createFullySpecifiedTestComponent = createFullySpecifiedTestComponent

function createFullySpecifiedTestComponent(x, y, z, radius) {
	x = defaultTo(x, 1)
	y = defaultTo(y, 2)
	z = defaultTo(z, 3)
	radius = defaultTo(radius, 1)
	var placeable = new PlaceableComponent() 
	placeable.getCentre().setAt(x, y, z)
	placeable.getBoundingShape().setRadius(radius)
	return placeable
}

function defaultTo(variable, defaultValue) {
	if (variable == undefined)
		return defaultValue
	else
		return variable
}

describe('PlaceableComponent', function() {
	var placeable

	beforeEach(function() {
		placeable = new PlaceableComponent(Circle) 
	})
	

	it('should behave like a PlaceableComponent', function() {

		function setupBoundaries(placeable) {
			placeable.getPlacementShape().setRadius(10)
		}

		function fullySpecify() {}

		shouldBehaveLikePlaceableComponent(PlaceableComponent, 
			                                 setupBoundaries, 
			                                 Circle,
			                                 fullySpecify)
	})

	describe('#getTypeName', function() {
		it('should return "PlaceableComponent"', function() {
			placeable.getTypeName().should.equal("PlaceableComponent")
		})
	})
})

function shouldBehaveLikePlaceableComponent(Placeable, 
	                                          setupBoundariesFunction,
	                                          placementShapeType,
	                                          fullySpecify) {
	describe('Anything inheriting from PlaceableComponent', function() {
		var placeable

		beforeEach(function() {
			placeable = new Placeable(placementShapeType) 
		})

		it('should behave like a Component', function() {
			ComponentTest.shouldBehaveLikeComponent(placeable)
		})	

		describe('#getPlacementShape', function() {
			it('should return the Shape to be used to define how the '
				 + 'PlaceableComponent can be placed beside other PlaceableComponents',
				 function() {
				ShapeTest.shouldBehaveLikeShape(placeable.getPlacementShape())
			})
		})

		function testPlacementFunction(functionToTest,
		                               axis,
		                               directionFirstToSecond,
		                               directionToSecondToFirst) {
			var getAxis = 'get' + axis
			var getFirstDistance = 'getDistanceTo' + directionToSecondToFirst 
			                       + 'Boundary'
			var getSecondDistance = 'getDistanceTo' +  directionFirstToSecond
			                        + 'Boundary'
			var firstPlaceable, secondPlaceable, firstBoundary, secondBoundary
			
			beforeEach(function() {
				firstPlaceable = new Placeable(placementShapeType)
				setupBoundariesFunction(firstPlaceable)
				firstBoundary = firstPlaceable.getBoundingShape()

				secondPlaceable = new Placeable(placementShapeType)
				setupBoundariesFunction(secondPlaceable)
				secondBoundary = secondPlaceable.getBoundingShape()

				firstPlaceable[functionToTest](secondPlaceable)
				secondPlaceable.getCentre().setAt(1, 2, 3)
			})

			describe('the first Placeable', function() {
				it('should have its centre set when the second Placeable\'s centre is set',
					 function() {
					firstPlaceable.getCentre().isFullyDefined().should.be.true
				})

				it('should be centred to the ' + directionFirstToSecond + ' of the '
					 + 'second Placeable by a distance of the sum of their distances to '
					 + 'their boundaries', function() {
					var firstPlaceableCoordinate = firstPlaceable.getCentre()[getAxis]().getValue()
					var secondPlaceableCoordinate = secondPlaceable.getCentre()[getAxis]().getValue()
					

					var firstPlacementShape = firstPlaceable.getPlacementShape()
					var secondPlacementShape = secondPlaceable.getPlacementShape()
					var firstDistance = firstPlacementShape[getFirstDistance]()
					var secondDistance = secondPlacementShape[getSecondDistance]()

					var offset = secondDistance - firstDistance
					firstPlaceableCoordinate.should.equal(secondPlaceableCoordinate + offset)
				})

				describe('#getAdjacentComponents', function() {
					it('should return an array containing the second Placeable', function() {
						firstPlaceable.getAdjacentComponents().should.contain(secondPlaceable)
					})
				})
			})

			describe('the second Placeable', function() {
				describe('#getAdjacentComponents', function() {
					it('should return an array containing the first Placeable', function() {
						secondPlaceable.getAdjacentComponents().should.contain(firstPlaceable)
					})
				})
			})
		}

		describe('#placeOnRightOf', function() {
			testPlacementFunction('placeOnRightOf', 'X', 'Right', 'Left')
		})

		describe('#placeOnLeftOf', function() {
			testPlacementFunction('placeOnLeftOf', 'X', 'Left', 'Right')
		})

		describe('#placeAtBackOf', function() {
			testPlacementFunction('placeAtBackOf', 'Y', 'Back', 'Front')
		})

		describe('#placeAtFrontOf', function() {
			testPlacementFunction('placeAtFrontOf', 'Y', 'Front', 'Back')
		})

		describe('#generateAuxillaryComponents', function() {
			beforeEach(function() {
				fullySpecify(placeable) 
			})
			
			it('should return an array of any auxillary components required by this '
					  + 'PlaceableComponent', function() {
				placeable.generateAuxillaryComponents().should.be.an.Array
			})
		})

		describe('#addAdjacentComponent', function() {
			var otherPlaceable	

			beforeEach(function() {
				otherPlaceable = new PlaceableComponent() 
				placeable.addAdjacentComponent(otherPlaceable, "Right")
			})
			
			it('should add a new PlaceableComponent to the adjacent components Array', function() {
				placeable.getAdjacentComponents().should.contain(otherPlaceable)
			})
		})
	})
}
