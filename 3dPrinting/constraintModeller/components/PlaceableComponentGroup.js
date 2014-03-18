/*
 * author: Daniel Patterson
 *
 * Holds a group of Components.
 */
module.exports.PlaceableComponentGroup = PlaceableComponentGroup

function PlaceableComponentGroup() {
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
		},

		onlyAdjacentComponentsTouching: function() {
			for (var i = 0; i < components.length; i++) {
				for (var j = 0; j < components.length && j != i; j++) {
					if (components[i].isTouching(components[j]) 
						  && !components[i].isAdjacentTo(components[j]))
						return false
				}
			}
			return true
		}
	}
}