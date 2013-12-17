/*
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

module.exports.Constraint = Constraint
module.exports.SameAsConstraint = SameAsConstraint
module.exports.OffsetByConstantConstraint = OffsetByConstantConstraint
module.exports.OffsetByConstrainableConstraint = OffsetByConstrainableConstraint
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
	applyConstraint: function() {
		throw "#applyConstraint() not implemented in this instance"
	},

	// Enforce the constraint, returning true if left's value changes as a result
	constrain: function() {
		if (this.isSatisfied()) {
			return false
		}
		else {
			if (this.left.isRigid()) {
				throw "Cannot change rigid value " + left.value()
			}
			else {
				this.applyConstraint()
				return true
			}
		}
	}
}

// From http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
//
// Allows use of Parasitic Combination Inheritance pattern
function inheritPrototype(childObject, parentObject) {
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
  childObject.prototype = copyOfParent;
}

/*
 * Constrains values so that the left value is always the same as the right 
 * value.
 */
function SameAsConstraint(left, right) { 
	Constraint.call(this, left, right)
}
  
inheritPrototype(SameAsConstraint, Constraint)

SameAsConstraint.prototype.isSatisfied = function() {
	return this.getLeft().getValue() == this.getRight().getValue()
}

SameAsConstraint.prototype.applyConstraint = function() {
	this.getLeft().setValue(this.getRight().getValue())
}

/*
 * Constrains values so that the left value is always a constant distance from
 * the right value.
 */
function OffsetByConstantConstraint(left, right, constant) {
	Constraint.call(this, left, right)
	this.offset = constant
}

inheritPrototype(OffsetByConstantConstraint, Constraint)

OffsetByConstantConstraint.prototype.isSatisfied = function() {
	return this.getLeft().isSet() &&
	       this.getLeft().getValue() == this.getRight().getValue() + this.offset
}

OffsetByConstantConstraint.prototype.applyConstraint = function() {
	this.getLeft().setValue(this.getRight().getValue() + this.offset)
}

/*
 * Constrains values so that the left value is constrainable value from the
 * right value.
 */
function OffsetByConstrainableConstraint(left, right, value) {
	Constraint.call(this, left, right)
	this.offset = value
}

inheritPrototype(OffsetByConstrainableConstraint, Constraint)

OffsetByConstrainableConstraint.prototype.isSatisfied = function() {
	var leftAndOffsetSet = this.getLeft().isSet() && this.offset.isSet()
	var rightPlusOffset = this.getRight().getValue() + this.offset.getValue()
	return leftAndOffsetSet && this.getLeft().getValue() == rightPlusOffset
}

OffsetByConstrainableConstraint.prototype.applyConstraint = function() {
	var rightPlusOffset = this.getRight().getValue() + this.offset.getValue()
	this.getLeft().setValue(rightPlusOffset)
}

/*
 * Constrains values so that the left value is always a constant factor larger
 * than the right value.
 */
function ScaledByConstantConstraint(left, right, constant) {
	Constraint.call(this, left, right)
	this.factor = constant
}

inheritPrototype(ScaledByConstantConstraint, Constraint)

ScaledByConstantConstraint.prototype.isSatisfied = function() {
	return this.getLeft().isSet() &&
	       this.getLeft().getValue() == this.getRight().getValue() * this.factor
}

ScaledByConstantConstraint.prototype.applyConstraint = function() {
	this.getLeft().setValue(this.getRight().getValue() * this.factor)
}



