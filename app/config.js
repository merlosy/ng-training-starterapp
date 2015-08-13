(function() {

   'use strict';

   var appModule = angular.module('myapp.constants', []);

	appModule.constant('APP', {
		debugActive: false,

		templatePrefix : '',

   		apiPrefix: '/api',
   		apiVersion: '/'
	});

})();