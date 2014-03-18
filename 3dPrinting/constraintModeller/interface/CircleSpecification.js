/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Circles
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.CircleSpecification = CircleSpecification

function CircleSpecification(c, r) {
	var spec = new Specification()
	spec.type = "Circle"
	spec.centreX = c.getX().getValue()
	spec.centreY = c.getY().getValue()
	spec.centreZ = c.getZ().getValue()
	spec.radius = r.getValue()
	return spec
}