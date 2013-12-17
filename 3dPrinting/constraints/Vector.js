/*
 * author: Daniel Patterson
 *
 * A 2D vector which can be represented as the hypotenuse of a triangle of sides
 * length x and y or by a direction and a magnitude. All values are
 * ConstrainableValues.
 */
var ConstrainableValue = require('./ConstrainableValue.js').ConstrainableValue

module.exports.Vector = Vector

function Vector() {
	var x = new ConstrainableValue()
	var y = new ConstrainableValue()
	var direction = new ConstrainableValue()
	var magnitude = new ConstrainableValue()

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
		direction.fixValue(dir)
		magnitude.fixValue(mag)
		
	}
}