/*
 * author: Daniel Patterson
 *
 * The base class for all components.
 */
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle

module.exports.Component = Component

function Component() {
	this.boundingCircle = new Circle()
}

Component.prototype = {

	constructor: Component,

	getBoundingCircle: function() {
		return this.boundingCircle
	},

	getCentre: function() {
		return this.boundingCircle.getCentre()
	}
}