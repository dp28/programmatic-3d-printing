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
 * Author: Daniel Patterson
 *
 * Contains utility functions used in multiple places
 */
module.exports.approximatelyEqual = approximatelyEqual

// From http://www.mattsnider.com/approximately-and-essentially-equal/
//
// Allows comparison of floats taking rounding errors into account
function approximatelyEqual(/* float */ a, /* float */ b, /* float */ epsilon) {
    var A = Math.abs(a), B = Math.abs(b);
    return Math.abs(A - B) <= (A < B ? B : A) * epsilon;
}