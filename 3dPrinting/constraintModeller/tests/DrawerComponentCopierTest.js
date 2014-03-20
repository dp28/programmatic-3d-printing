/*
 * author: Daniel Patterson
 *
 * Tests the DrawerComponentCopier, which should copy the components of the 3D
 * Drawer specified in he config file to a location also specified in the 
 * config file.
 */
var should = require('should')
var fs = require('fs')
var util = require('util')
var DrawerComponentCopier = require('../interface/DrawerComponentCopier.js').DrawerComponentCopier
var Configuration = require('../Configuration.js')

describe('DrawerComponentCopier', function() {
	var copier, targetPath

	beforeEach(function() {
		copier = new DrawerComponentCopier() 
		targetPath = Configuration.targetDirectory
	})
	
	describe('#createTargetDirectory', function() {
		describe('the target directory', function() {			

			beforeEach(function() {
				copier.createTargetDirectory()
			})
			
			it('should exist', function() {
				fs.existsSync(targetPath).should.be.true
			})

			describe('if the target directory was not empty', function() {
				beforeEach(function() {
					fs.writeFileSync(targetPath + '/test.txt', 'this should be deleted') 
					copier.createTargetDirectory()
				})
				
				it('should empty the target directory', function() {
					fs.readdirSync(targetPath).length.should.equal(0)
				})
			})
		})
	})

	describe('#copyComponentsToTargetDirectory', function() {
		var sourceDirectories, sourceFiles

		beforeEach(function() {
			sourceDirectories = Configuration.sourceDirectories 
			sourceFiles = findAllJscadFilesIn(sourceDirectories)
			copier.copyComponentsToTargetDirectory()
		})

		function findAllJscadFilesIn(directories) {
			var sourceFiles = []
			directories.forEach(function(directory) {
				fs.readdirSync(directory).forEach(function(file) {
					if (file.match(/\.jscad$/))
						sourceFiles.push(file)
				})
			})
			return sourceFiles
		}

		it('should copy all the files in the source directories into the target '
			 + 'directory', function() {
			sourceFiles.forEach(function(file) {
				fs.existsSync(targetPath + '/' + file).should.be.true
			})
		})	

		describe('the copied files', function() {
			var copiedFiles

			beforeEach(function() {
				copiedFiles = findAllJscadFilesIn([targetPath]) 
			})

			it('should have a header explaining that the files are copied',
			   function() {
			  var header = "[COPIED VERSION OF FILE]"
				copiedFiles.forEach(function(file) {
					var contents = fs.readFileSync(targetPath + '/' + file)
					contents = "" + contents // force cast to string
					contents.should.contain(header)
				})
			})

			it('should state the file\'s original location', function() {
				copiedFiles.forEach(function(copied) {
					sourceDirectories.forEach(function(sourceDirectory) {
						var files = findAllJscadFilesIn([sourceDirectory])
						files.forEach(function(source) {
							if (source == copied) {
								var contents = fs.readFileSync(targetPath + '/' + copied)
								contents = "" + contents // force cast to string
								contents.should.contain("Source: " + sourceDirectory + source)
							}
						})
					})					
				})
			})			
		})

		describe('when the target directory doesn\'t exist', function() {
			beforeEach(function() {
				if (fs.existsSync(targetPath))
					removeDirectoryAndContents(targetPath)
				copier.copyComponentsToTargetDirectory()
			})

			function removeDirectoryAndContents(directory) {
				fs.readdirSync(directory).forEach(function(file) {
					fs.unlinkSync(directory + '/' + file)
				})
				fs.rmdirSync(directory) 
			}

			it('should ensure the target directory exists', function() {
				fs.existsSync(targetPath).should.be.true
			})		
		})
	})
})