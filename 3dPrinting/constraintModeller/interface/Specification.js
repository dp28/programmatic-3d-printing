/*
 * author: Daniel Patterson
 *
 * The base class for all Specifications. Provides methods for composition of
 * specifications.
 */
module.exports.Specification = Specification

function Specification() {
	return {
		addSpecification: function(spec) {
			for (property in spec) {
				this[property] = spec[property]
			}
		}
	}
}