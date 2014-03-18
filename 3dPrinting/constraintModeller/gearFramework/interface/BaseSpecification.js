/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Bases
 */
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification
module.exports.BaseSpecification = BaseSpecification

function BaseSpecification(base) {
	spec = new ComponentSpecification(base)
	spec.height = base.getHeight().getValue()
	spec.parts = makePartSpecifications(base.getParts())
	return spec
}

function makePartSpecifications(parts) {
	var partSpecs = []
	for (var i = parts.length - 1; i >= 0; i--) {
		partSpecs.push(parts[i].toSpecification())
	};

	return partSpecs
}