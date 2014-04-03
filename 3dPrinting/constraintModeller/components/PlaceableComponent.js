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
 * A base class for all meshable components
 */
var util = require('util')
var Component = require('../components/Component.js').Component
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle

module.exports.PlaceableComponent = PlaceableComponent

function PlaceableComponent(boundaryShape, placementShapeType) {
	// Defaults
	if (boundaryShape == undefined)
		boundaryShape = Circle
	if (placementShapeType == undefined)
		placementShapeType = boundaryShape

	var placeable = Component(boundaryShape) 
	var placementShape = new placementShapeType()
	placementShape.getCentre().sameAs(placeable.getBoundingShape().getCentre())
	var adjacentComponents = []
	var positions = new Object()

	placeable.getTypeName = function() {
		return "PlaceableComponent"
	}

	placeable.getPlacementShape = function() {
		return placementShape
	}

	placeable.addAdjacentComponent = function(placeableComponent, position) {
		adjacentComponents.push(placeableComponent)
	}

	placeable.getAdjacentComponents = function() {
		return adjacentComponents
	}

	placeable.getPositions = function() {
		return positions
	}

	placeable.generateAuxillaryComponents = function() {
		return []
	}

	placeable.isAdjacentTo = function(otherPlaceable) {
		var place
		return placementShape.isAdjacentTo(otherPlaceable.getPlacementShape())
	}

	placeable.placeOnRightOf = function(otherPlaceable) {
		placeable.placeAdjacentTo(otherPlaceable, 'X', 'Right', 'Left')
	}

	placeable.placeOnLeftOf = function(otherPlaceable) {
		placeable.placeAdjacentTo(otherPlaceable, 'X', 'Left', 'Right')
	}

	placeable.placeAtBackOf = function(otherPlaceable) {
		placeable.placeAdjacentTo(otherPlaceable, 'Y', 'Back', 'Front')
	}

	placeable.placeAtFrontOf = function(otherPlaceable) {
		placeable.placeAdjacentTo(otherPlaceable, 'Y', 'Front', 'Back')
	}

	placeable.placeAdjacentTo = function(otherPlaceable,
		                                   axis, 
		                                   directionThisToOther,
		                                   directionOtherToThis) {
		otherPlaceable.addAdjacentComponent(placeable, directionThisToOther)
		var offset = calculateOffsetToMakeComponentsAdjacent(otherPlaceable,
											                                   directionThisToOther,
											                                   directionOtherToThis)
		var axes = Point.getAxesNamesWithout(axis)
		var centre = placeable.getCentre()
		var otherPlaceableCentre = otherPlaceable.getCentre()
		centre.offsetOnAxis(otherPlaceableCentre, axis, offset)
		centre.samePointOnAxes(otherPlaceableCentre, axes)
		adjacentComponents.push(otherPlaceable)
	}

	var calculateOffsetToMakeComponentsAdjacent = function(otherPlaceable, 
		                                                     directionThisToOther,
		                                                     directionOtherToThis) {
		function getDistance(direction) {
			return 'getDistanceTo' + direction + 'Boundary'
		}

		var thisBoundary = placeable.getPlacementShape()
		var otherBoundary = otherPlaceable.getPlacementShape()
		var firstDistance = thisBoundary[getDistance(directionThisToOther)]()
		var secondDistance = otherBoundary[getDistance(directionOtherToThis)]()
		return firstDistance - secondDistance
	}

	return placeable
}