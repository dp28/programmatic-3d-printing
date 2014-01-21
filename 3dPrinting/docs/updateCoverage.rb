#!/usr/bin/env ruby
# Updates the code coverage document
DIRECTORIES_TO_IGNORE = ['node-jscoverage', 'tests']
CONSTRAINT_MODELLER_NAME = 'constraintModeller'
CONSTRAINT_MODELLER_LOCATION = "../#{CONSTRAINT_MODELLER_NAME}"
CONSTRAINT_MODELLER_TESTS_LOCATION = "#{CONSTRAINT_MODELLER_LOCATION}/tests"
COVERAGE_CODE_DIR = '.instrumented_code'
COVERAGE_DOCUMENT = 'coverage.html'

def instrumentConstraintDirectory(directory)
	`jscoverage #{CONSTRAINT_MODELLER_LOCATION}/#{directory} #{COVERAGE_CODE_DIR}/#{directory}`
end

def instrumentConstraintModellerCode()
	`mkdir #{COVERAGE_CODE_DIR}`
	codeDirectories = Dir["#{CONSTRAINT_MODELLER_LOCATION}/*/"].map { |name|
		File.basename(name)
	}
	codeDirectories -= DIRECTORIES_TO_IGNORE
	codeDirectories.each { |directory| 
		instrumentConstraintDirectory(directory)
	}
end

def copyTestsToInstrumentedCode() 
	`cp -r #{CONSTRAINT_MODELLER_TESTS_LOCATION} #{COVERAGE_CODE_DIR}/`
	`cp -r #{CONSTRAINT_MODELLER_LOCATION}/Utilities.js #{COVERAGE_CODE_DIR}/`
end

def instrumentCode() 
	`jscoverage #{COVERAGE_CODE_DIR} #{}`
end

def generateCoverageDocument() 
	`mocha #{COVERAGE_CODE_DIR}/*/*.js -R html-cov >> #{COVERAGE_DOCUMENT}`
end

def removeInstrumentedCode() 
	`rm -r #{COVERAGE_CODE_DIR}`
end

instrumentConstraintModellerCode()
copyTestsToInstrumentedCode()
generateCoverageDocument()
removeInstrumentedCode()
