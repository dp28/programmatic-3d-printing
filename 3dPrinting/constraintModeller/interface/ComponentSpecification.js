/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for abstract Components.
 */

module.exports.ComponentSpecification = ComponentSpecification

function ComponentSpecification(p_centreX, p_centreY, p_centreZ) {
	this.centreX = p_centreX
	this.centreY = p_centreY
	this.centreZ = p_centreZ
}