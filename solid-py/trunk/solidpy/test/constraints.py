""" $Id: constraints.py 1988 2013-05-01 17:01:17Z sd $

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

Tests of constraint satisfaction networks
"""

import unittest
import logging
from solidpy.constraints import *


class Constraints(unittest.TestCase):
    """Test individual constraint types"""

    def testSameAs( self ):
        v = value.Value()
        w = value.Value()
        constraint.SameAs(w, v)

        v.setValue(10)

        self.assertEqual(w.value(), v.value())

    def testOffsetByConstant( self ):
        v = value.Value()
        w = value.Value()
        constraint.OffsetByConstant(w, 15, v)

        v.setValue(10)

        self.assertEqual(w.value(), v.value() + 15)

    def testScaledByConstant( self ):
        v = value.Value()
        w = value.Value()
        constraint.ScaledByConstant(w, 2.5, v)

        v.setValue(10)

        self.assertEqual(w.value(), v.value() * 2.5)


class Values(unittest.TestCase):

    def testConstruction( self ):
        """Test the various construction options and defaults work as expected"""
        v = value.Value()
        self.assertEqual(v.value(), None)
        self.assertEqual(v.isRigid(), False)

        w = value.Value(10)
        self.assertEqual(w.value(), 10)
        self.assertEqual(w.isRigid(), False)

        x = value.Value(5, True)
        self.assertEqual(x.value(), 5)
        self.assertEqual(x.isRigid(), True)

    def testFlexible( self ):
        """Test that a flexible value can be re-set through constraints"""
        v = value.Value()
        w = value.Value()
        constraint.SameAs(w, v)

        v.setValue(10)

        self.assertEqual(w.value(), v.value())

    def testRigid( self ):
        """Test that a rigid value cannot be re-set"""
        v = value.Value()
        w = value.Value()
        constraint.SameAs(w, v)

        w.fixValue(20)
        with self.assertRaises(exception.Rigidity):
            v.setValue(10)

    def testOneStepRigid( self ):
        """Two values depending on another, where both are the same and the target is rigid"""

        v1 = value.Value()
        v2 = value.Value()

        v1.setValue(10)
        v2.fixValue(20)

        constraint.SameAs(v2, v1)

        v1.setValue(20)

        self.assertEqual(v2.value(), v1.value())


class ConstraintNetworks(unittest.TestCase):
    """Test progressively more complex constraint networks"""

    def testOneStep( self ):
        """Two values depending on another"""

        v1 = value.Value()
        v2 = value.Value()
        v3 = value.Value()
        constraint.SameAs(v3, v1)
        constraint.SameAs(v2, v1)

        v1.setValue(10)

        self.assertEqual(v3.value(), v1.value())
        self.assertEqual(v2.value(), v1.value())

    def testTwoStepEquality( self ):
        """A chain of equality dependencies"""
        v1 = value.Value()
        v2 = value.Value()
        v3 = value.Value()
        constraint.SameAs(v3, v2)
        constraint.SameAs(v2, v1)

        v1.setValue(10)

        self.assertEqual(v2.value(), v1.value())
        self.assertEqual(v3.value(), v1.value())

    def testTwoStepConstantOffset( self ):
        """A chain of dependencies, an equality and a constant offset"""
        v1 = value.Value()
        v2 = value.Value()
        v3 = value.Value()
        constraint.SameAs(v3, v2)
        constraint.OffsetByConstant(v2, 15, v1)

        v1.setValue(10)

        self.assertEqual(v2.value(), v1.value() + 15)
        self.assertEqual(v3.value(), v2.value())

    def testTwoStepOffset( self ):
        """A chain of dependencies, an equality and an offset by a constrained amount"""
        v1 = value.Value()
        v2 = value.Value()
        v3 = value.Value()
        v = value.Value(15)
        constraint.SameAs(v3, v2)
        constraint.OffsetBy(v2, v, v1)

        "Change the base"
        v1.setValue(10)
        self.assertEqual(v2.value(), v1.value() + 15)
        self.assertEqual(v3.value(), v2.value())

        "Change the offset"
        v.setValue(5)
        self.assertEqual(v2.value(), v1.value() + 5)


if __name__ == "__main__":
    logging.basicConfig(format = "%(message)s",
                        level = logging.DEBUG)
    unittest.main()
