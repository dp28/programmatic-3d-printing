/*
 * author: Daniel Patterson
 *
 * Tests the SpecificationWriter, which should translate Component 
 * Specifications into Specifications that are understandable by the 3D Drawer.
 */
var should = require('should')
var fs = require('fs')
var SpecificationWriter = require('../interface/SpecificationWriter.js').SpecificationWriter
var PlaceableComponentTest = require('../tests/PlaceableComponentTest.js')
var PlaceableComponentGroup = require('../components/PlaceableComponentGroup.js').PlaceableComponentGroup

describe('SpecificationWriter', function() {
	var writer, component

	beforeEach(function(){
		writer = new SpecificationWriter()
		component = PlaceableComponentTest.createFullySpecifiedTestComponent()
	})

	describe('#addComponent', function() {
		it('should add a new Specification to the writer', function() {
			writer.getSpecifications().length.should.equal(0)
			writer.addComponent(component)
			writer.getSpecifications().length.should.equal(1)
		})
	})

	describe('#addComponentGroup', function() {
		var group, otherComponent

		beforeEach(function() {
			writer = new SpecificationWriter()
			group = new PlaceableComponentGroup()
			component = PlaceableComponentTest.createFullySpecifiedTestComponent(0, 0, 0, 1)
			group.addComponent(component)
		})

		describe('when the Components do not overlap', function() {
			beforeEach(function() {
				otherComponent = PlaceableComponentTest.createFullySpecifiedTestComponent(2, 2, 0, 1)
				group.addComponent(otherComponent)				
				writer.addComponentGroup(group) 
			})

			it('should add two ComponentSpecifications to the writer', function() {
				writer.getSpecifications().length.should.equal(2)
			})			
		})

		describe('when the Components do overlap', function() {
			beforeEach(function() {
				otherComponent = PlaceableComponentTest.createFullySpecifiedTestComponent(2, 2, 0, 10)
				group.addComponent(otherComponent)	
			})		
		
			it('should not be possible', function() {
				(function() {
					writer.addComponentGroup(group)
				}).should.throw()
			})

			describe('the error message generated', function() {
				var errorMessage, overlappingComponents
					beforeEach(function() {
					overlappingComponents = group.findTouchingNonAdjacentComponents()
					try {
						writer.addComponentGroup(group)
					} 
					catch(err) {
						errorMessage = err.message
					}
				})

				it('should contain a string representation of the overlapping gears',
				   function() {
					for (var i = overlappingComponents.length - 1; i >= 0; i--) {
						errorMessage.should.contain(overlappingComponents[i].toString())
					};
				})
			})	
		})
	})

	describe('#writeSpecificationToFile', function() {
		var fileContents
		var drawerPath = '../3dDrawer/'
		var specFile = drawerPath + 'Specification.jscad'
		var mainFile = drawerPath + 'main.jscad'
		var paramFile = drawerPath + 'parameterDefinitions.txt'

		function writeToFileAndGetContents(fileName, done) {			
			writer.writeSpecificationToFile()
			fs.readFile(fileName, 'utf8', function(err, data) {
				fileContents = data
				done()
			})
		}

		describe('the generated Main file', function() {
			beforeEach(function(done) {
				writeToFileAndGetContents(mainFile, done)
			})

			it('should write to the file ' + mainFile, function() {
				fs.exists(mainFile, function(exists) {
					exists.should.be.true
				})
			})

			it('should include a header explaining that the file is autogenerated',
			   function() {
			  var infoHeader = '* [GENERATED FILE]'
			  fileContents.should.contain(infoHeader)
			})

			it('should include the contents of the static parameter file', function() {
				var parameterDefinitions = fs.readFileSync(paramFile, 'utf8')
				fileContents.should.contain(parameterDefinitions)
			})

			it('should contain a parameter definiton for shown components', function() {
				fileContents.should.contain("Show: ")
			})
		})

		describe('the generated Specification file', function() {
			beforeEach(function(done) {
				writeToFileAndGetContents(specFile, done)
			})

			it('should write to the file ' + specFile, function() {
				fs.exists(specFile, function(exists) {
					exists.should.be.true
				})
			})

			it('should include a header explaining that the file is autogenerated',
			   function() {
			  var infoHeader = '* [GENERATED FILE]'
			  fileContents.should.contain(infoHeader)
			})

			it('should include a header to allow the file to be used as an OpenJSCAD '
			   + 'library', function() {
			  var libraryHeader = 'Specification = function() {};\n\n'
			  fileContents.should.contain(libraryHeader)
			})

			it('should contain a prefix to allow OpenJSCAD access to the array of '
				 + 'Specifications', function() {
				var componentsPrefix = 'Specification.components = ['
				fileContents.should.contain(componentsPrefix)
			})

			it('should contain a suffix for the array of ComponentSpecifications so that it '
				 + 'is well-formed OpenJSCAD', function() {
				fileContents.should.contain('];')
			})

			describe('with two ComponentSpecifications added', function() {
				var otherComponent

				beforeEach(function(done) { 
					otherComponent = PlaceableComponentTest.createFullySpecifiedTestComponent(10, 20, 30)
					writer.addComponent(component)
					writer.addComponent(otherComponent)
					writeToFileAndGetContents(specFile,done)
				})

				it('should contain a pretty-printed JSON String for both '
					 + 'ComponentSpecifications in an array', function() {
					var array = [component.toSpecification(), 
					 	           otherComponent.toSpecification()]
					fileContents.should.contain(JSON.stringify(array, null, 2))
				})
			})					
		})

		describe('with a ComponentGroup added', function() {
			var group, array, arrayString

			beforeEach(function(done) {
				writer = new SpecificationWriter()

				group = new PlaceableComponentGroup()
				component = PlaceableComponentTest.createFullySpecifiedTestComponent(0, 0, 0, 1)
				group.addComponent(component)
				otherComponent = PlaceableComponentTest.createFullySpecifiedTestComponent(2, 2, 0, 1)
				group.addComponent(otherComponent)
				
				var components = group.getComponents()
				array = [components[0].toSpecification(), 
				         components[1].toSpecification()]
				writer.addComponentGroup(group)
				writeToFileAndGetContents(specFile, done)
				arrayString = JSON.stringify(array, null, 2)
			})
			
			it('should contain a pretty-printed JSON String for all Specifications '
				 + 'in an array', function() {
				fileContents.should.contain(arrayString)
			})
		})
	})
})