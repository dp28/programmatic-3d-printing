Base = function() {};

Base.make = function(specification, params) {
  var parts = makeParts(specification, params)
  var base = union(parts)
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
};

function makeParts(specification, params) { 
  var parts = [] 
  var partSpecs = specification.parts
  for (var i = partSpecs.length - 1; i >= 0; i--) {
    if (partSpecs[i].height == undefined)
      partSpecs[i].height = specification.height
    parts.push(ComponentFactory.makeComponent(partSpecs[i], params))
  };

  return parts
}