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

// Constructor
function Constraint(left, right) {
	this.left = left
	this.right = right
	right.addConstraint(this)
}

Constraint.prototype = {

	constructor: Constraint,

	isSatisfied: function() {
		throw "#isSatisfied() not implemented in this instance"
	},

	// Applies the Constraint by updating left's value
	applyConstraint: function() {
		throw "#applyConstraint() not implemented in this instance"
	},

	// Enforce the constraint, returning true if left's value changes as a result
	constrain: function() {
		if (isSatisfied()) {
			return false
		}
		else {
			if (left.isRigid()) {
				throw "Cannot change rigid value " + left.value()
			}
			else {
				applyConstraint()
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
	return this.left.value() == this.right.value()
}

SameAsConstraint.prototype.applyConstraint = function() {
	this.left.setValue(this.right.value())
}
