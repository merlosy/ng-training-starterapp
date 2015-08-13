(function(){
	'use strict'

	var app = angular.module('myapp.contacts.services', ['ngResource']);

    /*
        https://code.angularjs.org/1.3.17/docs/api/ngResource/service/$resource
    */
    app.factory('ContactsService', ['$log', '$resource', 
            function($log, $resource){

        var API_URL = 'http://localhost:2403/people';
        return $resource(API_URL+'/:id', null,
            {
                'update': { method:'PUT' }
            }
        );
        
    }]);

})();