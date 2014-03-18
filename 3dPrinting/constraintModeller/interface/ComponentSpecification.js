/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for abstract Components.
 */
module.exports.ComponentSpecification = ComponentSpecification

function ComponentSpecification(component_id, centre, t) {
	this.id = component_id
	this.centreX = centre.getX().getValue()
	this.centreY = centre.getY().getValue()
	this.centreZ = centre.getZ().getValue()
	this.type = t
}