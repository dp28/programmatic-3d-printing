/*
 * author: Daniel Patterson
 *
 * The base class for all Specifications. Provides methods for composition of
 * specifications.
 */
module.exports.Specification = Specification

function Specification(source) {
	var spec =  new Object()
	addCentreValues()

	spec.addSpecification = function(spec) {
			for (property in spec) {
				this[property] = spec[property]
			}
		}

	function addCentreValues() {
		var centre = source.getCentre()
		spec.centreX = centre.getX().getValue()
		spec.centreY = centre.getY().getValue()
		spec.centreZ = centre.getZ().getValue()
	}

	return spec	
}