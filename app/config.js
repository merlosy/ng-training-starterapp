(function() {

   'use strict';

   var appModule = angular.module('myapp.constants', []);

	appModule.constant('APP', {
		debugActive: true,

		templatePrefix : '',

   		apiPrefix: '/api',
   		apiVersion: '/'
	});

})();