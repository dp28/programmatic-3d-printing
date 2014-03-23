/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Racks
 */
var ToothedComponentSpecification = require('../interface/ToothedComponentSpecification.js').ToothedComponentSpecification

module.exports.RackSpecification = RackSpecification

function RackSpecification(rack) {
	var spec = new ToothedComponentSpecification(rack)
	spec.linearPitch = rack.getLinearPitch()
	spec.length = rack.getLength().getValue()
	spec.width = rack.getWidth().getValue()
	spec.toothedFace = rack.getToothedFace()
	return spec
}