/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

/*
 * author: Daniel Patterson
 *
 * Tests the DrawerComponentCopier, which should copy the components of the 3D
 * Drawer specified in he config file to a location also specified in the 
 * config file.
 */
var should = require('should')
var fs = require('fs')
var DrawerComponentCopier = require('../interface/DrawerComponentCopier.js').DrawerComponentCopier
var Configuration = require('../tests/TestConfiguration.js')

describe('DrawerComponentCopier', function() {
	var copier, targetPath

	beforeEach(function() {
		copier = new DrawerComponentCopier(Configuration.targetDirectory,
			                                 Configuration.sourceDirectories) 
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
			}

			it('should ensure the target directory exists', function() {
				fs.existsSync(targetPath).should.be.true
			})		
		})
	})
})