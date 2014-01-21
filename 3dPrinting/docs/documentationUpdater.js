/*
 * Uses the "doc" reporter of mocha to generate documentation from the test 
 * suite.
 */
var sys = require('sys')
var exec = require('child_process').exec
var fs = require('fs')

const FILE_HEADER = '<head></head><body>'
const FILE_FOOTER = '</body>'
const DOCUMENTATION_FILE = 'documentation.html'
var blocked = false

updateDocumentation()

// from http://www.dzone.com/snippets/execute-unix-command-nodejs
function continueExecution(error, stdout, stderr) {
	blocked = false
	console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) 
    console.log('exec error: ' + error);
}

function composeFileContent(bodyHTML) {
	return FILE_HEADER + bodyHTML + FILE_FOOTER
}

function executeCommand(command) {
	exec(command, continueExecution)
}

function makeNewDocumentation(fileName) {
	executeCommand('rm ' + fileName)
	//executeCommand('mocha ../constraintModeller/* -R doc >> ' + fileName)
	//var docsHTML = fs.readFileSync(fileName, 'utf8')
	//return docsHTML
}

function updateDocumentation() {
	var docs = makeNewDocumentation(DOCUMENTATION_FILE)
	//var fileContent = composeFileContent(docs)
	//fs.writeFileSync(DOCUMENTATION_FILE, fileContent)
}
