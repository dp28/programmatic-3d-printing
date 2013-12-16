""" $Id: exception.py 1983 2013-05-01 15:28:11Z sd $

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

Excepions
"""

class UnsatisfiedConstraint( Exception ):
    """Exception raised when we can't propagate a constraint"""

    def __init__( self, cons ):
        self.__constraint = cons

    def constraint( self ):
        return self.__constraint

    def __str__( self ):
        return "Unsatisfied constraint: " + str(self.constraint())



class Rigidity(Exception):
    """Exception raised if we try to constrain a rigid value to something different"""

    def __init__( self, v ):
        self.__value = v

    def value( self ):
        return self.__value

    def __str__( self ):
        return "rigid value " + str(self.value())


