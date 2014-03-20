/*
 * author: Daniel Patterson
 *
 * Creates Base Components from an array of Gear Components
 */
var Base = require('../components/Base.js').Base
var Rectangle = require('../../geometry/Rectangle.js').Rectangle
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
		createBase()
		addSupportingSpindlesToBase()
		addSupportingCirclesToBase()
		addSupportingRectanglesToBase()
		return base
	}

	var createBase = function() {		
		base = new Base()
		base.getCentre().setAt(0, 0, 0)
		base.setHeight(1)
	}

	var addSupportingSpindlesToBase = function() {		
		for (var i = 0; i < gears.length; i++) {
			base.addPart(gears[i].generateSpindle())
		}
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
		var gearHeight = gear.getHeight().getValue()
		var baseHeight = base.getHeight().getValue()
		return gearCentreZ - (gearHeight / 2) - (baseHeight / 2)
	}

	var addSupportingRectanglesToBase = function() {
		for (var i = 0; i < gears.length; i++) {
			for (var j = 0; j < gears.length && j != i; j++) {
				if (gears[i].isAdjacentTo(gears[j]))
					addSupportingRectangleBetween(gears[i], gears[j])
			}
		}
	}

	var addSupportingRectangleBetween = function(startGear, endGear) {
		var baseCentreZ = calculateBaseCentreZ(startGear)	
		var startPoint = makePointBelow(startGear, baseCentreZ)
		var endPoint = makePointBelow(endGear, baseCentreZ)
		var rectangle = new Rectangle(startPoint, endPoint)
		rectangle.setWidth(GEAR_LIP)
		base.addPart(rectangle)
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