Rectangle = function() {};

Rectangle.make = function(specification, params) {
  return CSG.cube({
          center: [0, 0, 0],
          radius: [specification.length / 2, 
                   specification.width / 2,
                   specification.height / 2]
    })
}