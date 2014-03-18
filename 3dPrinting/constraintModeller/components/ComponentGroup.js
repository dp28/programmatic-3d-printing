/*
 * author: Daniel Patterson
 *
 * Holds a group of Components.
 */
module.exports.ComponentGroup = ComponentGroup

function ComponentGroup() {
	var components = []

	return {
		getSize: function() {
			return components.length
		},

		addComponent: function(component) {
			components.push(component)
		},

		getComponents: function() {
			return components
		}
	}
}