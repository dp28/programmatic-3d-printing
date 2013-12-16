var should = require("should")
var SameAsConstraint = require('../constraints/SameAsConstraint.js')

describe('SameAsConstraint', function(){

	var firstValue = new Value()
	var secondValue = new Value()
  it('should constrain a dependent value to be equal to the independent value',
    function(){
    new SameAsConstraint(firstValue, secondValue)
    firstValue.setValue(10)
    secondValue.value().should.equal(firstValue.value())
  })
})

// Make a ConstrainableValue which is composed from constraints
//  firstValue.sameAs(secondValue)