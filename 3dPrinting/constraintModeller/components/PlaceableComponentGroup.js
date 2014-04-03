/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

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

		// Adds any Components to be generated from PlaceableComponents
		// To be overwritten in subclasses
		getAuxillaryComponents: function() {
			return []
		},

		onlyAdjacentComponentsTouching: function() {
			for (var i = 0; i < components.length; i++) {
				for (var j = 0; j < components.length && j != i; j++) {
					if (componentsTouchingButNotAdjacent(components[i], components[j]))
						return false
				}
			}
			return true
		},

		findTouchingNonAdjacentComponents: function() {
			var overlapping = []
			for (var i = 0; i < components.length; i++) {
				for (var j = 0; j < components.length && j != i; j++) {
					if (componentsTouchingButNotAdjacent(components[i], components[j]))
						overlapping.push(components[i], components[j])
				}
			}
			// Remove duplicates
			return overlapping.filter(function(element, position, self) {
				return self.indexOf(element) == position
			})
		},

		checkCanBeDrawn: function() {
			if (!this.onlyAdjacentComponentsTouching()) {
				var errorMessage = this.createOverlappingComponentErrorMessage()
				throw new Error(errorMessage)
			}
		},

		createOverlappingComponentErrorMessage: function() {
			var string = "Invalid ComponentGroup - contains overlapping Components: \n"
			var overlapping = this.findTouchingNonAdjacentComponents()
			for (var i = overlapping.length - 1; i >= 0; i--) {
				string += overlapping[i].toString() + ',\n'
			};

			string = string.substring (0, string.length - 2) // remove trailing ,\n
			return string
		}
	}
}

function componentsTouchingButNotAdjacent(first, second) {
	return first.isTouching(second) && !first.isAdjacentTo(second)
}