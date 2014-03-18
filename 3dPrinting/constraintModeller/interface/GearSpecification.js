/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Gears
 */
module.exports.GearSpecification = GearSpecification

function GearSpecification(p_numTeeth, p_circularPitch, p_pressureAngle,
			                     p_clearance, p_thickness, p_centreHoleRadius) {
	this.numTeeth = p_numTeeth
	this.circularPitch = p_circularPitch
	this.pressureAngle = p_pressureAngle
	this.clearance = p_clearance
	this.thickness = p_thickness
	this.centreHoleRadius = p_centreHoleRadius
}