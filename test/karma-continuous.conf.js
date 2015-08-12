singleRun = true;
reporters = ['dots', 'junit'];

plugins = [
  'karma-junit-reporter'
};

browsers = ['PhantomJS'];

junitReporter = {
  outputFile: 'test-results-continuous.xml'
};

/**
 	Environement variables to add in Jenkins Build configuration:

 	PHANTOMJS_BIN=/usr/lib/node_modules/phantomjs/lib/phantom/bin/phantomjs

 */
