/*
 * A sample application that creates a rack and pinion
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Rack = require('../constraintModeller/gearFramework/components/Rack.js').Rack
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var DrawerInterface = require('../constraintModeller/interface/DrawerInterface.js').DrawerInterface

var gearTrain = new GearTrain(10)
var rack = gearTrain.createRack(10)
var pinion = gearTrain.createGear(10)
rack.placeAtBackOf(pinion)
var controller = new DrawerInterface()

rack.getCentre().setAt(0, 0, 0)
controller.addComponentGroup(gearTrain)
controller.translateTo3dDrawer()