/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Spindles
 */
var ComponentSpecification = require('../../interface/ComponentSpecification.js').ComponentSpecification

module.exports.SpindleSpecification = SpindleSpecification

function SpindleSpecification(spindle) {
	var spec = new ComponentSpecification(spindle)
	spec.height = spindle.getHeight().getValue()
	spec.radius = spindle.getRadius().getValue()
	return spec
}