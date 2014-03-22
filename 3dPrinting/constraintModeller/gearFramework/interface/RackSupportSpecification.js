/*
 * author: Daniel Patterson
 *
 * The Object that is used to interface between the Constraint Modelling aspect
 * and the 3D Drawing aspect for RackSupports
 */
var ComponentSpecification = require('../../interface/ComponentSpecification.js').ComponentSpecification

module.exports.RackSupportSpecification = RackSupportSpecification

function RackSupportSpecification(support) {
	var spec = new ComponentSpecification(support)
	var wallCentre = support.getWallCentre()
	spec.length = support.getLength().getValue()
	spec.width = support.getWidth().getValue()
	spec.wallHeight = support.getWallHeight().getValue()
	spec.baseHeight = support.getBaseHeight().getValue()
	spec.wallCentreX = wallCentre.getX().getValue()
	spec.wallCentreY = wallCentre.getY().getValue()
	spec.wallCentreZ = wallCentre.getZ().getValue()
	return spec
}