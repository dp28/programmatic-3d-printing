/*
 * author: Daniel Patterson
 *
 * A collection of Gears that are standardised so that they can interact 
 * properly
 */
var Component = require('../components/Component.js').Component
var ConstrainableValue = require('../constraints/ConstrainableValue.js').ConstrainableValue
var Gear = require('../components/Gear.js').Gear
var Utilities = require('../Utilities.js')

module.exports.GearTrain = GearTrain

Utilities.inheritPrototype(GearTrain, Component)

function GearTrain() {
	Component.call(this)
}