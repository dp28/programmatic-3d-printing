/*
 * A sample application that creates a simple GearTrain
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var DrawerInterface = require('../constraintModeller/interface/DrawerInterface.js').DrawerInterface

var gearTrain = new GearTrain(10)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(20)
var thirdGear = gearTrain.createGear(25)
var fourthGear = gearTrain.createGear(15)
var fifthGear = gearTrain.createGear(8)
var controller = new DrawerInterface()

firstGear.placeOnLeftOf(secondGear)
secondGear.placeOnLeftOf(thirdGear)
thirdGear.placeAtFrontOf(fourthGear)
fifthGear.placeOnRightOf(fourthGear)

thirdGear.getCentre().setAt(0, 0, 0)
controller.addComponentGroup(gearTrain)
controller.translateTo3dDrawer()
