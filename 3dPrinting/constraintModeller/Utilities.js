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