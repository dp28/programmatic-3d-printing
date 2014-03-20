/*
 * author: Daniel Patterson
 *
 * Coordinates the interface objects that translate the Node.js Component system 
 * into the OpenJSCAD 3D Drawer system
 */
var Configuration = require('../Configuration.js')
var SpecificationWriter = require('../interface/SpecificationWriter.js').SpecificationWriter
var MainFileWriter = require('../interface/MainFileWriter.js').MainFileWriter
var DrawerComponentCopier = require('../interface/DrawerComponentCopier.js').DrawerComponentCopier

module.exports.DrawerInterface = DrawerInterface

function DrawerInterface() {
	const DEFAULT_SELECTION_VALUES = ['"All"']

	var components = []
	var specificationWriter = new SpecificationWriter(Configuration.specFileTarget)
	var mainFileWriter = new MainFileWriter(Configuration.mainFileTarget)
	var copier = new DrawerComponentCopier(Configuration.targetDirectory, 
		                                     Configuration.sourceDirectories)

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
		copier.copyComponentsToTargetDirectory()
		specificationWriter.addAllComponents(components)
		specificationWriter.writeSpecificationToFile()
		var dynamicParameter = createComponentSelectionParameter()
		mainFileWriter.generateMainFile(dynamicParameter)
	}

	var createComponentSelectionParameter = function() {
		var values = makeComponentSelectionValues()
		var captions = makeCaptionsFrom(values)
		var definition = '\t,\n'
										+ '\t{\n'
											+ '\t\tname: "show",\n'
											+ '\t\ttype: "choice",\n'
											+ '\t\tvalues: [' + values + '],\n'
											+ '\t\tcaptions: [' + captions + '],\n'
											+ '\t\tcaption: "Show: ",\n'
											+ '\t\tinitial: "All"\n'
										+ '\t}\n'
		return definition 
	}

	var makeComponentSelectionValues = function() {
		var values = DEFAULT_SELECTION_VALUES		
		values = values.concat(makeComponentTypeSelecionValues())
		values = values.concat(makeIndividualComponentSelectionValues())
		return values
	}

	var makeIndividualComponentSelectionValues = function() {
		var values = []
		for (var i = components.length - 1; i >= 0; i--) { 
			values.push(components[i].getID())
		}
		return values
	}

	var makeComponentTypeSelecionValues = function() {
		var values = []
		for (var i = components.length - 1; i >= 0; i--) { 
			var typeString = '"' + components[i].getTypeName() + '"'
			if (values.indexOf(typeString) < 0)
				values.push(typeString)
		}
		return values
	}

	var makeCaptionsFrom = function(values) {
		var captions = DEFAULT_SELECTION_VALUES
		captions = captions.concat(makeComponentSelectionCaptions())
		captions = captions.concat(makeIndividualComponentSelectionCaptions())
		return captions
	}

	var makeIndividualComponentSelectionCaptions = function() {
		var captions = []
		for (var i = components.length - 1; i >= 0; i--) { 
			captions.push('"Just Component ID #' + components[i].getID() + '"')
		}
		return captions
	}

	var makeComponentSelectionCaptions = function() {	
		var captions = []
		for (var i = components.length - 1; i >= 0; i--) { 
			var typeCaption = '"Only ' + components[i].getTypeName() + ' Components"'
			if (captions.indexOf(typeCaption) < 0)
				captions.push(typeCaption)
		}
		return captions

	}
}