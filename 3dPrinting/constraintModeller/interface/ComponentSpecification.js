/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for abstract Components.
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.ComponentSpecification = ComponentSpecification

function ComponentSpecification(component_id, centre, t) {
	var spec = new Specification()
	spec.id = component_id
	spec.centreX = centre.getX().getValue()
	spec.centreY = centre.getY().getValue()
	spec.centreZ = centre.getZ().getValue()
	spec.type = t
	return spec
}