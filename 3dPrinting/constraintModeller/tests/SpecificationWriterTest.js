/*
 * author: Daniel Patterson
 *
 * Tests the SpecificationWriter, which should translate Component 
 * Specifications into Specifications that are understandable by the 3D Drawer.
 */
var should = require('should')
var fs = require('fs')
var GearSpecification = require('../interface/GearSpecification.js').GearSpecification
var SpecificationComposer = require('../interface/SpecificationComposer.js').SpecificationComposer
var SpecificationWriter = require('../interface/SpecificationWriter.js').SpecificationWriter
var GearTest = require('../tests/GearTest.js')
var GearTrainTest = require('../tests/GearTrainTest.js')

describe('SpecificationWriter', function() {
	var writer, gear, composer

	beforeEach(function(){
		composer = new SpecificationComposer()
		writer = new SpecificationWriter()
		gear = GearTest.createFullySpecifiedTestGear()
	})

	describe('#addComponent', function() {
		it('should add a new ComponentSpecification to the writer', function() {
			writer.getSpecifications().length.should.equal(0)
			writer.addComponent(gear)
			writer.getSpecifications().length.should.equal(1)
			writer.getSpecifications()[0].should.eql(composer.makeSpecification(gear))
		})

		describe('When the Component is a GearTrain', function() {
			var train

			beforeEach(function() {
				writer = new SpecificationWriter()
				train = GearTrainTest.createTestGearTrain()
				writer.addComponent(train)
			})

			describe('when Spindles should be autogenerated but a Base should not be',
			         function() {
				beforeEach(function() {
					writer = new SpecificationWriter()
					train = GearTrainTest.createTestGearTrain()
					train.setGenerateSpindlesOnWrite(true)
					train.setGenerateBaseOnWrite(false)
					writer.addComponent(train)
				})

				it('should add twice the number of Specifications as the GearTrain has '
				 + 'Gears', function() {
					writer.getSpecifications().length.should.equal(2 * train.getGears().length)
				})
			})

			describe('when Spindles and Bases should not be autogenerated', function() {
				beforeEach(function() {
					writer = new SpecificationWriter()
					train = GearTrainTest.createTestGearTrain()
					train.setGenerateSpindlesOnWrite(false)
					train.setGenerateBaseOnWrite(false)
					writer.addComponent(train)
				})

				it('should add the same number of Specifications as the GearTrain has '
				 + 'Gears', function() {
					writer.getSpecifications().length.should.equal(train.getGears().length)
				})
			})	

			describe('when a Base should be autogenerated but Spindles should not be', 
				       function() {
				beforeEach(function() {
					writer = new SpecificationWriter()
					train = GearTrainTest.createTestGearTrain()
					train.setGenerateSpindlesOnWrite(false)
					train.setGenerateBaseOnWrite(true)
					writer.addComponent(train)
				})
				
				it('should add one more Specification than the GearTrain has Gears',
				   function() {
					writer.getSpecifications().length.should.equal(train.getGears().length + 1)
				})
			})

			describe('If the GearTrain contains overlapping Gears', function() {
				beforeEach(function() {
					writer = new SpecificationWriter()
					train = GearTrainTest.createInvalidTrainWithOverlappingGears()
				})
				
				it('should not be possible', function() {
					(function() {
						writer.addComponent(train)
					}).should.throw()
				})

				describe('the error message generated', function() {
					var errorMessage, overlappingGears

					beforeEach(function() {
						overlappingGears = train.findNonMeshingTouchingGears()
						try {
							writer.addComponent(train)
						} 
						catch(err) {
							errorMessage = err.message
						}
					})

					it('should contain a string representation of the overlapping gears',
					   function() {
						for (var i = overlappingGears.length - 1; i >= 0; i--) {
							errorMessage.should.contain(overlappingGears[i].toString())
						};
					})
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

			it('should contain a suffix for the array of GearSpecifications so that it '
				 + 'is well-formed OpenJSCAD', function() {
				fileContents.should.contain('];')
			})

			describe('with two GearSpecifications added', function() {
				var otherGear

				beforeEach(function(done) { 
					otherGear = GearTest.createFullySpecifiedTestGear(10, 20, 4, 5, 6)
					writer.addComponent(gear)
					writer.addComponent(otherGear)
					writeToFileAndGetContents(specFile,done)
				})

				it('should contain a pretty-printed JSON String for both '
					 + 'GearSpecifications in an array', function() {
					var array = [composer.makeSpecification(gear), 
					 	           composer.makeSpecification(otherGear)]
					fileContents.should.contain(JSON.stringify(array, null, 2))
				})

				describe('each with an autogenerated Spindle', function() {
					var spindle, otherSpindle

					beforeEach(function(done) { 
						writer = new SpecificationWriter()
						writer.addComponent(gear)
						writer.addComponent(otherGear)
						spindle = gear.generateSpindle()
						otherSpindle = otherGear.generateSpindle()
						writer.addComponent(spindle)
						writer.addComponent(otherSpindle)
						writeToFileAndGetContents(specFile, done)
					})

					it('should contain a pretty-printed JSON String for all Specifications '
						 + 'in an array', function() {
						var array = [composer.makeSpecification(gear), 
						 	           composer.makeSpecification(otherGear),
						 	           composer.makeSpecification(spindle),
						 	           composer.makeSpecification(otherSpindle)]
						fileContents.should.contain(JSON.stringify(array, null, 2))
					})
				})
			})		
		})

		describe('with a test GearTrain added', function() {
			var train, array, arrayString

			beforeEach(function(done) {
				writer = new SpecificationWriter()
				train = GearTrainTest.createTestGearTrain()
				var gears = train.getGears()
				array = [composer.makeSpecification(gears[0]), 
				         composer.makeSpecification(gears[0].generateSpindle()),
				         composer.makeSpecification(gears[1]), 
				         composer.makeSpecification(gears[1].generateSpindle()),
				         composer.makeSpecification(train.generateBase())]
				writer.addComponent(train)
				writeToFileAndGetContents(specFile, done)
				arrayString = JSON.stringify(array, null, 2)
				arrayString = replaceIDsWithZero(arrayString)
			})

			function replaceIDsWithZero(string) {
				return string.replace(/\"id\": \d+,/g, '"id": 0,')
			}
			
			it('should contain a pretty-printed JSON String for all Specifications '
				 + 'in an array', function() {
				fileContents = replaceIDsWithZero(fileContents)
				fileContents.should.contain(arrayString)
			})
		}) 
	})
})