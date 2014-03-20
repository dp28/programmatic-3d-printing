/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Circles
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.CircleSpecification = CircleSpecification

function CircleSpecification(circle) {
	var spec = new Specification(circle)
	spec.type = "Circle"
	spec.radius = circle.getRadius().getValue()
	return spec
}