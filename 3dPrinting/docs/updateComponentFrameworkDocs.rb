#!/usr/bin/env ruby

# A script to auto-generate documentation from the Mocha unit tests

DOCUMENTATION_FILE = 'ComponentFrameworkDocumentation.html'
CSS_FILE = '<link rel="stylesheet" href="documentationStyles.css"/>'
JS_LIST_FILE = '<script src="expandableLists.js"></script>'
JQUERY = '<script src="http://code.jquery.com/jquery-latest.min.js"></script>'
TITLE = "<div><h1>Documentation for Programmatic 3D Printing </h1> <h2>[AUTOGENERATED FROM MOCHA UNIT TESTS]</h2><h2>Author: Daniel Patterson</h2></div>"
BUTTONS = '<div class="buttons"><a id="expandList">Expand All</a> <a id="collapseList">Collapse All</a> <a id="toggleCode" onclick="toggleCodeVisible();">Show test code</a></div>'
FILE_HEADER = "<head> #{CSS_FILE} #{JQUERY} #{JS_LIST_FILE} </head><body onload=\"setup();\"> <div id=\"main\">#{TITLE}#{BUTTONS}"
FILE_FOOTER = '</div></body>'

def updateDocumentation() 
	docs = makeNewDocumentation(DOCUMENTATION_FILE)
	docs = composeFileContent(docs)
	writeToFile(DOCUMENTATION_FILE, docs)
end

def composeFileContent(bodyContent) 
	return "#{FILE_HEADER}\n#{bodyContent}\n#{FILE_FOOTER}"
end

def makeNewDocumentation(fileName) 
	docs = `mocha ../constraintModeller/* -R doc`
end

def writeToFile(fileName, content)
	File.open(fileName, 'w') { |file| file.write(content) }
end

updateDocumentation()