/*
 * author: Daniel Patterson
 *
 * This is a Node.js port of Simon Dobson's version in solid-py, with 
 * convenience methods for creating Constraints
 *
 * A constrainted value
 * 
 * Constraints form a network that can be solved (or not) to find
 * concrete values. We can't use the common constraint solvers in 
 * solid-py as they only typically work over discrete domains, and
 * we need to handle open (and possible real-valued) domains. This
 * makes constraint solving slower and more heuristic: we'll have
 * to see whether it's adequate for our purposes.
 * 
 * A constrained value may be rigid or flexible. Rigid values can't
 * be changed, and so can collapse the constraint network if their
 * value doesn't fit. Flexible values will change as constrained
 *
 */
var ConstraintModule = require('./Constraint.js')

module.exports.ConstrainableValue = ConstrainableValue 

function ConstrainableValue () {
 	var value = null
 	var rigid = false
 	var constraints = []
 	var self = this // Allows public methods to be called inside private methods

 	this.setValue = function(val) {
 		if (rigid)
		  throw("Cannot set rigid ConstrainableValue ")
	  else
	  	setValueEvenIfRigid(val)
 	}

 	var setValueEvenIfRigid = function(val) {
    value = val
    self.valueChanged()
 	}

 	this.getValue = function() {
 		return value
 	}

 	this.getConstraints = function() {
 		return constraints
 	}

 	this.fixValue = function(val) {
 		rigid = true
 		setValueEvenIfRigid(val)
 	}

 	this.isRigid = function() {
 		return rigid
 	}

 	this.unfixValue = function() {
 		rigid = false
 	}

 	this.isSet = function() {
 		return value !== null
 	}

 	this.isFlexible = function() {
 		return ! rigid
 	}

 	this.addConstraint = function(constraint) {
 		constraints.push(constraint)
 	}

 	this.valueChanged = function() {
 		this.visit([])
 	}

 	// Visit this node, applying constraints
 	this.visit = function(visited) {
 		// Constrain all those values constrained by this value
 		visited.push(this)
 		constraints.forEach(function(constraint) {
 			l = constraint.getLeft()
 			changed = constraint.constrain()
 			if (changed) {
 				l.visit(visited)
 			}
 		})
 		visited.pop()
 	}

 	// A convenience method for adding a new SameAsConstraint to this 
 	// ConstrainableValue 
 	this.sameAs = function(otherValue) {
 		constraint = new ConstraintModule.SameAsConstraint(this, otherValue)
 		this.addConstraint(constraint)
 	}

 	// A convenience method for adding a new OffsetByConstantConstraint to this 
 	// ConstrainableValue 
 	this.offsetByConstant = function(otherValue, constantOffset) {
 		constraint = new ConstraintModule.OffsetByConstantConstraint(this, 
 			                                                           otherValue,
 			                                                           constantOffset)
 		this.addConstraint(constraint)
 	}

 	// A convenience method for adding a new ScaledByConstantConstraint to this 
 	// ConstrainableValue 
 	this.scaledByConstant = function(otherValue, constantFactor) {
 		constraint = new ConstraintModule.ScaledByConstantConstraint(this, 
 			                                                           otherValue,
 			                                                           constantFactor)
 		this.addConstraint(constraint)
 	}
}
