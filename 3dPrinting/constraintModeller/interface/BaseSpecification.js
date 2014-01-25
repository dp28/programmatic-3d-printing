/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Bases
 */
module.exports.BaseSpecification = BaseSpecification

function BaseSpecification(h, r, p) {
	this.height = h
	this.radius = r
	this.parts = makePartSpecifications(p)
}

function makePartSpecifications(parts) {
	var partSpecs = []
	for (var i = parts.length - 1; i >= 0; i--) {
		partSpecs.push(parts[i].toSpecification())
	};

	return partSpecs
}