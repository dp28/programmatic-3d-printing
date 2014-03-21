/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Gears
 */
var ToothedComponentSpecification = require('../interface/ToothedComponentSpecification.js').ToothedComponentSpecification

module.exports.GearSpecification = GearSpecification

function GearSpecification(gear) {
	var spec = new ToothedComponentSpecification(gear)
	spec.circularPitch = gear.getCircularPitch()
	spec.clearance = gear.getClearance().getValue()
	spec.centreHoleRadius = gear.getCentreHoleRadius().getValue()
	return spec
}