GearUtilities = function() {}

GearUtilities.rotateToFace = function(object, face) {
	switch(face) {
		case "Back":
			return object
		case "Left":
			return object.rotateZ(-90)
		case "Front":
			return object.rotateZ(-180)
		case "Right":
			return object.rotateZ(-270)
	}
};

// Adapted from https://github.com/Spiritdude/OpenJSCAD.org/blob/master/examples/gear.jscad
// title: Gear
// author: Joost Nieuwenhuijse
// license: MIT License


/*
 * Edit by Daniel Patterson
 *
 *
 * - main() and parameter definition function removed
 * - made into library object (Gear)
 * - separated into makeTooth and InvoluteGear.involuteGear (in InvoluteGear)
 *
 *
 */


/*
  For gear terminology see: 
    http://www.astronomiainumbria.org/advanced_internet_files/meccanica/easyweb.easynet.co.uk/_chrish/geardata.htm
  Algorithm based on: http://www.cartertools.com/involute.html

  circularPitch: The distance between adjacent teeth measured at the pitch circle
*/ 
GearUtilities.makeTooth = function(numTeeth, circularPitch, pressureAngle, clearance, thickness, resolution) {
  // default values:
  if(arguments.length < 3) pressureAngle = 20;
  if(arguments.length < 4) clearance = 0;
  if(arguments.length < 4) thickness = 1;
  
  var addendum = circularPitch / Math.PI;
  
  // radiuses of the 4 circles:
  var pitchRadius = numTeeth * circularPitch / (2 * Math.PI);
  var baseRadius = pitchRadius * Math.cos(Math.PI * pressureAngle / 180);
  var outerRadius = pitchRadius + addendum;

  var maxtanlength = Math.sqrt(outerRadius*outerRadius - baseRadius*baseRadius);
  var maxangle = maxtanlength / baseRadius;

  var tl_at_pitchcircle = Math.sqrt(pitchRadius*pitchRadius - baseRadius*baseRadius);
  var angle_at_pitchcircle = tl_at_pitchcircle / baseRadius;
  var diffangle = angle_at_pitchcircle - Math.atan(angle_at_pitchcircle);
  var angularToothWidthAtBase = Math.PI / numTeeth + 2*diffangle;

  // build a single 2d tooth in the 'points' array:
  var points = [new CSG.Vector2D(0,0)];
  for(var i = 0; i <= resolution; i++)
  {
    // first side of the tooth:
    var angle = maxangle * i / resolution;
    var tanlength = angle * baseRadius;
    var radvector = CSG.Vector2D.fromAngle(angle);    
    var tanvector = radvector.normal();
    var p = radvector.times(baseRadius).plus(tanvector.times(tanlength));
    points[i+1] = p;
    
    // opposite side of the tooth:
    radvector = CSG.Vector2D.fromAngle(angularToothWidthAtBase - angle);    
    tanvector = radvector.normal().negated();
    p = radvector.times(baseRadius).plus(tanvector.times(tanlength));
    points[2 * resolution + 2 - i] = p;
  }

  // create the polygon and extrude into 3D:
  var tooth3d = new CSG.Polygon2D(points).extrude({offset: [0, 0, thickness]});
  return tooth3d
};