/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Bases
 */
var Specification = require('../interface/Specification.js').Specification
module.exports.BaseSpecification = BaseSpecification

function BaseSpecification(h, p) {
	spec = new Specification()
	spec.height = h
	spec.parts = makePartSpecifications(p)
	return spec
}

function makePartSpecifications(parts) {
	var partSpecs = []
	for (var i = parts.length - 1; i >= 0; i--) {
		partSpecs.push(parts[i].toSpecification())
	};

	return partSpecs
}