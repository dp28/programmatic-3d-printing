/*
 * author: Daniel Patterson
 *
 * A Specification of all necessary data for a ToothedComponent
 */
var ComponentSpecification = require('../../interface/ComponentSpecification.js').ComponentSpecification

module.exports.ToothedComponentSpecification = ToothedComponentSpecification

function ToothedComponentSpecification(toothed) {
	var spec = new ComponentSpecification(toothed)
	spec.numTeeth = toothed.getNumberOfTeeth().getValue()
	spec.pressureAngle = toothed.getPressureAngle().getValue()
	spec.height = toothed.getHeight().getValue()
	return spec
}