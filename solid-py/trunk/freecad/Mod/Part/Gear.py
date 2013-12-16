""" $Id: Gear.py 1983 2013-05-01 15:28:11Z sd $

Create involute gears, using instructions from

   http://www.cartertools.com/involute.html

and a simpler method for constructing the involute from

   http://en.wikipedia.org/wiki/Involute 
"""

import math
from FreeCAD import Base, Part


def involutePolar( r, t ):
    "Return the vector position of the point subtended on the involute by the polar co-ordinates (r, t) on a circle of radius r"
    return Base.Vector(r * (math.cos(t) + t * math.sin(t)),
                       r * (math.sin(t) - t * math.cos(t)),
                       0)


def makeToothFace( P, N, PA ):
    "Make an upper tooth face, located at the origin"  

    D = N / float(P)
    R = D / 2.0
    DB = D * math.cos(math.radians(PA))
    RB = DB / 2.0
    a = 1 / float(P)
    d = 1.157 / float(P)
    DO = D + 2 * a
    RO = DO / 2.0
    DR = D - 2 * d
    RR = DR / 2.0
    CB = math.pi * DB
    FCB = RB / float(N)
    NCB = CB / FCB
    ACB = 360 / NCB
    GT = 360 / float(N)

    p0 = p1 = involutePolar(RB, 0)
    lines = []
    print "NCB = " + str(NCB)
    print "ACB = " + str(ACB)
    print "RO = " + str(RO)
    print "RB = " + str(RB)
    for i in range(1, 20):
        t = math.radians(ACB * i)
        p2 = involutePolar(RB, t)
        line = Part.makeLine(p1, p2)
        lines.append(line)
        p1 = p2
        print "len = " + str(p2.Length)

        if p2.Length >= RO:
            print "Escape at " + str(i)
            break
    wire = Part.Wire(lines)

    mat = Base.Matrix()
    p0.multiply(-1)
    mat.move(p0)
    wire = wire.transformGeometry(mat)
    mat = Base.Matrix()
    mat.rotateZ(-math.pi)
    wire = wire.transformGeometry(mat)
    #Part.show(wire)
    return wire


def makeGear( P, N, PA ):
    "Make a complete gear with N teeth"

    # standard way to specify pitch radius is teeth/in,
    # so convert to teeth/mm to make everything scale up
    P = P / 25.4

    # basic parameters -- the float conversions are needed to make sure
    # the arithmetic doesn't get truncated to ints
    D = N / float(P)
    R = D / 2.0
    DB = D * math.cos(math.radians(PA))
    RB = DB / 2.0
    a = 1 / float(P)
    d = 1.157 / float(P)
    DO = D + 2 * a
    RO = DO / 2.0
    DR = D - 2 * d
    RR = DR / 2.0
    CB = math.pi * DB
    FCB = RB / float(N)
    NCB = CB / FCB
    ACB = 360 / NCB
    GT = 360 / float(N)

    # first, create the top and bottom tooth lines by rotation
    # from the centre line lying along the x axis
    matu = Base.Matrix();
    matu.rotateZ(-math.radians(GT / 4))
    matd = Base.Matrix();
    matd.rotateZ(math.radians(GT / 4))
    L = Part.makeLine((0, 0, 0), (-RB, 0, 0))
    LT = L.transformGeometry(matu)
    LB = L.transformGeometry(matd)

    # build the involute tooth head, meeting the ends of the
    # tooth lines
    #TT = Part.makeLine(LT.Vertexes[1].Point, (-RO, 0, 0))
    TT = makeToothFace(P, N, PA)
    mat = Base.Matrix()
    mat.move(LT.Vertexes[1].Point)
    TT = TT.transformGeometry(mat)
    #TB = Part.makeLine(LB.Vertexes[1].Point, (-RO, 0, 0))
    TB = makeToothFace(P, N, PA)
    mat = Base.Matrix()
    mat.rotateX(math.pi)
    TB = TB.transformGeometry(mat)
    mat = Base.Matrix()
    mat.move(LB.Vertexes[1].Point)
    TB = TB.transformGeometry(mat)

    # build the outer curve of the tooth -- currently a line for simplicity
    i = len(TT.Vertexes) - 1
    TL = Part.makeLine(Base.Vector(TB.Vertexes[i].Point),
                       Base.Vector(TT.Vertexes[i].Point))

    # build an inter-tooth space -- currently a line for simplicity
    SM = LT.transformGeometry(matu)
    ST = SM.transformGeometry(matu)
    #arc = Part.Arc(Base.Vector(LT.Vertexes[1].Point),
    #               Base.Vector(SM.Vertexes[1].Point),
    #               Base.Vector(ST.Vertexes[1].Point))
    #SL = arc.toShape()
    SL = Part.makeLine(Base.Vector(LT.Vertexes[1].Point),
                       Base.Vector(ST.Vertexes[1].Point))
    #Part.show(TB)
    #Part.show(TL)
    #Part.show(TT)
    #Part.show(SL)
    #return

    # create a wire representing the outline of a tooth-and-space
    print len(TB.Edges)
    print len(TL.Edges)
    print len(TT.Edges)
    return
    elements = [ wire ]

    # create N copies of the wire, rotating each time, to build a
    # complete gear
    mat = Base.Matrix()
    mat.rotateZ(-math.radians(GT))
    for i in range(1, N):
        wire = wire.transformGeometry(mat)
        elements.append(wire)

    # create an outline and make it into a face
    outline = Part.Wire(elements)
    face = Part.Face(outline)

    # extrude the face into the initial gear
    ext = Base.Vector(0, 0, 1)
    gear = face.extrude(ext)
    Part.show(gear)

