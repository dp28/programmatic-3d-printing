 var should = require("should")
var Constraint = require('../constraints/Constraint.js')

describe.skip('SameAsConstraint', function(){ 

	// var firstValue = new Value()
	// var secondValue = new Value()
  it('should constrain a dependent value to be equal to the independent value',
    function(){
    new SameAsConstraint(firstValue, secondValue)
    firstValue.setValue(10)
    secondValue.value().should.equal(firstValue.value())
  })
})
