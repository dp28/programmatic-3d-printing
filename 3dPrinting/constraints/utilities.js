// From http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
//
// Allows use of Parasitic Combination Inheritance pattern
function inheritPrototype(childObject, parentObject) {
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
  childObject.prototype = copyOfParent;
}

exports.inheritPrototype = inheritPrototype