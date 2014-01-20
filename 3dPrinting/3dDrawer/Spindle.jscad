
Spindle = function() {};

Spindle.makeSpindle = function(specification) {
  var spindle = makeCylinder(specification.radius, specification.height);
  spindle = spindle.setColor(0.8, 0.8, 0.8);
  return spindle;
};

function makeCylinder(radius, height) {
  var cylinder = CSG.cylinder({
                                start: [0, 0,-height / 2],
    	                          end: [0, 0, height / 2], 
    	                          radius: radius, 
    	                          resolution: 16
    	                        });
  return cylinder;
}