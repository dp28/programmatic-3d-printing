/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for Gears
 */
var Specification = require('../interface/Specification.js').Specification

module.exports.GearSpecification = GearSpecification

function GearSpecification(p_numTeeth, p_circularPitch, p_pressureAngle,
			                     p_clearance, p_thickness, p_centreHoleRadius) {
	var spec = new Specification()
	spec.numTeeth = p_numTeeth
	spec.circularPitch = p_circularPitch
	spec.pressureAngle = p_pressureAngle
	spec.clearance = p_clearance
	spec.thickness = p_thickness
	spec.centreHoleRadius = p_centreHoleRadius
	return spec
}