include("Utils.jscad");

Base = function() {};

Base.makeBase = function(specification) {
  var parts = makeParts(specification)
  var base = union(parts)
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
};

function makeParts(specification) { 
  var parts = [] 
  var height = specification.height
  var partSpecs = specification.parts
  for (var i = partSpecs.length - 1; i >= 0; i--) {
    parts.push(makePart(partSpecs[i], height))
  };

  return parts
}

function makePart(specification, height) {
  var part
  switch(specification.type) {
    case "Circle":
      part =  Utils.makeCylinder(specification.radius, height)
  part = part.translate([specification.centreX, 
                         specification.centreY, 
                         specification.centreZ])

      break;

    case "Line":
      part = makeRectangle(specification, height)
      break
  }
  return part
}

function makeRectangle(specification, height) {
  var angleInDegrees = toDegrees(specification.angleInRadians)
  return CSG.cube({
          center: [specification.centreX, specification.centreY, specification.centreZ],
          radius: [specification.length / 2, specification.width, 1]
    }).rotateZ(angleInDegrees)
}

function toDegrees(rad) {
    return 180 / Math.PI * rad;
}