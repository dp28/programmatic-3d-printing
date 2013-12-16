""" $Id: value.py 1987 2013-05-01 16:56:58Z sd $

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

A constrainted value

Constraints form a network that can be solved (or not) to find
concrete values. We can't use the common constraint solvers in 
solid-py as they only typically work over discrete domains, and
we need to handle open (and possible real-valued) domains. This
makes constraint solving slower and more heuristic: we'll have
to see whether it's adequate for our purposes.

A constrained value may be rigid or flexible. Rigid values can't
be changed, and so can collapse the constraint network if their
value doesn't fit. Flexible values will change as constrained
"""

from . import exception


class Value:
    """A constrained value"""

    def __init__( self, v = None, r = False ):
        """Create a constrained value, initially flexible"""
        self.__value = v
        self.__rigid = r
        self.__constraints = []

    def value( self ):
        """Return the current value"""
        return self.__value

    def __setValue( self, v ):
        """Basic value setter that updates our value and then runs the constraint network"""
        self.__value = v
        self.valueChanged()

    def setValue( self, v ):
        """Set the current value. The value is flexible, and may be re-set through constraints"""
        if(self.isRigid()):
            raise exception.Rigidity(self)
        else:
            self.__setValue(v)

    def fixValue( self, v):
        """Set the current value. The value is rigid, and cannot be re-set through constraints"""
        self.__rigid = True
        self.__setValue(v)

    def unfixValue( self ):
        """Leave the value unchanged but make it flexible"""
        self.__rigid = False

    def isSet( self ):
        """Test whether the value has a value, which can be rigid or flexible"""
        return self.__value != None

    def isRigid( self ):
        """Test whether the value is rigid"""
        return self.__rigid

    def isFlexible( self ):
        """Test whether the value is flexible"""
        return not self.__rigid

    def addConstraint( self, c ):
        """Add a constraint to this node"""
        self.__constraints.append(c)

    def constraining( self ):
        "Return the set of values this value is constraining, that should be updated when it is"
        cs = set()
        for c in self.__constraints:
            l = c.left()
            if not (l in cs):
                cs = cs | set([l])
        return cs

    def __str__( self ):
        if self.isSet():
            s = str(self.value())
            if self.isRigid():
                s = s + " <rigid>"
            return s
        else:
            return "<flexible value>"

    def valueChanged( self ):
        self.visit([])

    def visit( self, visited ):
        """Visit this node, applying constraints"""

        "Constrain all those values constrained by us"
        visited.append(self)
        for c in self.__constraints:
            l = c.left()
            changed = c.constrain()
            if changed:
                l.visit(visited)
        visited.pop()
