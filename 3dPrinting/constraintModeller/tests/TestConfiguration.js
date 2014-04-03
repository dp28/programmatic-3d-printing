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
 * Holds configuration information for the system
 */

/*
 * The locations of the OpenJSCAD files for drawing components
 * 
 * ADD TO THIS LIST IF ADDING DIFFERENT SOURCE DIRECTORIES FOR 3D DRAWER 
 * COMPONENTS
 */
exports.jscadComponentDirectories = [
																			'../3dDrawer/components',
																			'gearFramework/3dDrawer'
																		]

/*
 * The locations of all files that are necessary for the execution of the 3D 
 * Drawer.
 */
exports.sourceDirectories = [
															'../3dDrawer/core'
														]
														.concat(exports.jscadComponentDirectories)

/* 
 * The directory that should be populated with all the OpenJSCAD files when the
 * program executes successfully. These are the files that are used to generate
 * the 3D CAD product.
 */
exports.targetDirectory = 'tests/test_output/'

/*
 * The location of the static parameters that are always included in the 3D
 * Drawer
 */
exports.paramFilePath = '../3dDrawer/parameterDefinitions.txt'
 
/*
 * The target location of the Specification file
 */
exports.specFileTarget = exports.targetDirectory + 'Specification.jscad'

/*
 * The target location of the main file (necessary for OpenJSCAD)
 */
exports.mainFileTarget = exports.targetDirectory + 'main.jscad'