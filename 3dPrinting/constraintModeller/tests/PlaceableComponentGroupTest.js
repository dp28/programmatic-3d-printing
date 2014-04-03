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
 * Tests the base class for all ComponentGroups
 */
var should = require('should')
var PlaceableComponentGroup = require('../components/PlaceableComponentGroup.js').PlaceableComponentGroup
var PlaceableComponent = require('../components/PlaceableComponent.js').PlaceableComponent
Circle = require('../geometry/Circle.js').Circle

module.exports.shouldBehaveLikeComponentGroup = shouldBehaveLikeComponentGroup

describe('ComponentGroup', function() {
	var group

	beforeEach(function() {
		group = new PlaceableComponentGroup() 
	})

	it('should behave like a PlaceableComponentGroup', function() {
		shouldBehaveLikeComponentGroup(group)
	})
})	

function shouldBehaveLikeComponentGroup(group, ComponentType) {
	if (ComponentType == undefined)
		ComponentType = PlaceableComponent
	describe('Anything inheriting from PlaceableComponentGroup', function() {
		var component

		beforeEach(function() {
		 	component = new ComponentType()
		})
		 
		describe('#addComponent', function() {
			it('should increase the number of Components in the PlaceableComponentGroup', function() {
				group.getSize().should.equal(0)
				group.addComponent(component)
				group.getSize().should.equal(1)
			})

			it('should contain the Components that were added', function() {
				group.addComponent(component)
				group.getComponents().should.contain(component)
			})
		})
	}) 
}