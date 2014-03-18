/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Spindles
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.SpindleSpecification = SpindleSpecification

function SpindleSpecification(h, r) {
	var spec = new Specification()
	spec.height = h
	spec.radius = r
	return spec
}