include("Utils.jscad");

Base = function() {};

Base.makeBase = function(specification) {
  var base = Utils.makeCylinder(specification.radius, specification.height);
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
};


// function Bridge(a, b, w) {
//     this.start = a;
//     this.end = b;
//     this.width = w;
//     var xDiff = b.x - a.x;
//     var yDiff = b.y - a.y;
//     var centreX = xDiff / 2;
//     var centreY = yDiff / 2;
//     var rotation = Math.atan2(yDiff, xDiff);
//     var length = (Math.sqrt(xDiff * xDiff + yDiff * yDiff));
    
//     this.shape = function() {
//         return CSG.cube({
//           center: [centreX, centreY, 0],
//           radius: [length / 2, this.width, 1]
//     }).translate([-centreX, -centreY, 0])
//       .rotateZ(toDegrees(rotation))
//       .translate([centreX, centreY, 0]);
//     };
// }

// function toDegrees(rad) {
//     return 180 / Math.PI * rad;
// }