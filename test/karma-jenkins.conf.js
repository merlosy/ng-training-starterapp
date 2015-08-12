singleRun = true;
reporters = ['dots', 'junit', 'coverage'];

preprocessors = {
  'app/**/*.js': ['coverage']
};

plugins = [
  'karma-junit-reporter',
  'karma-coverage'
};

junitReporter = {
  outputFile: 'test-results-jenkins.xml'
};

coverageReporter = {
  type : 'lcov',
  dir : 'results/',
  subdir: '.'
};

/**
 	Environement variables to add in Jenkins Build configuration:

 	PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
	PHANTOMJS_BIN=/usr/local/bin/phantomjs

 */