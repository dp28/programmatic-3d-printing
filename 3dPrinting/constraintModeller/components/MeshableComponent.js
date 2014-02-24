/*
 * author: Daniel Patterson
 *
 * A base class for all meshable components
 */
var Component = require('../components/Component.js').Component

module.exports.MeshableComponent = MeshableComponent

function MeshableComponent(boundaryShape) {
	var meshable = Component(boundaryShape) 
	return meshable
}