/*
 * A sample application that creates a rack and pinion
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Rack = require('../constraintModeller/gearFramework/components/Rack.js').Rack
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var DrawerInterface = require('../constraintModeller/interface/DrawerInterface.js').DrawerInterface

var gearTrain = new GearTrain(10)
var firstRack = gearTrain.createRack(5)
var secondRack = gearTrain.createRack(15)
var firstPinion = gearTrain.createGear(20)
var secondPinion = gearTrain.createGear(15)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(15)

firstRack.placeAtBackOf(firstGear)
secondPinion.placeAtBackOf(secondRack)
firstGear.placeAtBackOf(secondGear)
secondGear.placeOnLeftOf(firstPinion)
firstPinion.placeAtBackOf(secondPinion)

firstGear.getCentre().setAt(0, 0, 4)
var controller = new DrawerInterface()
controller.addComponentGroup(gearTrain)
controller.translateTo3dDrawer()