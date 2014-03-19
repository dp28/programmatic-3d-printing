include("Utils.jscad")

Line = function() {};

Line.make = function(specification, params) {
  var angleInDegrees = Utils.toDegrees(specification.angleInRadians)
  return CSG.cube({
          center: [0, 0, 0],
          radius: [specification.length / 2, 
                   specification.width,
                   specification.height / 2]
    }).rotateZ(angleInDegrees)
}