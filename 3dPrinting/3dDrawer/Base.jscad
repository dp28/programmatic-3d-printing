include("Utils.jscad");

Base = function() {};

Base.makeBase = function(specification, params) {
  var parts = makeParts(specification, params)
  var base = union(parts)
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
};

function makeParts(specification, params) { 
  var parts = [] 
  var height = specification.height
  var partSpecs = specification.parts
  for (var i = partSpecs.length - 1; i >= 0; i--) {
    parts.push(makePart(partSpecs[i], height, params))
  };

  return parts
}

function makePart(specification, height, params) {
  var part
  switch(specification.type) {
    case "Circle":
      part =  Utils.makeCylinder(specification.radius, height, params.circleRes)
      break;

    case "Line":
      part =makeRectangle(specification, height)
      break
  }

  part = part.translate([specification.centreX, 
                         specification.centreY, 
                         specification.centreZ])
  return part
}

function makeRectangle(specification, height) {
  var angleInDegrees = toDegrees(specification.angleInRadians)
  return CSG.cube({
          center: [0, 0, 0],
          radius: [specification.length / 2, specification.width, height / 2]
    }).rotateZ(angleInDegrees)
}

function toDegrees(rad) {
    return 180 / Math.PI * rad;
}