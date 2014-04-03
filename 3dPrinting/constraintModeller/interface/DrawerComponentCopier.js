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
