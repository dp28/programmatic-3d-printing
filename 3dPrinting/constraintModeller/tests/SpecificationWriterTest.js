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
	})

	describe('#writeSpecificationToFile', function() {
		var fileContents
		var fileName = '../3dDrawer/Specification.jscad'

		function writeToFileAndGetContents(done) {			
			writer.writeSpecificationToFile()
			fs.readFile(fileName, 'utf8', function(err, data) {
				fileContents = data
				done()
			})
		}

		beforeEach(function(done) {
			writeToFileAndGetContents(done)
		})

		it('should write to the file ../3dDrawer/Specification.jscad', 
			 function() {
			fs.exists(fileName, function(exists) {
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
				writeToFileAndGetContents(done)
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
					writeToFileAndGetContents(done)
				})

				it('should contain a pretty-printed JSON String for both '
					 + 'GearSpecifications in an array', function() {
					var array = [composer.makeSpecification(gear), 
					 	           composer.makeSpecification(otherGear),
					 	           composer.makeSpecification(spindle),
					 	           composer.makeSpecification(otherSpindle)]
					fileContents.should.contain(JSON.stringify(array, null, 2))
				})
			})
		}) 
	})
})