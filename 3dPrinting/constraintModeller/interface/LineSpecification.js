/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Lines
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.LineSpecification = LineSpecification

function LineSpecification(line) {
	var spec = new Specification(line)
	spec.type = "Line"
	spec.length = line.getLength()
	spec.width = line.getWidth()
	spec.angleInRadians = line.getAngleInRadians()
	return spec
}