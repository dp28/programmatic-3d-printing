/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

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
module.exports.Constraint = Constraint
module.exports.SameAsConstraint = SameAsConstraint
module.exports.OffsetByConstantConstraint = OffsetByConstantConstraint
module.exports.ScaledByConstantConstraint = ScaledByConstantConstraint

// Constructor
function Constraint(left, right) {
	var constraint = {

		getLeft: function() {
			return left
		},

		getRight: function() {
			return right
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
			if (right.isSet())
				this.applyConstraintInOrder(left, right)
			else
				this.applyConstraintInOrder(right, left)
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

	right.addConstraint(constraint)
	return constraint
}

/*
 * Constrains values so that the left value is always the same as the right 
 * value.
 */
function SameAsConstraint(left, right) { 
	sameAs = Constraint(left, right)

	sameAs.isSatisfied = function() {
		return left.getValue() == right.getValue()
	}

	sameAs.applyConstraint = function(left, right) {
		left.setValue(right.getValue())
	}

	return sameAs
}

/*
 * Constrains values so that the left value is always a constant distance from
 * the right value.
 */
function OffsetByConstantConstraint(left, right, constant) {
	offsetConstraint = Constraint(left, right)

	offsetConstraint.isSatisfied = function() {
		return left.isSet() &&
		       left.getValue() == right.getValue() + constant
	}

	offsetConstraint.applyConstraint = function(left, right) {
		left.setValue(right.getValue() + constant)
	}

	return offsetConstraint
}

/*
 * Constrains values so that the left value is always a constant factor larger
 * than the right value.
 */
function ScaledByConstantConstraint(left, right, constant) {
	scaledConstraint = Constraint(left, right)

	scaledConstraint.isSatisfied = function() {
		return this.getLeft().isSet() &&
			     this.getLeft().getValue() == this.getRight().getValue() * constant
	}


	scaledConstraint.applyConstraint = function(left, right) {
		left.setValue(right.getValue() * constant)
	}

	return scaledConstraint
}


