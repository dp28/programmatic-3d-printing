
Spindle = function() {};

Spindle.makeSpindle = function(baseHeight, baseRadius, spindleHeight, spindleRadius)
{
    var base = makeCylinder(baseRadius, baseHeight);
    var spindle = makeCylinder(spindleRadius, spindleHeight);
    spindle = spindle.translate([0, 0, baseHeight]);
    var fullSpindle = base.union(spindle);

    return fullSpindle;
};

function makeCylinder(radius, height) {
    var circle = CAG.circle({radius: radius});
    var cylinder = circle.extrude({offset:[0, 0, height]});
    return cylinder;
}