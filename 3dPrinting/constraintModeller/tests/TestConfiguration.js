/*
 * author: Daniel Patterson
 *
 * Holds configuration information for the system
 */

/*
 * The locations of files that are necessary for the execution of the 3D Drawer.
 *
 * ADD TO THIS LIST IF ADDING DIFFERENT SOURCE DIRECTORIES FOR 3D DRAWER 
 * COMPONENTS
 */
exports.sourceDirectories = [
															'../3dDrawer/',
															'gearFramework/3dDrawer'
														]

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
exports.paramFilePath = '../../3dDrawer/parameterDefinitions.txt'
 
/*
 * The target location of the Specification file
 */
exports.specFileTarget = exports.targetDirectory + 'Specification.jscad'

/*
 * The target location of the main file (necessary for OpenJSCAD)
 */
exports.mainFileTarget = exports.targetDirectory + 'main.jscad'