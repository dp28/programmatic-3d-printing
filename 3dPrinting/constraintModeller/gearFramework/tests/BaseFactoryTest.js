/*
 * author: Daniel Patterson
 *
 * Tests how BaseFactories produce Base Components
 */
var should = require('should')
var BaseFactory = require('../components/BaseFactory.js').BaseFactory 
var Base = require('../components/Base.js').Base 
var GearTrain = require('../components/GearTrain.js').GearTrain 
var BaseSpecification = require('../interface/BaseSpecification.js').BaseSpecification 
var BaseSpecificationTest = require('../tests/BaseSpecificationTest.js')
var GearTrainTest = require('../tests/GearTrainTest.js')
var BaseTest = require('../tests/BaseTest.js')

describe('BaseFactory', function() {
	var factory

	beforeEach(function() {
		factory = new BaseFactory() 
	})

	describe('#makeBase', function() {
		var firstGear, secondGear, thirdGear

		beforeEach(function() {
			var gears = createTestGears()
			base = factory.makeBase(gears)
		})

		function createTestGears() {
			var train = new GearTrain(10) // Simple way of creating meshable gears
			firstGear = train.createGear(10)
			secondGear = train.createGear(20)
			thirdGear = train.createGear(8)
			firstGear.placeAtFrontOf(secondGear)
			thirdGear.placeAtBackOf(secondGear)
			secondGear.getCentre().setAt(0, 0, 0)
			return train.getComponents()
		}

		it('should return a Base Component', function() {
			BaseTest.shouldBehaveLikeBase(base)
		})

		describe('the returned Base', function() {
			var base

			beforeEach(function() {	
				var gears = createTestGears()
				base = factory.makeBase(gears) 
			})

			function containsSupportingCirlce(base, gear) {
				var parts = base.getCircles()
				for (var i = parts.length - 1; i >= 0; i--) {
					if (gearSupportedByPointOnBase(gear, parts[i].getCentre(), base))
						return true 
				}
				return false
			}

			function gearSupportedByPointOnBase(gear, pointOnBase, base) {
				return gearDirectlyAboveOrBelowPoint(gear, pointOnBase) 
				       && isSupporting(gear, pointOnBase, base)
			}

			function gearDirectlyAboveOrBelowPoint(gear, point) {
				var gearX = gear.getCentre().getX().getValue()
				var gearY = gear.getCentre().getY().getValue()
				var pointX = point.getX().getValue()
				var pointY = point.getY().getValue() 
				return pointX == gearX && pointY == gearY
			}

			function isSupporting(gear, pointOnBase, base) {
				var baseHeight = base.getHeight().getValue()
				var gearZ = gear.getCentre().getZ().getValue()
				var gearThickness = gear.getThickness().getValue()
				var pointZ = pointOnBase.getZ().getValue()
				return pointZ == gearZ - gearThickness / 2 - baseHeight / 2 
			}

			function containsSupportingLineBetween(base, startGear, endGear) {
				var lines = base.getLines()
				for (var i = lines.length - 1; i >= 0; i--) {
					if (isSupportingLineFor(lines[i], startGear, endGear, base))
						return true
				};

				return false
			}

			function isSupportingLineFor(line, startGear, endGear, base) {
				return (gearSupportedByPointOnBase(startGear, line.getStart(), base) 
				       && gearSupportedByPointOnBase(endGear, line.getEnd(), base))
				       ||  (gearSupportedByPointOnBase(endGear, line.getStart(), base) 
				           && gearSupportedByPointOnBase(startGear, line.getEnd(), base))
			}


			it('should contain a Circle for each Gear', function() {
				base.getCircles().length.should.equal(3)
				containsSupportingCirlce(base, firstGear).should.be.true
				containsSupportingCirlce(base, secondGear).should.be.true
				containsSupportingCirlce(base, thirdGear).should.be.true
			})

			it('should contain a Spindle for each Gear', function() {
				base.getSpindles().length.should.equal(3)
			})

			it('should contain a Line between each meshing Gear', function() {
				containsSupportingLineBetween(base, firstGear, secondGear).should.be.true
				containsSupportingLineBetween(base, thirdGear, secondGear).should.be.true
			})

			describe('#toSpecification', function() {
				it('return a Specification that behaves like a BaseSpecification ' 
					 + 'generated from this Base', function() {
					var baseSpec = base.toSpecification()
					BaseSpecificationTest.testBaseSpecification(baseSpec, base)
				})
			})			
		})
	})	
})