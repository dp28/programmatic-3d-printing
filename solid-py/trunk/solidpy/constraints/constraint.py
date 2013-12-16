""" $Id: constraint.py 1986 2013-05-01 16:56:26Z sd $

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

Constraints

Constraints are binary relations between constrained values. A constraint
is read right to left, so a constraint like:

   w sameAs v

is read as "w has the same value as v" and an update of v will trigger
an update of w. 
"""

import logging
from . import exception

class Constraint:
    """Base class for all constraints"""

    def __init__( self, l, r):
        """Record the endpoints of the constraint, linking it into the network"""
        self.__left = l
        self.__right = r
        self.__right.addConstraint(self)

    def left( self ):
        return self.__left

    def right( self ):
        return self.__right

    def isConstraintSatisfied( self ):
        """Return True if the constraint is currently satisfied"""
        raise Exception("isConstraintSatisfied() not defined in sub-class")

    def applyConstraint( self ):
        """Apply the constraint, updating left's value"""
        raise Exception("applyConstraint() not defined in sub-class")

    def constrain( self ):
        """Enforce the constraint, returning True if left's value changes as a result"""
        logging.debug("Checking " + str(self))
        if(self.isConstraintSatisfied()):
            "Constraint satisfied, nothing to do"
            return False
        else:
            "Constraint not satisfied, check we can do the update we need to"
            if(self.left().isRigid()):
                raise exception.Rigidity(self.left().value())
            else:
                "Do the update"
                self.applyConstraint()
                return True

    def __str__( self ):
        return str(self.left()) + " " + self.__class__.__name__ + " " + str(self.right())


class SameAs(Constraint):
    """Constrain left to be the same value as right"""

    def isConstraintSatisfied( self ):
        return self.left().value() == self.right().value()

    def applyConstraint( self ):
        self.left().setValue(self.right().value())


class OffsetByConstant(Constraint):
    """Constrain left to be at a constant offset from right"""

    def __init__( self, l, off, r):
        Constraint.__init__(self, l, r)
        self.__offset = off

    def offset( self ):
        return self.__offset

    def isConstraintSatisfied( self ):
        return self.left().isSet() and (self.left().value() + self.offset() == self.right().value())

    def applyConstraint( self ):
        self.left().setValue(self.right().value() + self.offset())


class OffsetBy(Constraint):
    """Constrain left to be offset from right by the given value, which may itself be constained"""

    def __init__( self, l, off, r):
        Constraint.__init__(self, l, r)
        self.__offset = off
        self.__offset.addConstraint(self)

    def offset( self ):
        return self.__offset

    def isConstraintSatisfied( self ):
        return (self.left().isSet()) and (self.offset().isSet()) and (self.left().value() + self.offset().value() == self.right().value())

    def applyConstraint( self ):
        self.left().setValue(self.right().value() + self.offset().value())


class ScaledByConstant(Constraint):
    """Constrain left to be right scaled by some constant"""

    def __init__( self, l, sc, r):
        Constraint.__init__(self, l, r)
        self.__scale = sc

    def scaleFactor( self ):
        return self.__scale

    def isConstraintSatisfied( self ):
        return self.left().isSet() and (self.left().value() * self.scaleFactor() == self.right().value())

    def applyConstraint( self ):
        self.left().setValue(self.right().value() * self.scaleFactor())


