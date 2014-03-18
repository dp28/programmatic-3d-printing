/*
 * author: Daniel Patterson
 *
 * Translate Component Specifications into Specifications that are 
 * understandable by the 3D Drawer.
 */
var fs = require('fs')
var util = require('util')
var console = require('console')
var util = require('util')
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var MainFileWriter = require('../interface/MainFileWriter.js').MainFileWriter

module.exports.SpecificationWriter = SpecificationWriter

const SPECIFICATION_FILE_NAME = '../3dDrawer/Specification.jscad'

// A header comment for the generated file
const COMMENT_HEADER = '/*\n * [GENERATED FILE]\n *\n * This is a full '
                       + 'specification for a gear system generated by the '
                       + 'constraint\n * modelling aspect of this program.\n '
                       + '*/\n'

// A header to allow OpenJSCAD to use the generated file as a library
const LIBRARY_HEADER = 'Specification = function() {};\n\n'

// A prefix to allow OpenJSCAD access to the GearSpecifications
const COMPONENT_PREFIX = 'Specification.components = '

// A suffix to make sure that the GearSpecification array is well-formed 
//OpenJSCAD
const COMPONENT_SUFFIX = ';'

const DEFAULT_SELECTION_VALUES = ['"All"', '"Gears only"', '"Base only"']

function SpecificationWriter() {
	var specifications = []
	var mainFileWriter = new MainFileWriter()
	var components = []
 
	this.getSpecifications = function() {
		return specifications
	}

	this.addComponent = function(component) {
		specifications.push(component.toSpecification())
		components.push(component)
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

	this.writeSpecificationToFile = function() {
		generateSpecificationFile()
		var dynamicParameter = createComponentSelectionParameter()
		mainFileWriter.generateMainFile(dynamicParameter)
	}

	var generateSpecificationFile = function() {		
		var string = COMMENT_HEADER + LIBRARY_HEADER + COMPONENT_PREFIX
		string += JSON.stringify(specifications, null, 2)
		string += COMPONENT_SUFFIX
		fs.writeFileSync(SPECIFICATION_FILE_NAME, string)
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
		var values = DEFAULT_SELECTION_VALUES.slice()
		for (var i = components.length - 1; i >= 0; i--) {
			if (components[i].getTypeName() == "Gear" && components[i].getID() != null) 
				values.push(components[i].getID())
		};
		return values
	}

	var makeCaptionsFrom = function(values) {
		var captions = DEFAULT_SELECTION_VALUES.slice()

		// Skip default values, include captions for rest
		for (var i = 3; i < values.length; i++) {
			captions.push('"Just Gear ID #' + values[i] + '"')
		};
		return captions
	}
}