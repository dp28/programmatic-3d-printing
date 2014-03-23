// title: Gear
// author: Joost Nieuwenhuijse
// license: MIT License


/*
 * Edit by Daniel Patterson
 *
 * Originally from: https://github.com/Spiritdude/OpenJSCAD.org/blob/master/examples/gear.jscad
 *
 * - main() and parameter definition function removed
 * - made into library object (Gear)
 * - separated into makeTooth (in GearUtilities) and InvoluteGear.involuteGear
 *
 *
 */


/*
  For gear terminology see: 
    http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
  Algorithm based on: http://www.cartertools.com/involute.html

  circularPitch: The distance between adjacent teeth measured at the pitch circle
*/ 
include("GearUtilities.jscad")

InvoluteGear = function() {
};

InvoluteGear.involuteGear = function (numTeeth, circularPitch, pressureAngle, clearance, thickness, resolution)
{
  // default values:
  if(arguments.length < 3) pressureAngle = 20;
  if(arguments.length < 4) clearance = 0;
  if(arguments.length < 4) thickness = 1;
  
  var addendum = circularPitch / Math.PI;
  var dedendum = addendum + clearance
  
  // radiuses of the 4 circles:
  var pitchRadius = numTeeth * circularPitch / (2 * Math.PI);
  var baseRadius = pitchRadius * Math.cos(Math.PI * pressureAngle / 180);
  var outerRadius = pitchRadius + addendum;
  var rootRadius = pitchRadius - dedendum;

  var maxtanlength = Math.sqrt(outerRadius*outerRadius - baseRadius*baseRadius);
  var maxangle = maxtanlength / baseRadius;

  var tl_at_pitchcircle = Math.sqrt(pitchRadius*pitchRadius - baseRadius*baseRadius);
  var angle_at_pitchcircle = tl_at_pitchcircle / baseRadius;
  var diffangle = angle_at_pitchcircle - Math.atan(angle_at_pitchcircle);
  var angularToothWidthAtBase = Math.PI / numTeeth + 2*diffangle;

  // create the polygon and extrude into 3D:
  var tooth3d = GearUtilities.makeTooth(numTeeth, circularPitch, pressureAngle, clearance, thickness, resolution)

  var allteeth = new CSG();
  for(var j = 0; j < numTeeth; j++)
  {
    var ang = j*360/numTeeth;
    var rotatedtooth = tooth3d.rotateZ(ang);
    allteeth = allteeth.unionForNonIntersecting(rotatedtooth);
  }

  // build the root circle:  
  points = [];
  var toothAngle = 2 * Math.PI / numTeeth;
  var toothCenterAngle = 0.5 * angularToothWidthAtBase; 
  for(var k = 0; k < numTeeth; k++)
  {
    var angl = toothCenterAngle + k * toothAngle;
    var p1 = CSG.Vector2D.fromAngle(angl).times(rootRadius);
    points.push(p1);
  }

  // create the polygon and extrude into 3D:
  var rootcircle = new CSG.Polygon2D(points).extrude({offset: [0, 0, thickness]});

  var result = rootcircle.union(allteeth);

  // center at origin:
  result = result.translate([0, 0, -thickness/2]);

  return result;
};
