/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for abstract Components.
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.ComponentSpecification = ComponentSpecification

function ComponentSpecification(component) {
	var spec = new Specification(component)
	convertToProperties(component)

	function convertToProperties(component) {
		spec.id = component.getID()
		spec.type = component.getTypeName()
	}

	return spec
}