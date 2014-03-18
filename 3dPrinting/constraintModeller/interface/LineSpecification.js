/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Lines
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.LineSpecification = LineSpecification

function LineSpecification(c, l, a, w) {
	var spec = new Specification()
	spec.type = "Line"
	spec.centreX = c.getX().getValue()
	spec.centreY = c.getY().getValue()
	spec.centreZ = c.getZ().getValue()
	spec.length = l
	spec.width = w
	spec.angleInRadians = a
	return spec
}