/*
 * author: Daniel Patterson
 *
 * The base class for all components.
 */
var Point = require('../geometry/Point.js').Point
var Circle = require('../geometry/Circle.js').Circle
var ComponentSpecification = require('../interface/ComponentSpecification.js').ComponentSpecification

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
	},

	toComponentSpecification: function() {
		if (this.getCentre().isNotFullyDefined()) 
			throw "Point not fully defined"
		return new ComponentSpecification(this.getCentre(), this.getTypeName())
	},

	// Should be overriden by any subclass that needs more for its Specification
	toSpecification: function() {
		return null
	},

	// Should be overriden by all subclassed to give their name
	getTypeName: function() {
		return "Component"
	}
}