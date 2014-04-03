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
 * A shape with constrainable properties.
 */
var util = require('util')
var Point = require('../geometry/Point.js').Point
var ShapeIntersectionChecker = require('../geometry/ShapeIntersectionChecker.js').ShapeIntersectionChecker
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Utilities = require('../Utilities.js')

module.exports.Shape = Shape

function Shape() {
	var centre = new Point()
	var intersectionChecker = new ShapeIntersectionChecker()

	return {  
		setCentre: function(point) {
			centre = new Point()
			centre.getX().setValue(point.getX().getValue())
			centre.getY().setValue(point.getY().getValue())
			centre.getZ().setValue(point.getZ().getValue())
		},

		getCentre: function() {
			return centre
		},

		getType: function() {
			return 'Shape'
		},

		getDistanceToRightBoundary: function() {
			throw new Error("getDistanceToRightBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToLeftBoundary: function() {
			throw new Error("getDistanceToLeftBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToBackBoundary: function() {
			throw new Error("getDistanceToBackBoundary() not implemented in Shape " +
				              "base class")
		},

		getDistanceToFrontBoundary: function() {
			throw new Error("getDistanceToFrontBoundary() not implemented in Shape " +
				              "base class")
		},

		isTouching: function(otherShape) {
			return intersectionChecker.areIntersecting(this, otherShape)
		},

		isAdjacentTo: function(otherShape){
			var yAxisBoundaryDistance = this.getDistanceToFrontBoundary() - 
			                            otherShape.getDistanceToBackBoundary()
			var xAxisBoundaryDistance = this.getDistanceToLeftBoundary() - 
			                            otherShape.getDistanceToRightBoundary()
			return this.isAdjacentOnAxis(otherShape, 'X', xAxisBoundaryDistance)
			       || this.isAdjacentOnAxis(otherShape, 'Y', yAxisBoundaryDistance)

		},

		isAdjacentOnAxis: function(otherShape, axis, distanceToBoundaries) {
			var centre = this.getCentre()
			var otherCentre = otherShape.getCentre()
			var distanceBetween = centre.distanceToOnAxis(otherCentre, axis)
			var differOnlyOnAxis = centre.differOnlyOnAxis(otherCentre, axis)
			var adjacentOnAxis = Utilities.approximatelyEqual(distanceBetween, distanceToBoundaries, 0.001)
			return adjacentOnAxis && differOnlyOnAxis
		}
	}
}

