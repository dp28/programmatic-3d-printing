#!/usr/bin/env ruby
# Updates the code coverage document
DIRECTORIES_TO_IGNORE = ['node-jscoverage']
FILES_NOT_TO_INSTRUMENT = ['node_modules', 'tests', 'Utilities.js', 'Configuration.js']
CONSTRAINT_MODELLER_NAME = 'constraintModeller'
CONSTRAINT_MODELLER_LOCATION = "../#{CONSTRAINT_MODELLER_NAME}"
TEST_DIR_NAME = "tests"
COVERAGE_DOCUMENT = 'componentFrameworkCoverage.html'

def instrumentConstraintDirectory(directory)
	`jscoverage #{CONSTRAINT_MODELLER_LOCATION}/#{directory} #{directory}`
end

def instrumentConstraintModellerCode()
	codeDirectories = findCodeDirectories()
	codeDirectories.each { |directory| 
		instrumentConstraintDirectory(directory)
	}
end

def findCodeDirectories() 
	codeDirectories = Dir["#{CONSTRAINT_MODELLER_LOCATION}/*/"].map { |name|
		File.basename(name)
	}
	codeDirectories -= FILES_NOT_TO_INSTRUMENT
	codeDirectories -= DIRECTORIES_TO_IGNORE
	return codeDirectories
end

def copyTestsToInstrumentedCode() 
	FILES_NOT_TO_INSTRUMENT.each { |file| 
		print `cp -r #{CONSTRAINT_MODELLER_LOCATION}/#{file} #{file}`
	}
end

def generateCoverageDocument() 
	print `mocha #{TEST_DIR_NAME}/*Test.js -R html-cov >> #{COVERAGE_DOCUMENT}`
end

def removeInstrumentedCode() 
	removeDirectories(findCodeDirectories())
	removeDirectories(FILES_NOT_TO_INSTRUMENT)
end

def removeDirectories(directories)
	directories.each {|directory|
		`rm -r #{directory}`
	}

end

def removeOldCoverageDocument() 
	print `rm #{COVERAGE_DOCUMENT}`
end

removeOldCoverageDocument()
instrumentConstraintModellerCode()
copyTestsToInstrumentedCode()
generateCoverageDocument()
removeInstrumentedCode()
