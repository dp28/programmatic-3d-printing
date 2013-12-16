""" $Id: component.py 1985 2013-05-01 16:55:49Z sd $

This file is part of solid-py, a programmatic 3d printer language
Copyright (c) 2013, Simon Dobson <simon.dobson@computer.org>.
All rights reserved.

solid-py is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

solid-py is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111, USA.

Base class for all components

A component is a constrained geometric with a set of attributes and
a set of affordances. The various values in the bundle can be set
rigidly or constrained relative to other components. Connecting two
components via an affordance can change their geometries.
"""

import logging
from solidpy.constraints import *


class Component:
    """Base class for components"""

    def __init__( self, props ):
        """Set the properties of the component"""
        ps = {}
        for k in props.keys():
            v = props[k]
            "If value is not constrained, wrap it in a container, leaving it flexible"
            if not isinstance(v, value.Value):
                v = value.Value(v)
            ps[k] = v
        self.__properties = ps

    def properties( self ):
        """Return the property dictionary"""
        return self.__properties

    def property( self, n ):
        """Return the property named n, which will be a constrained value"""
        return self.__properties[n]

    def setProperty( self, n, v ):
        """Set the value of the named property"""
        self.__properties[n].setValue(v)

    def fixProperty( self, n, v ):
        """Fix (make rigid) the value of the named property"""
        self.__properties[n].fixValue(v)

    def negative( self, n ):
        """Create a value that is the negative of our property with the given named"""
        v = value.Value()
        constraint.ScaledByConstant(v, -1, self.property(n)).constrain()
        return v

    def placeNorthOf( self, c ):
        """Place this component north of c"""
        constraint.SameAs(self.property("x"), c.property("x")).constrain()
        constraint.OffsetBy(self.property("y"), c.property("height"), c.property("y")).constrain()
        constraint.SameAs(self.property("z"), c.property("z")).constrain()
        constraint.SameAs(self.property("width"), c.property("width")).constrain()

    def placeSouthOf( self, c ):
        """Place this component south of c"""
        constraint.SameAs(self.property("x"), c.property("x")).constrain()
        constraint.OffsetBy(self.property("y"), self.negative("height"), c.property("y")).constrain()
        constraint.SameAs(self.property("z"), c.property("z")).constrain()
        constraint.SameAs(self.property("width"), c.property("width")).constrain()

    def placeWestOf( self, c ):
        """Place this component west of c"""
        constraint.OffsetBy(self.property("x"), self.negative("width"), c.property("x")).constrain()
        constraint.SameAs(self.property("y"), c.property("y")).constrain()
        constraint.SameAs(self.property("z"), c.property("z")).constrain()
        constraint.SameAs(self.property("height"), c.property("height")).constrain()

    def placeEastOf( self, c ):
        """Place this component east of c"""
        constraint.OffsetBy(self.property("x"), c.property("width"), c.property("x")).constrain()
        constraint.SameAs(self.property("y"), c.property("y")).constrain()
        constraint.SameAs(self.property("z"), c.property("z")).constrain()
        constraint.SameAs(self.property("height"), c.property("height")).constrain()

    def placeAbove( self, c ):
        """Place this component above c"""
        constraint.SameAs(self.property("x"), c.property("x")).constrain()
        constraint.SameAs(self.property("y"), c.property("y")).constrain()
        constraint.SameAs(self.property("width"), c.property("width")).constrain()
        constraint.SameAs(self.property("height"), c.property("height")).constrain()
        constraint.OffsetBy(self.property("z"), self.property("depth"), c.property("z")).constrain()
        constraint.SameAs(self.property("border"), c.property("border")).constrain()

    def placeBelow( self, c ):
        """Place this component below c"""
        constraint.SameAs(self.property("x"), c.property("x")).constrain()
        constraint.SameAs(self.property("y"), c.property("y")).constrain()
        constraint.SameAs(self.property("width"), c.property("width")).constrain()
        constraint.SameAs(self.property("height"), c.property("height")).constrain()
        constraint.OffsetBy(self.property("z"), self.negative("depth"), c.property("z")).constrain()
        constraint.SameAs(self.property("border"), c.property("border")).constrain()


class Well(Component):
    """A square well with a width, height, depth, and border thickness"""

    def __init__( self, x = None, y = None, z = 0, width = 100, height = 100, depth = 50, border = 10 ):
        """Initialise the well"""
        Component.__init__(self, { "x":      x,
                                   "y":      y,
                                   "z":      z,
                                   "width":  height,
                                   "height": width,
                                   "depth":  depth,
                                   "border": border })
