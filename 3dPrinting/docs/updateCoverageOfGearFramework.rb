#!/usr/bin/env ruby
# Updates the code coverage document
DIRECTORIES_TO_IGNORE = ['node-jscoverage']
FILES_NOT_TO_INSTRUMENT = ['tests']
CONSTRAINT_MODELLER_NAME = 'constraintModeller'
TARGET_NAME = 'gearFramework'
TARGET_LOCATION = "../#{CONSTRAINT_MODELLER_NAME}/#{TARGET_NAME}"
CONSTRAINT_MODELLER_LOCATION = "../#{CONSTRAINT_MODELLER_NAME}"
TEST_DIR_NAME = "tests"
COVERAGE_CODE_DIR = '.instrumented_code'
COVERAGE_DOCUMENT = 'gearFrameworkCoverage.html'

def instrumentConstraintDirectory(directory)
	`jscoverage #{TARGET_LOCATION}/#{directory} #{COVERAGE_CODE_DIR}/#{CONSTRAINT_MODELLER_NAME}/#{directory}`
end

def instrumentConstraintModellerCode()
	`mkdir #{COVERAGE_CODE_DIR}`
	`mkdir #{COVERAGE_CODE_DIR}/#{CONSTRAINT_MODELLER_NAME}`
	codeDirectories = Dir["#{TARGET_LOCATION}/*/"].map { |name|
		File.basename(name)
	}
	codeDirectories -= FILES_NOT_TO_INSTRUMENT
	codeDirectories -= DIRECTORIES_TO_IGNORE
	codeDirectories.each { |directory| 
		instrumentConstraintDirectory(directory)
	}
end

def copyTestsToInstrumentedCode() 
	FILES_NOT_TO_INSTRUMENT.each { |file| 
		`cp -r #{TARGET_LOCATION}/#{file} #{COVERAGE_CODE_DIR}/#{CONSTRAINT_MODELLER_NAME}/#{file}`
	}
end

def copyComponentFrameworkToInstrumentedCode() 
	codeDirectories = Dir["#{CONSTRAINT_MODELLER_LOCATION}/*"].map { |name|
		File.basename(name)
	}
	codeDirectories -= DIRECTORIES_TO_IGNORE
	codeDirectories.each { |file| 
		`cp -r #{CONSTRAINT_MODELLER_LOCATION}/#{file} #{COVERAGE_CODE_DIR}/#{file}`
	}
end

def generateCoverageDocument() 
	`mocha #{COVERAGE_CODE_DIR}/#{CONSTRAINT_MODELLER_NAME}/#{TEST_DIR_NAME}/*Test.js -R html-cov >> #{COVERAGE_DOCUMENT}`
end

def removeInstrumentedCode() 
	`rm -r #{COVERAGE_CODE_DIR}`
end

def removeOldCoverageDocument() 
	`rm #{COVERAGE_DOCUMENT}`
end

removeOldCoverageDocument()
instrumentConstraintModellerCode()
copyTestsToInstrumentedCode()
copyComponentFrameworkToInstrumentedCode()
generateCoverageDocument()
removeInstrumentedCode()
