/*
 * author: Daniel Patterson
 *
 * Creates Base Components from an array of Gear Components
 */
var Base = require('../components/Base.js').Base
var Line = require('../../geometry/Line.js').Line
var Point = require('../../geometry/Point.js').Point
var Circle = require('../../geometry/Circle.js').Circle

module.exports.BaseFactory = BaseFactory

function BaseFactory() {
	var base, gears

	// The additional radius of a Gear's space on the base in addition to the 
	// Gear's centre hole radius.
	const GEAR_LIP = 3

	this.makeBase = function(gearsToMakeFrom) {
		gears = gearsToMakeFrom
		base = new Base()
		base.getCentre().setAt(0, 0, 0)
		base.setHeight(1)
		addSupportingCirclesToBase()
		addSupportingLinesToBase()
		return base
	}

	var addSupportingCirclesToBase = function() {		
		for (var i = gears.length - 1; i >= 0; i--) {
			var baseCentreZ = calculateBaseCentreZ(gears[i])
			var circle = new Circle() 
			circle.setRadius(gears[i].getCentreHoleRadius().getValue() + GEAR_LIP)
			var point = new Point()
			point.setAt(gears[i].getCentre().getX().getValue(),
				          gears[i].getCentre().getY().getValue(),
				          baseCentreZ)
			circle.setCentre(point)
			base.addPart(circle)
		};
	}

	var calculateBaseCentreZ = function(gear) {
		var gearCentreZ = gear.getCentre().getZ().getValue()
		var gearThickness = gear.getThickness().getValue()
		var baseHeight = base.getHeight().getValue()
		return gearCentreZ - (gearThickness / 2) - (baseHeight / 2)
	}

	var addSupportingLinesToBase = function() {
		for (var i = 0; i < gears.length; i++) {
			for (var j = 0; j < gears.length && j != i; j++) {
				if (gears[i].isAdjacentTo(gears[j]))
					addSupportingLineBetween(gears[i], gears[j])
			}
		}
	}

	var addSupportingLineBetween = function(startGear, endGear) {
		var baseCentreZ = calculateBaseCentreZ(startGear)	
		var startPoint = makePointBelow(startGear, baseCentreZ)
		var endPoint = makePointBelow(endGear, baseCentreZ)
		var line = new Line(startPoint, endPoint)
		line.setWidth(GEAR_LIP)
		base.addPart(line)
	}

	var makePointBelow = function(gear, baseCentreZ) {
		var point = new Point()
		var gearCentre = gear.getCentre()
		var x = gearCentre.getX().getValue()
		var y = gearCentre.getY().getValue()
		var z = baseCentreZ
		point.setAt(x, y, z)
		return point
	}
}