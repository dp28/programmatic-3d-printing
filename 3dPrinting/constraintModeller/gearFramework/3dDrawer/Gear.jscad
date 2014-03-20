include("InvoluteGear.jscad");
include("Circle.jscad");

Gear = function() {};

Gear.colour = [1, 1, 0]

Gear.make = function(specification, params) {
  var gear = InvoluteGear.involuteGear(specification.numTeeth,
                                       specification.circularPitch,
                                       specification.pressureAngle,
                                       specification.clearance,
                                       specification.height,
                                       params.circleRes / 2); 
    
  gear = removeCentreHole(gear, specification, params)
  return gear;
};

function removeCentreHole(gear, specification, params) {
  if(specification.centreHoleRadius > 0) {
    var spec = {}
    spec.radius = specification.centreHoleRadius
    spec.height = specification.height
    var centerHole = Circle.make(spec, params)
    gear = gear.subtract(centerHole);
  } 
  return gear
};