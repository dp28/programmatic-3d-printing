/*
 * author: Daniel Patterson
 *
 * A base class for all meshable components
 */
var Component = require('../components/Component.js').Component
var Utilities = require('../Utilities.js')

module.exports.MeshableComponent = MeshableComponent

Utilities.inheritPrototype(MeshableComponent, Component)

function MeshableComponent() {
	var id = null
	Component.call(this) 
}