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
			var string = this.getTypeName() + ' { ID: ' + id + '\n'
			string += 'Centre point: ' + this.getCentre().toString() + '\n'
			string += '}'
			return string
		}
	}
}