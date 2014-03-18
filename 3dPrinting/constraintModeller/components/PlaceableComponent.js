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

	placeable.getPlacementShape = function() {
		return placementShape
	}

	placeable.addAdjacentComponent = function(placeableComponent) {
		adjacentComponents.push(placeableComponent)
	}

	placeable.getAdjacentComponents = function() {
		return adjacentComponents
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
		var offset = calculateOffsetToMakeComponentsAdjacent(otherPlaceable,
											                                   directionThisToOther,
											                                   directionOtherToThis)
		var axes = Point.getAxesNamesWithout(axis)
		var centre = placeable.getCentre()
		var otherPlaceableCentre = otherPlaceable.getCentre()
		centre.offsetOnAxis(otherPlaceableCentre, axis, offset)
		centre.samePointOnAxes(otherPlaceableCentre, axes)
		adjacentComponents.push(otherPlaceable)
		otherPlaceable.addAdjacentComponent(placeable)
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