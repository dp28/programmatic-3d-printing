""" $Id: Component.py 1989 2013-05-01 18:33:42Z sd $

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

A component

A representation in FreeCAD of the component being manipulated
programmatically. The component is loaded from an SDL file (as a
mesh) and turned into a FreeCAD shape.

This needs work, it's just a placeholder for the code to load the
SDL
"""

from FreeCAD import Base
import Part
import Mesh


class Component:
    """The 3d representation of a component"""

    def __init__( self, fn ):
        """Read a mesh from the given file and turn into a shape"""
        mesh = Mesh.read(fn)
        shape = Part.Shape()
        shape.makeShapeFromMesh(mesh.Topology, 0.05)
        solid = Part.makeSolid(shape)

        self.__solid = solid
        
