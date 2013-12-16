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

 exports.Constraint = Constraint

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
