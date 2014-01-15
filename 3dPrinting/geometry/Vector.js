/*
 * author: Daniel Patterson
 *
 * A 2D vector which can be represented as the hypotenuse of a triangle of sides
 * length x and y or by a direction and a magnitude. All values are
 * ConstrainableValues. Angles (ie direction) are in radians with 0 radians 
 * defined as the positive X direction
 */
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue

var util = require('util')

module.exports.Vector = Vector

function Vector() {
	var x = new ConstrainableValue()
	var y = new ConstrainableValue()
	var direction = new ConstrainableValue()
	var magnitude = new ConstrainableValue()

	// Direction is in radians with 0 radians defined as the positive X direction
	this.getDirection = function() {
		return direction
	}

	this.getMagnitude = function() {
		return magnitude
	}

	this.getX = function() {
		return x
	}

	this.getY = function() {
		return y
	}

	this.fixDirectionAndMagnitude = function(dir, mag) {
		x.functionOfConstrainables([direction, magnitude], 
			                         calculateXFromDirectionAndMagnitude)
		y.functionOfConstrainables([direction, magnitude], 
			                         calculateYFromDirectionAndMagnitude)
		magnitude.fixValue(mag)
		direction.fixValue(dir)
	}

	var calculateXFromDirectionAndMagnitude = function(dir, mag) {
		return Math.cos(dir.getValue()) * mag.getValue()
	}

	var calculateYFromDirectionAndMagnitude = function(dir, mag) {
		return Math.sin(dir.getValue()) * mag.getValue()
	}

	this.fixXandY = function(xVal, yVal) {
		magnitude.functionOfConstrainables([x, y], calculateMagnitudeFromXandY)
		direction.functionOfConstrainables([x, y], calculateDirectionFromXandY)
		y.fixValue(yVal)
		x.fixValue(xVal)
	}

	var calculateMagnitudeFromXandY = function(xConstrainable, yConstrainable) {
		var xVal = xConstrainable.getValue()
		var yVal = yConstrainable.getValue()
		return Math.sqrt(xVal * xVal + yVal * yVal)
	}

	var calculateDirectionFromXandY = function(xConstrainable, yConstrainable) {
		var xVal = xConstrainable.getValue()
		var yVal = yConstrainable.getValue()
		return Math.atan2(yVal, xVal)
	}

	this.constructFromPoints = function(start, end) {
		util.puts('here')
		var constrainables = [start.getX(), start.getY(), end.getX(), end.getY()]
		x.functionOfConstrainables(constrainables, createXFromPoints)
		y.functionOfConstrainables(constrainables, createYFromPoints)
	}

	var createXFromPoints = function(startX, startY, endX, endY) {
		util.puts(startX +', ' + startY +', ' + endX +', ' + endY)
		return endX.getValue() - startX.getValue()
	}

	var createYFromPoints = function(startX, startY, endX, endY) {
		return endY.getValue() - startY.getValue()
	}
}