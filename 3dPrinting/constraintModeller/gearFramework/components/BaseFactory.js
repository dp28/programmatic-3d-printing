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
 * Creates Base Components from an array of Component Components
 */
var Base = require('../components/Base.js').Base
var Line = require('../../geometry/Line.js').Line
var Point = require('../../geometry/Point.js').Point
var Circle = require('../../geometry/Circle.js').Circle

module.exports.BaseFactory = BaseFactory

function BaseFactory() {
	var base, components

	// The additional radius of a Component's space on the base in addition to the 
	// Component's centre hole radius.
	const GEAR_LIP = 3

	this.makeBase = function(componentsToMakeFrom) {
		components = componentsToMakeFrom
		createBase()
		addSupportingAuxillaryComponentsToBase()
		addSupportingCirclesToBase()
		addSupportingLinesToBase()
		return base
	}

	var createBase = function() {		
		base = new Base()
		base.getCentre().setAt(0, 0, 0)
	}

	var addSupportingAuxillaryComponentsToBase = function() {		
		for (var i = 0; i < components.length; i++) {
			components[i].generateAuxillaryComponents().forEach(function(component) {
				base.addPart(component)
			})
		}
	}

	var addSupportingCirclesToBase = function() {		
		for (var i = components.length - 1; i >= 0; i--) {
			if (components[i].getTypeName() == "Gear") {
				var baseCentreZ = calculateBaseCentreZ(components[i])
				var circle = new Circle() 
				circle.setRadius(components[i].getCentreHoleRadius().getValue() + GEAR_LIP)
				var point = new Point()
				point.setAt(components[i].getCentre().getX().getValue(),
					          components[i].getCentre().getY().getValue(),
					          baseCentreZ)
				circle.setCentre(point)
				base.addPart(circle)
			}
		};
	}

	var calculateBaseCentreZ = function(component) {
		var componentCentreZ = component.getCentre().getZ().getValue()
		var componentHeight = component.getHeight().getValue()
		var baseHeight = base.getHeight().getValue()
		return componentCentreZ - (componentHeight / 2) - (baseHeight / 2)
	}

	var addSupportingLinesToBase = function() {
		for (var i = 0; i < components.length; i++) {
			for (var j = 0; j < components.length && j != i; j++) {
				if (components[i].isAdjacentTo(components[j]))
					addSupportingLineBetween(components[i], components[j])
			}
		}
	}

	var addSupportingLineBetween = function(startComponent, endComponent) {
		var baseCentreZ = calculateBaseCentreZ(startComponent)	
		var startPoint = makePointBelow(startComponent, baseCentreZ)
		var endPoint = makePointBelow(endComponent, baseCentreZ)
		var line = new Line(startPoint, endPoint)
		line.setWidth(GEAR_LIP * 2)
		base.addPart(line)
	}

	var makePointBelow = function(component, baseCentreZ) {
		var point = new Point()
		var componentCentre = component.getCentre()
		var x = componentCentre.getX().getValue()
		var y = componentCentre.getY().getValue()
		var z = baseCentreZ
		point.setAt(x, y, z)
		return point
	}
}