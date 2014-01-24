Utils = function() {};

Utils.makeCylinder = function (radius, height) {
  var cylinder = CSG.cylinder({
                                start: [0, 0,-height / 2],
    	                          end: [0, 0, height / 2], 
    	                          radius: radius, 
    	                          resolution: 16
    	                        });
  return cylinder;
};