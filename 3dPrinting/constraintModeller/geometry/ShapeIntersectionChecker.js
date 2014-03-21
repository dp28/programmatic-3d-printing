/*
 * author: Daniel Patterson
 *
 * Checks whether Shapes intersect
 */
module.exports.ShapeIntersectionChecker = ShapeIntersectionChecker

function ShapeIntersectionChecker() {
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
				return checkIfCircleAndRectangleIntersect()
			}
		}
		else if (first.getType() == "Rectangle") {
			if (second.getType() == "Circle") {
				return checkIfCircleAndRectangleIntersect()
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
		var combinedWidth = first.getWidth().getValue() 
		                    + second.getWidth().getValue()
		var combinedLength = second.getLength().getValue() 
		                     + second.getLength().getValue()
		var xDistanceBetween = first.getCentre().distanceToOnAxis(second.getCentre(),
			                                                        'X')
		var yDistanceBetween = first.getCentre().distanceToOnAxis(second.getCentre(),
			                                                        'Y')
		return xDistanceBetween < (combinedLength / 2) 
		       || yDistanceBetween < (combinedWidth / 2)
	}

}