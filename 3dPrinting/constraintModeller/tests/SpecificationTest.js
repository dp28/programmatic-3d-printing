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
 * Tests the base class for all Specifications
 */
var should = require('should')
var Specification = require('../interface/Specification.js').Specification 
var Component = require('../components/Component.js').Component

module.exports.shouldBehaveLikeSpecification = shouldBehaveLikeSpecification

describe('Specification', function() {
	var specification, component

	beforeEach(function() {
		component = new Component()
		component.getCentre().setAt(0, 0, 0)
		specification = new Specification(component) 
	})
	
	it('should behave like a Specification', function() {
		shouldBehaveLikeSpecification(specification)
	})	
})

function shouldBehaveLikeSpecification(specification) {
	describe('Anything inheriting from Specification', function() {
		var otherSpecification, component

		beforeEach(function() {
			component = new Component()
			component.getCentre().setAt(0, 0, 0)
			otherSpecification = new Specification(component)

			specification.firstTestProperty = 'first'
			otherSpecification.secondTestProperty = 'second' 
		})
		
		describe('#addSpecification', function() {
			beforeEach(function() {
					specification.addSpecification(otherSpecification)  
			})

			it('should have the same properties as the added Specification', function() {
				specification.should.have.property('secondTestProperty', 'second')
			})

			it('should still have its original properties', function() {
				specification.should.have.property('firstTestProperty', 'first')
			})	

			describe('when the added Specification has the same property as the '
				       + 'original property but with a different value', function() {
				beforeEach(function() {
					otherSpecification.firstTestProperty = 'different'
					specification.addSpecification(otherSpecification)  
				})
				
				it('should use the added Specification\'s value', function() {
					specification.firstTestProperty.should.equal('different')
				})
			})	
		})
	})
}