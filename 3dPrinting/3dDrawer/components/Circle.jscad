Circle = function() {};

Circle.make = function (specification, params) {
	var radius = Math.round(specification.radius)
  var cylinder = CSG.cylinder({
                                start: [0, 0,-specification.height / 2],
    	                          end: [0, 0, specification.height / 2], 
    	                          radius: radius, 
    	                          resolution: params.circleRes
    	                        });
  return cylinder;
};