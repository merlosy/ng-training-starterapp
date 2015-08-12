(function(){

	'use strict';

	var app = angular.module('myapp', [
        // vendor modules
		'ui.router',
		//'ngCookies',
        'ui.bootstrap',
        'ngSanitize',
        // application modules
        'myapp.constants',
        'myapp.home',
        'myapp.contacts',
        'myapp.security'
    ]);

    app.config(['$stateProvider', '$logProvider', '$urlRouterProvider','APP',
                             function ($stateProvider, $logProvider, $urlRouterProvider, APP) {
        
    	$logProvider.debugEnabled(APP.debugActive);
    	
    	$stateProvider.state('home', {
    		url: "/",
    		views : {
    			'' : {
    				templateUrl: 'home/home.html'
    			}
    		}
    	});
    	    	
        $urlRouterProvider.otherwise('/');
        
    }]);

    app.controller('MainController', ['$scope', '$log', function($scope, $log){
        $log.debug("MainController");

        $scope.isEmpty = function(str) {
            return angular.isUndefined(str) || str==null || str=="" ; 
        };

    }]);

    
})();