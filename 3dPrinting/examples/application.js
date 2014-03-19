/*
 * A sample application that creates a simple GearTrain
 */
var GearTrain = require('../constraintModeller/gearFramework/components/GearTrain.js').GearTrain
var Gear = require('../constraintModeller/gearFramework/components/Gear.js').Gear
var SpecificationWriter = require('../constraintModeller/interface/SpecificationWriter.js').SpecificationWriter

var gearTrain = new GearTrain(10)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(20)
var thirdGear = gearTrain.createGear(25)
var fourthGear = gearTrain.createGear(15)
var fifthGear = gearTrain.createGear(8)
var writer = new SpecificationWriter()

firstGear.placeOnLeftOf(secondGear)
secondGear.placeOnLeftOf(thirdGear)
thirdGear.placeAtFrontOf(fourthGear)
fifthGear.placeOnRightOf(fourthGear)

thirdGear.getCentre().setAt(0, 0, 0)
writer.addComponentGroup(gearTrain)
writer.writeSpecificationToFile()
