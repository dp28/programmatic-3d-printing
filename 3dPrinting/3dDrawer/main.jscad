include("Gear.jscad");
include("Spindle.jscad");

// Here we define the user editable parameters: 
function getParameterDefinitions() {
    return [
        {     
            name: 'numTeeth', 
            caption: 'Number of teeth:', 
            type: 'int', 
            initial: 10 
        },
        {     
            name: 'circularPitch', 
            caption: 'Circular pitch:', 
            type: 'float', 
            initial: 5 
        },
        {     
            name: 'pressureAngle', 
            caption: 'Pressure angle:', 
            type: 'float', 
            initial: 20 
        },
        {     
            name: 'clearance', 
            caption: 'Clearance:', 
            type: 'float', 
            initial: 0 
        },
        {     
            name: 'thickness', 
            caption: 'Thickness:', 
            type: 'float', 
            initial: 5 
        },
        {     
            name: 'centerholeradius',
            caption: 'Radius of center hole (0 for no hole):',
            type: 'float', 
            initial: 2 
        },
        {     
            name: 'baseThickness', 
            caption: 'Thickness of base:', 
            type: 'float', 
            initial: 2 
        }
    ];
}

function main(params)
{
    var pitchRadius = params.numTeeth * params.circularPitch / (2 * Math.PI);
    var first = makeGearAndSpindle(params, 0, 0);
    var second = makeGearAndSpindle(params, pitchRadius * 2, 0);
    second[0] = second[0].setColor(1, 0, 0);
    var shapes = [first[0], first[1].union(second[1]), second[0]];
    return shapes;
   
}

function makeGearAndSpindle(params, centreX, centreY) {    
    var gear = makeGearWithHole(params, centreX, centreY);
    var spindle = makeParameterisedSpindle(params, centreX, centreY);
    var shapes = [gear, spindle];    
    return shapes;
}

function makeGearWithHole(params, centreX, centreY)
{
     var gear = Gear.involuteGear(
        params.numTeeth,
        params.circularPitch,
        params.pressureAngle,
        params.clearance,
        params.thickness,
        centreX,
        centreY
    ); 
    
    
    if(params.centerholeradius > 0)
    {
        var centerhole = CSG.cylinder({start: [0,0,-params.thickness], end: [0,0,params.thickness], radius: params.centerholeradius, resolution: 16});
        gear = gear.subtract(centerhole);
        gear = gear.translate([0, 0, params.baseThickness]);
    }   
    
    gear = gear.translate([centreX, centreY, params.thickness / 2]);
    
    return gear;
}

function makeParameterisedSpindle(params, centreX, centreY) {
          
    var addendum = params.circularPitch / Math.PI;
    var pitchRadius = params.numTeeth * params.circularPitch / (2 * Math.PI);
    var baseRadius = pitchRadius * Math.cos(Math.PI * params.pressureAngle / 180);
    var outerRadius = pitchRadius + addendum;
  
  
    var spindle = Spindle.makeSpindle(params.baseThickness, outerRadius, 1.2 * params.thickness, params.centerholeradius * 0.95);
    spindle = spindle.setColor(0.8, 0.8, 0.8);
    spindle = spindle.translate([centreX, centreY]);
    return spindle;
}