Utils = function() {};

Utils.makeCylinder = function (radius, height, resolution) {
	radius = Math.round(radius)
  var cylinder = CSG.cylinder({
                                start: [0, 0,-height / 2],
    	                          end: [0, 0, height / 2], 
    	                          radius: radius, 
    	                          resolution: resolution
    	                        });
  return cylinder;
};