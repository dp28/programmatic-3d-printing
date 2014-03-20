/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Rectangles
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.RectangleSpecification = RectangleSpecification

function RectangleSpecification(rectangle) {
	var spec = new Specification(rectangle)
	spec.type = "Rectangle"
	spec.length = rectangle.getLength()
	spec.width = rectangle.getWidth()
	spec.angleInRadians = rectangle.getAngleInRadians()
	return spec
}