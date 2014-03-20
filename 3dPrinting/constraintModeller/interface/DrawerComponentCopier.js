/*
 * author: Daniel Patterson
 *
 * Copies 3D Drawer components specifed in the config file to a target directory
 */
var fs = require('fs')
var util = require('util')

module.exports.DrawerComponentCopier = DrawerComponentCopier

function DrawerComponentCopier(targetDirectory, sourceDirectories) {
	const HEADER_COMMENT = "// [COPIED VERSION OF FILE] \n"
	const SOURCE_LABEL = "// Source: "

	this.copyComponentsToTargetDirectory = function() {
		this.createTargetDirectory()
		sourceDirectories.forEach(function(directory) {
			copyDirectoryJscadContentsToTarget(directory)
		})
	}

	this.createTargetDirectory = function() {
		if (fs.existsSync(targetDirectory))
			removeContents(targetDirectory)
		else
			fs.mkdirSync(targetDirectory)
	}

	var removeContents = function(directory) {
		var contents = fs.readdirSync(directory)
		contents.forEach(function(file) {
			fs.unlinkSync(directory + '/' + file)
		})
	}

	var copyDirectoryJscadContentsToTarget = function(directory) {
		fs.readdirSync(directory).forEach(function(file) {
			if (file.match(/\.jscad$/))
				copyFileToTarget(directory, file)
		})
	}

	var copyFileToTarget = function(oldPath, file) {
		var contents = fs.readFileSync(oldPath + '/' + file)
		contents = (oldPath + file + '\n').concat(contents)
		contents = SOURCE_LABEL.concat(contents)
		contents = HEADER_COMMENT.concat(contents)
		fs.writeFileSync(targetDirectory + '/' + file, contents)
	}
}
