/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Lines
 */
module.exports.LineSpecification = LineSpecification

function LineSpecification(c, l, a, w) {
	this.type = "Line"
	this.centreX = c.getX().getValue()
	this.centreY = c.getY().getValue()
	this.centreZ = c.getZ().getValue()
	this.length = l
	this.width = w
	this.angleInRadians = a
}