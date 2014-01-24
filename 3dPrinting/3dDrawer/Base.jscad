Base = function() {};

Base.makeBase = function(specification) {
  var base = makeCylinder(specification.radius, specification.height);
  base = base.setColor(0.4, 0.4, 0.4);
  return base;
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