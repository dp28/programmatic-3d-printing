/*
 * author: Daniel Patterson
 *
 * Coordinates the interface objects that translate the Node.js Component system 
 * into the OpenJSCAD 3D Drawer system
 */
var SpecificationWriter = require('../interface/SpecificationWriter.js').SpecificationWriter
var MainFileWriter = require('../interface/MainFileWriter.js').MainFileWriter
var DrawerComponentCopier = require('../interface/DrawerComponentCopier.js').DrawerComponentCopier

module.exports.DrawerInterface = DrawerInterface

function DrawerInterface() {
	var components = []
	var specifificationWriter = new SpecificationWriter()

	this.addComponent = function(component) {
		components.push(component)
	}

	this.getComponents = function() {
		return components
	}

	this.addAllComponents = function(componentArray) {
		for (var i = 0; i < componentArray.length; i++) {
			this.addComponent(componentArray[i])
		}
	}

	this.addComponentGroup = function(group) {
		group.checkCanBeDrawn()
		this.addAllComponents(group.getComponents())
		this.addAllComponents(group.getAuxillaryComponents())
	}

	this.translateTo3dDrawer = function() {
		specifificationWriter.addAllComponents(components)
		specifificationWriter.writeSpecificationToFile()
	}
}