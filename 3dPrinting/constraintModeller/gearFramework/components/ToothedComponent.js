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
 * A representation of a toothed component
 */
var PlaceableComponent = require('../../components/PlaceableComponent.js').PlaceableComponent
var Point = require('../../geometry/Point.js').Point
var ConstrainableValue = require('../../constraints/ConstrainableValue.js').ConstrainableValue
var ToothedComponentSpecification = require('../interface/ToothedComponentSpecification.js').ToothedComponentSpecification
var Utilities = require('../../Utilities.js')
var Circle = require('../../geometry/Circle.js').Circle
var Spindle = require('../components/Spindle.js').Spindle

module.exports.ToothedComponent = ToothedComponent

function ToothedComponent(boundaryShapeType) {

	// Default to 20 - see http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
	const DEFAULT_PRESSURE_ANGLE = 20
	const DEFAULT_HEIGHT = 5
	
	var toothed = new PlaceableComponent(boundaryShapeType)
	var numTeeth = new ConstrainableValue()
	var pressureAngle = new ConstrainableValue()
	pressureAngle.setValue(DEFAULT_PRESSURE_ANGLE)
	var height = new ConstrainableValue()
	height.setValue(DEFAULT_HEIGHT)

	toothed.getTypeName = function() {
		return "ToothedComponent"
	}	

	toothed.getNumberOfTeeth = function() {
		return numTeeth
	}

	toothed.setNumberOfTeeth = function(num) {
		numTeeth.setValue(num)
	}
	// In degrees
	toothed.getPressureAngle = function() {
		return pressureAngle 
	}

	// In degrees
	toothed.setPressureAngle = function(value) {
		pressureAngle.setValue(value)
	}

	toothed.getCircularPitch = function() {
		throw new Error("Not implemented in this instance")
	}

	toothed.setCircularPitch = function(p) {
		throw new Error("Not implemented in this instance")
	}

	toothed.getHeight = function() {
		return height 
	}

	toothed.setHeight = function(h) {
		height.setValue(h)
	}

	toothed.checkIsValid = function() {
		if (!toothed.isValid())
			throw new Error("Invalid " + toothed.getTypeName())
	}

	toothed.isValid = function() {
		return true
	}

	// Height of tooth above pitch line
	toothed.getAddendum = function() {
		throw new Error("Not implemented in this instance")
	}

	toothed.toSpecification = function() {
		checkFullySpecified()
		toothed.checkIsValid()
		return new ToothedComponentSpecification(toothed)
	}

	var checkFullySpecified = function() {		
		if (!numTeeth.isSet()) throw new Error("Number of teeth not set")
	}

	return toothed
}
