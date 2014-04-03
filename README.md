# Programmatic 3D Printing
## Introduction
This project provides an abstract component framework designed to allow minimal specifications of component layouts, specified in JavaScript, to be printed using a 3D printer. The component specifications are translated into OpenJSCAD files, which in turn can be used to form STL files using http://openjscad.org/.

![]("https://bitbucket.org/dp28/programmatic-3d-printing/raw/master/README_images/firstExample.png")

In addition, a concrete extension has been developed that allows gear and rack and pinion components to be placed relative to one another and printed.

## Installation
### Requirements
- [Node.js]
- [Mocha]
- Google Chrome or Mozilla Firefox with WebGL enabled
- Ruby (only for generating documentation and test coverage statistics)

## User Manual
### API
#### High-level Component Framework
This framework provides Objects that can have certain constraints placed upon their properties, including their positions. This framework can be extended by inheriting from these Objects, an example of which is given in the Gear Extension below.

Many of the Objects in this framework should not be instantiated directly. Instead, their subclasses should be used as they have concrete translations in OpenJSCAD.
##### Component
This should not be directly instantiated, but provides methods to both `Gear` and `Rack`.

- `getID()`

   Returns this `Component`'s ID. All `Component`s are given a unique ID on creation.

- `getCentre()`

   Returns the `Point` that is the centre of this `Component`.

- `setCentre(point)`

   Sets the centre of the `Component` to be the same as the passed-in `Point`.

- `getTypeName()`

   Returns "Component".

##### PlaceableComponent
Inherits from `Component`. This should not be directly instantiated, but provides methods to both `Gear` and `Rack`.
- `placeAtFrontOf(otherPlaceableComponent)`

   Places this `PlaceableComponent` so that it's front point is at the same position as the other `PlaceableComponent`'s back point. The relative positioning of the `PlaceableComponent`'s centre from its back or front point is defined by the instantiated version of the `PlaceableComponent`.

- `placeAtBackOf(otherPlaceableComponent)`

   Places this `PlaceableComponent` so that it's back point is at the same position as the other `PlaceableComponent`'s front point. The relative positioning of the `PlaceableComponent`'s centre from its back or front point is defined by the instantiated version of the `PlaceableComponent`.

- `placeOnRightOf(otherPlaceableComponent)`

   Places this `PlaceableComponent` so that it's right point is at the same position as the other `PlaceableComponent`'s left point. The relative positioning of the `PlaceableComponent`'s centre from its left or right point is defined by the instantiated version of the `PlaceableComponent`.
   
- `placeOnLeftOf(otherPlaceableComponent)`

   Places this `PlaceableComponent` so that it's left point is at the same position as the other `PlaceableComponent`'s right point. The relative positioning of the `PlaceableComponent`'s centre from its left or right point is defined by the instantiated version of the `PlaceableComponent`.

- `getTypeName()`

   Returns "PlaceableComponent"

##### PlaceableComponentGroup
Can contain a group of `PlaceableComponents` and enforce constraints on them.
- `getSize()`

   Returns the number of `PlaceableComponent`s are contained in this `PlacementComponentGroup`.

- `addComponent(placeableComponent)`

   Adds a `PlaceableComponent` to this `PlaceableComponentGroup`.

- `checkCanBeDrawn()`

   Checks the validity of any constraints that this `PlaceableComponentGroup` enforces on its `PlaceableComponent`s, throwing an `Error` if they are not upheld. By default, this checks that the only `PlaceableComponent`s that overlap or touch are those that have been set as adjacent.

##### Point
- `new Point()`

   Creates a new `Point` with `null` values for its `x`, `y` and `z` parts.

- `setAt(x, y, z)`

   Sets this `Point` at `x`, `y` and `z`.

##### DrawerInterface
Necessary to translate `PlaceableComponentGroup`s into OpenJSCAD files that can be shown graphically, transformed into STL files and printed.
- `new DrawerInterface()`

   Creates a `DrawerInterface`.

- `addComponentGroup(placeableComponentGroup)`

   Adds a `PlaceableComponentGroup` to this `DrawerInterface`, throwing an `Error` if any of the constraints enforced by the `PlaceableComponentGroup` on its `PlaceableComponents` are not upheld.

- `translateTo3dDrawer()`

   Writes any added `Components` to a set of OpenJSCAD files in the target location specified by the Configuration file.

##### Configuration file (Configuration.js)
This specifies where the original OpenJSCAD files needed to construct a Component in its graphical form are and the target directory where the final and complete set of OpenJSCAD files that form the output of the program are written. The file itself provides full details and is located at `programmatic-3d-printing/3dPrinting/constraintModeller/Configuration.js`

#### Gear Extension
This is a set of components which build upon the functionality of the component framework. It allows gear trains of aribtrary sizes to be constructed from involute spur gears and rack and pinions. A base which supports the components can also be automatically generated.

A brief graphical overview of gear terminology is given in the image below and a full explanation of gear terminology is given [here][gear_terminology].

![]("https://bitbucket.org/dp28/programmatic-3d-printing/raw/master/README_images/gearTerminology.png")
##### Gear
Inherits from `PlaceableComponent`.
- construction

   should be performed using`GearTrain.createGear(numTeeth)`

- `getTypeName()` 

   Returns "Gear"
   
- `setCentreHoleRadius(radius)`

   Changes the radius of the hole in the centr of the `Gear` and the radius of any spindle generated for the gear as part of a base.
   
##### GearTrain
Inherits from `PlaceableComponentGroup`.
- `new GearTrain(circularPitch)`

   GearTrains must be created with a circular pitch. This pitch is enforced over all components that are added to the GearTrain, affecting the size of their teeth.

- `createGear(numTeeth)`

   Returns a `Gear` with the specified number of teeth and the same circular pitch as the `GearTrain`. It also adds the new `Gear` to the `GearTrain`.

- `createRack(numTeeth)`

   Returns a `Rack` with the specified number of teeth and the same pitch as the `GearTrain`. It also adds the new `Rack` to the `GearTrain`.
   
##### Rack
Inherits from `PlaceableComponent`.
- construction

   should be performed using`GearTrain.createRack(numTeeth)`

- `getTypeName()` 

   Returns "Rack"
   
- `setWidth(width)`

   Changes the width of the `Rack`

- `getToothedFace()`

   Returns which face of the `Rack` has teeth - one of:
   - "Front" - positive distance on Y axis from the centre
   - "Back"  - negative distance on Y axis from the centre
   - "Right" - positive distance on X axis from the centre
   - "Left"  - negative distance on X axis from the centre

### Using the API
#### Example Application
```javascript
/*
 * A sample application that creates a gear and a rack and pinion
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Rack = require('../constraintModeller/gearFramework/components/Rack.js').Rack
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var DrawerInterface = require('../constraintModeller/interface/DrawerInterface.js').DrawerInterface

// Instantiate the Objects necessary for the system
var gearTrain = new GearTrain(10)
var gear = gearTrain.createGear(8)
var pinion = gearTrain.createGear(15)
var rack = gearTrain.createRack(8)

// Place the components relative to each other
gear.placeAtBackOf(pinion)
pinion.placeAtBackOf(rack)

// Supply any explicit placement information
gear.getCentre().setAt(0, 0, 4)

// Pass the components to the Interface to be converted to the View format.
var controller = new DrawerInterface()
controller.addComponentGroup(gearTrain)
controller.translateTo3dDrawer()
```
#### Example Output
This is a screenshot of the output from the example above copied into http://openjscad.org/.

![]("https://bitbucket.org/dp28/programmatic-3d-printing/raw/master/README_images/rackExample.png")

#### Order of Program
1. Create components.
2. Place components relative to each other.
3. Explicity place enough of the components that the complete system can be fully specified and placed.
4. Translate the system into .jscad files.

### Executing the Program
To execute an application using this system, such as the example above, from the directory `programmatic-3d-printing/3dPrinting/constraintModeller/` use the command:
```
node <path-to-application-script>
```
where `path-to-application-script` is the relative path from this directory to the application to run. The output OpenJSCAD files will be written to the target directory specified by the configuration file. The *.jscad* files in this directory can then be dragged into the input box at http://openjscad.org/ to produce the graphical output and STL files.

## Documentation
The documentation provided as part of the user manual highlights only the aspects of the system that are designed to be used by external applications. To generate the full documentation, use the following commands in the `programmatic-3d-printing/3dPrinting/docs/` directory:
- `./updateComponentFrameworkDocs.rb` – outputs the documentation for the component framework in ComponentFrameworkDocumentation.html

- `./updateCoverageOfGearFramework.rb` – outputs the documentation for the gear framework in GearFrameworkDocumentation.html

## Testing
### Tools
- [Mocha]
- [should.js]

### Running the Tests
Test-Driven Development is used throughout this project. To run the tests, use the command
```
$ mocha tests/ gearFramework/tests/
```
in the directory `programmatic-3d-printing/3dPrinting/constraintModeller/`. The arguments 
```
-R min -w .
```
are recommended if carrying out further development as this will rerun the tests whenever a change is made to any of the source or test files.

### Code coverage
Two scripts are provided to examine the coverage achieved by the test suite. To execute them, run the following commands in the `programmatic-3d-printing/3dPrinting/docs directory`:
- `./updateCoverageOfComponentFramework.rb` – calculates the coverage across the component framework and outputs the result into `componentFrameworkCoverage.html`

- `./updateCoverageOfGearFramework.rb` – calculates the coverage across the gear framework and outputs the result into `gearFrameworkCoverage.html`

[mocha]: http://visionmedia.github.io/mocha/
[should.js]: https://github.com/visionmedia/should.js
[Node.js]: http://nodejs.org/
[gear_terminology]: http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm