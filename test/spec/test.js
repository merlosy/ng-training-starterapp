(function () {
  'use strict';

  	describe('Give it some context', function () {

  		beforeEach(module('myapp'));

  		it('should run here few assertions', function () {

	    	expect(true).toBeTruthy();
	    });
  		
	    describe('maybe a bit more context here', function () {
		    it('should run here few assertions', function () {

		    	expect(true).toBeTruthy();
		    });
	    });
  	});
})();
