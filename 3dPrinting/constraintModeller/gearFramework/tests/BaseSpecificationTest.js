/*
 * author: Daniel Patterson
 *
 * Tests the BaseSpecification Object that is used to interface between the 
 * Constraint Modelling aspect and the 3D Drawing aspect for Bases
 */
var should = require('should')
var SpecificationTest = require('../../tests/SpecificationTest.js')

module.exports.testBaseSpecification = testBaseSpecification

function testBaseSpecification(baseSpec, base) {
	
	describe('BaseSpecification', function() {	
		it('should have the same height as the Base that created it', function() {
			baseSpec.height.should.equal(base.getHeight().getValue())
		})

		it('should behave like a Specification', function() {
			SpecificationTest.shouldBehaveLikeSpecification(baseSpec)
		})

		describe('.parts', function() {
			it('should contain the specifications of all the Lines in the Base',
			   function() {
			  var lines = base.getLines()
				for (var i = lines.length - 1; i >= 0; i--) {
					containsSpecificationOf(baseSpec.parts, lines[i]).should.be.true
				};
			})

			it('should contain the specifications of all the Circles in the Base',
			   function() {
			  var circles = base.getCircles()
				for (var i = circles.length - 1; i >= 0; i--) {
					containsSpecificationOf(baseSpec.parts, circles[i]).should.be.true
				};
			})

			function containsSpecificationOf(partSpecs, part) {
				for (var i = partSpecs.length - 1; i >= 0; i--) {
					if (isSpecificationOf(part, partSpecs[i]))
						return true
				};

				return false
			}

			function isSpecificationOf(shape, specification) {
				var shapeSpecString = JSON.stringify(shape.toSpecification())
				var specificationString = JSON.stringify(specification)
				return shapeSpecString == specificationString
			}
		})
	})
}