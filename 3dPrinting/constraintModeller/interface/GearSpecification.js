/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Gears
 */
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

module.exports.GearSpecification = GearSpecification

function GearSpecification(gear) {
	var spec = new ComponentSpecification(gear)
	spec.numTeeth = gear.getNumberOfTeeth().getValue()
	spec.circularPitch = gear.getCircularPitch()
	spec.pressureAngle = gear.getPressureAngle().getValue()
	spec.clearance = gear.getClearance().getValue()
	spec.thickness = gear.getThickness().getValue()
	spec.centreHoleRadius = gear.getCentreHoleRadius().getValue()
	return spec
}