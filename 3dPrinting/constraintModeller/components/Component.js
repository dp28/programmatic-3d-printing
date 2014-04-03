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
 * The base class for all components.
 */
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

module.exports.Component = Component

var nextID = 1

Component.makeNextID = function() {
	nextID++
	return (nextID - 1)
}

function Component(boundaryShape) {
	if (boundaryShape == undefined)
		boundaryShape = Circle

	var id = Component.makeNextID()
	return {
		boundingShape: new boundaryShape(),

		getID: function() {
			return id
		},

		getBoundingShape: function() {
			return this.boundingShape
		},

		getCentre: function() {
			return this.boundingShape.getCentre()
		},

		setCentre: function(c) {
			this.boundingShape.setCentre(c)
		},

		checkCentreFullyDefined: function() {
			if (this.getCentre().isNotFullyDefined()) 
				throw "Point not fully defined"
		},

		toSpecification: function() {
			this.checkCentreFullyDefined()
			return new ComponentSpecification(this)
		},

		// Should be overriden by all subclassed to give their name
		getTypeName: function() {
			return "Component"
		},

		isTouching: function(otherComponent) {
			return this.boundingShape.isTouching(otherComponent.getBoundingShape())
		},

		toString: function() {
			var string = this.getTypeName() + ' { \n\tID: ' + id + '\n'
			string += '\tCentre point: ' + this.getCentre().toString() + '\n'
			string += '}'
			return string
		}
	}
}