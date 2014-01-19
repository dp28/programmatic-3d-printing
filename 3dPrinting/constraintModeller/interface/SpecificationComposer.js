/*
 * author: Daniel Patterson
 *
 * Creates Objects to be used as Specifications of Components.
 */
module.exports.SpecificationComposer = SpecificationComposer

function SpecificationComposer() {
	this.makeSpecification = function(component) {
		var completeSpecification = component.toComponentSpecification()
		var specificSpecification = component.toSpecification()
		for (key in specificSpecification) {
			completeSpecification[key] = specificSpecification[key]
		}

		return completeSpecification
	}
}