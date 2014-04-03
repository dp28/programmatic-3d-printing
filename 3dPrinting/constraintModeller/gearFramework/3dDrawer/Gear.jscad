/*
 * This file is part of programmatic-3d-printing, a programmatic 3d printer 
 * language, Copyright (c) 2014, Daniel Patterson <dan24patt@gmail.com>.
 * All rights reserved.
 * 
 * programmatic-3d-printing is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * programmatic-3d-printing is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.
 */

include("InvoluteGear.jscad");
include("Circle.jscad");

Gear = function() {};

Gear.colour = [0.89, 0.75, 0.75]

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