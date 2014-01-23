/*
 * author: Daniel Patterson
 *
 * Constraint, SameAs, OffsetByConstant, OffsetByConstrainable and 
 * ScaleByConstant are all ports of Simon Dobson's versions in solid-py
 *
 * Constraints are binary relations between constrained values. A constraint
 * is read right to left, so a constraint like:
 *
 *   w sameAs v
 *
 * is read as "w has the same value as v" and an update of v will trigger
 * an update of w. 
 *
 * This is the base class for all Constraints
 */

var Utilities = require('../Utilities.js')

module.exports.Constraint = Constraint
module.exports.SameAsConstraint = SameAsConstraint
module.exports.OffsetByConstantConstraint = OffsetByConstantConstraint
module.exports.ScaledByConstantConstraint = ScaledByConstantConstraint

// Constructor
function Constraint(l, r) {
	this.left = l
	this.right = r
	this.right.addConstraint(this)
}

Constraint.prototype = {

	constructor: Constraint,

	getLeft: function() {
		return this.left
	},

	getRight: function() {
		return this.right
	},

	isSatisfied: function() {
		throw "#isSatisfied() not implemented in this instance"
	},

	// Applies the Constraint by updating left's value
	applyConstraint: function(left, right) {
		throw "#applyConstraint() not implemented in this instance"
	},

	// Enforce the constraint, returning true if a value changes as a result
	constrain: function() {
		if (this.isSatisfied()) {
			return false
		}
		else {
			return this.applyConstraintToUnfixedValue()
		}
	},

	applyConstraintToUnfixedValue: function() {
		if (this.right.isSet())
			this.applyConstraintInOrder(this.left, this.right)
		else
			this.applyConstraintInOrder(this.right, this.left)
	},

	applyConstraintInOrder: function(left, right) {
		if (left.isRigid()) {
				throw "Cannot change rigid value " + left.value()
		}
		else {
			this.applyConstraint(left, right)
			return true
		}
	}
}

/*
 * Constrains values so that the left value is always the same as the right 
 * value.
 */
function SameAsConstraint(left, right) { 
	Constraint.call(this, left, right)
}
  
Utilities.inheritPrototype(SameAsConstraint, Constraint)

SameAsConstraint.prototype.isSatisfied = function() {
	return this.getLeft().getValue() == this.getRight().getValue()
}

SameAsConstraint.prototype.applyConstraint = function(left, right) {
	left.setValue(right.getValue())
}

/*
 * Constrains values so that the left value is always a constant distance from
 * the right value.
 */
function OffsetByConstantConstraint(left, right, constant) {
	Constraint.call(this, left, right)
	this.offset = constant
}

Utilities.inheritPrototype(OffsetByConstantConstraint, Constraint)

OffsetByConstantConstraint.prototype.isSatisfied = function() {
	return this.getLeft().isSet() &&
	       this.getLeft().getValue() == this.getRight().getValue() + this.offset
}

OffsetByConstantConstraint.prototype.applyConstraint = function(left, right) {
	left.setValue(right.getValue() + this.offset)
}

/*
 * Constrains values so that the left value is always a constant factor larger
 * than the right value.
 */
function ScaledByConstantConstraint(left, right, constant) {
	Constraint.call(this, left, right)
	this.factor = constant
}

Utilities.inheritPrototype(ScaledByConstantConstraint, Constraint)

ScaledByConstantConstraint.prototype.isSatisfied = function() {
	return this.getLeft().isSet() &&
	       this.getLeft().getValue() == this.getRight().getValue() * this.factor
}

ScaledByConstantConstraint.prototype.applyConstraint = function(left, right) {
	left.setValue(right.getValue() * this.factor)
}


