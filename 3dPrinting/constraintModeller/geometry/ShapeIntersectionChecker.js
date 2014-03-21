/*
 * author: Daniel Patterson
 *
 * Checks whether Shapes intersect
 */
module.exports.ShapeIntersectionChecker = ShapeIntersectionChecker

function ShapeIntersectionChecker() {
	/*
	 * Required inside he function rather than outside to prevent cyclical 
	 * includes. All Shape subclasses require Shape, which requires this. So add 
	 * all Shape subclasses INSIDE this function.
	 */
	var Rectangle = require('../geometry/Rectangle.js').Rectangle

	var first, second

	this.areIntersecting = function(firstShape, secondShape) {
		first = firstShape
		second = secondShape
		return checkIfTwoShapesIntersect()
	}

	var checkIfTwoShapesIntersect = function() {
		if (first.getType() == "Circle") {
			if (second.getType() == "Circle") {
				return checkIfTwoCirclesIntersect()
			}
			else if (second.getType() == "Rectangle") {
				return checkIfCircleAndRectangleIntersect(first, second)
			}
		}
		else if (first.getType() == "Rectangle") {
			if (second.getType() == "Circle") {
				return checkIfCircleAndRectangleIntersect(second, first)
			}
			else if (second.getType() == "Rectangle") {
				return checkIfTwoRectanglesIntersect()			
			}
		}
	}

	var checkIfTwoCirclesIntersect = function() {
		var firstRadius = first.getRadius().getValue()
		var secondRadius = second.getRadius().getValue()
		var distanceBetween = first.getCentre().distanceToOnXYPlane(second.getCentre())
		return distanceBetween <= (firstRadius + secondRadius)
	}

	var checkIfTwoRectanglesIntersect = function() {
		return checkIfTwoRectanglesIntersectHorizontally()
		       && checkIfTwoRectanglesIntersectVertically()
	}

	var checkIfTwoRectanglesIntersectHorizontally = function() {
		var combinedLength = second.getLength().getValue() 
		                     + second.getLength().getValue()
		var centreXDifference = first.getCentre().distanceToOnAxis(second.getCentre(),
			                                                        'X')

		return Math.abs(centreXDifference) <= (combinedLength / 2)
	}

	var checkIfTwoRectanglesIntersectVertically = function() {
		var combinedWidth = first.getWidth().getValue() 
		                    + second.getWidth().getValue()
		var centreYDifference = first.getCentre().distanceToOnAxis(second.getCentre(),
			                                                        'Y')
		return Math.abs(centreYDifference) <= (combinedWidth / 2)
	}

	/*
	 * Calculates the intersection of a Circle and a Rectangle by treating the 
	 * Circle as a square. This is not a perfect solution, but is sufficient for
	 * the 2D-grid system that the Component placement system is limited to
	 */
	var checkIfCircleAndRectangleIntersect = function(circle, rectangle) {
		var circleBounds = new Rectangle()
		circleBounds.setCentre(circle.getCentre())
		var radius = circle.getRadius().getValue()
		circleBounds.setLength(radius * 2)
		circleBounds.setWidth(radius * 2)
		first = rectangle
		second = circleBounds
		return checkIfTwoRectanglesIntersect()
	}
}