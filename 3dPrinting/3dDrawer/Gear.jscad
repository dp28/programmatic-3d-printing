include("InvoluteGear.jscad");
include("Utils.jscad");

Gear = function() {};

Gear.makeGear = function(specification, params) {
  var gear = InvoluteGear.involuteGear(specification.numTeeth,
                               specification.circularPitch,
                               specification.pressureAngle,
                               specification.clearance,
                               specification.thickness,
                               params.circleRes / 2); 
    
  gear = removeCentreHole(gear, specification, params)
  gear = addID(gear, specification, params)
  return gear;
};

function removeCentreHole(gear, specification, params) {
  if(specification.centreHoleRadius > 0) {
    var centerHole = Utils.makeCylinder(specification.centreHoleRadius,
                                        specification.thickness,
                                        params.circleRes)
    gear = gear.subtract(centerHole);
  } 
  return gear
};

function addID(gear, specification, params) {	
  if (params.showID == 'Yes') {
    var id = makeText("" + specification.id);
    id = id.translate([0, 0, specification.thickness]);
    gear = union(gear, id);
  }
  return gear
};

function makeText(string) {
	var lines = vector_text(0,0,string);   
	var objects = [];
	lines.forEach(function(polyline) {  
		var extruded = rectangular_extrude(polyline, {w: 2, h: 2})
    extruded = extruded.setColor(0, 0, 0)  
	  objects.push(extruded);                 
	});
	return union(objects);
};