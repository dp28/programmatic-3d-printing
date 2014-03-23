/*
 * A sample application that creates a rack and pinion
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Rack = require('../constraintModeller/gearFramework/components/Rack.js').Rack
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var DrawerInterface = require('../constraintModeller/interface/DrawerInterface.js').DrawerInterface

var gearTrain = new GearTrain(10)
var rack = gearTrain.createRack(10)
var pinion = gearTrain.createGear(20)
var gear = gearTrain.createGear(8)

pinion.placeOnLeftOf(rack)
gear.placeAtBackOf(rack)

pinion.getCentre().setAt(0, 0, 0)
var controller = new DrawerInterface()
controller.addComponentGroup(gearTrain)
controller.translateTo3dDrawer()