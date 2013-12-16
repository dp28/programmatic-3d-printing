""" $Id: components.py 1984 2013-05-01 16:53:47Z sd $

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

Tests of basic component operations and placement
"""

import unittest
import logging
from solidpy.constraints import *
from solidpy.components import *


class Components(unittest.TestCase):
    """Test basic placements"""

    def testWellNorthOfWell( self ):
        """Locate two wells beside each other"""
        w1 = component.Well(x = 0, y = 0)
        w2 = component.Well(height = 100)

        "Place the wells"
        w2.placeNorthOf(w1)
        self.assertEquals(w2.property("x").value(), w1.property("x").value())
        self.assertEquals(w2.property("y").value(), w1.property("y").value() + w1.property("height").value())
        self.assertEquals(w2.property("height").value(), 100)
        self.assertEquals(w2.property("width").value(), w1.property("width").value())

        "Moving w1 moves w2"
        w1.setProperty("x", 200)
        self.assertEquals(w1.property("x").value(), 200)
        self.assertEquals(w2.property("x").value(), w1.property("x").value())

        "Changing the height of w1 moves w2"
        w1.setProperty("height", 200)
        self.assertEquals(w1.property("height").value(), 200)
        self.assertEquals(w2.property("y").value(), w1.property("y").value() + w1.property("height").value())

    def testWellEastOfWell( self ):
        """Locate two wells beside each other, but requiring a negative offset"""
        w1 = component.Well(x = 0, y = 0)
        w2 = component.Well(width = 100)

        "Place the wells"
        w2.placeWestOf(w1)
        self.assertEquals(w2.property("x").value(), w1.property("x").value() - w2.property("width").value())
        self.assertEquals(w2.property("y").value(), w1.property("y").value())
        self.assertEquals(w2.property("height").value(), w1.property("height").value())

    def testWellBelowWell( self ):
        """Locate two wells beside each other in the vertical dimension"""
        w1 = component.Well(x = 0, y = 0, border = 5)
        w2 = component.Well(width = 100)

        "Place the wells"
        w2.placeBelow(w1)
        self.assertEquals(w2.property("x").value(), w1.property("x").value())
        self.assertEquals(w2.property("y").value(), w1.property("y").value())
        self.assertEquals(w2.property("z").value(), w1.property("z").value() - w2.property("depth").value())
        self.assertEquals(w2.property("height").value(), w1.property("height").value())
        self.assertEquals(w2.property("width").value(), w1.property("width").value())
        self.assertEquals(w2.property("border").value(), w1.property("border").value())
        self.assertEquals(w2.property("border").value(), 5)


if __name__ == "__main__":
    logging.basicConfig(format = "%(message)s",
                        level = logging.DEBUG)
    unittest.main()


