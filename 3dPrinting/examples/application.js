/*
 * A sample application that creates a simple GearTrain
 */
var GearTrain = require('../constraintModeller/components/GearTrain.js').GearTrain
var Gear = require('../constraintModeller/components/Gear.js').Gear
var SpecificationWriter = require('../constraintModeller/interface/SpecificationWriter.js').SpecificationWriter

var gearTrain = new GearTrain(10)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(20)
var thirdGear = gearTrain.createGear(5)
var fourthGear = gearTrain.createGear(15)
var fifthGear = gearTrain.createGear(25)
var writer = new SpecificationWriter()
firstGear.meshOnLeftOf(secondGear)
secondGear.meshOnLeftOf(thirdGear)
thirdGear.meshOnLeftOf(fourthGear)
fifthGear.meshAtBackOf(firstGear)
thirdGear.getCentre().setAt(0, 0, 0)
writer.addComponent(gearTrain)
writer.writeSpecificationToFile()
