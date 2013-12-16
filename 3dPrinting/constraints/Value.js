/*
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
 
module.exports.Value = Value

function Value() {
 	this.value = null
 	this.rigid = false
 	this.constraints = []

 	this._setValueEvenIfRigid = function(val) {
    this.value = val
 	}

 	this.setValue = function(val) {
 		if (this.rigid)
		  throw("Cannot set rigid Value")
	  else
	  	this._setValueEvenIfRigid(val)
 	}

 	this.getValue = function() {
 		return this.value
 	}

 	this.fixValue = function(val) {
 		this.rigid = true
 		this._setValueEvenIfRigid(val)
 	}

 	this.isRigid = function() {
 		return this.rigid
 	}

 	this.unfixValue = function() {
 		this.rigid = false
 	}

 	this.isSet = function() {
 		return this.value !== null
 	}

 	this.isFlexible = function() {
 		return ! this.rigid
 	}
}
