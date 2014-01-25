/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Circles
 */
module.exports.CircleSpecification = CircleSpecification

function CircleSpecification(c, r) {
	this.type = "Circle"
	this.centreX = c.getX().getValue()
	this.centreY = c.getY().getValue()
	this.centreZ = c.getZ().getValue()
	this.radius = r.getValue()
}