(function(){
	'use strict'

	var app = angular.module('myapp.contacts.person', []);


	app.factory('Person', ['$log', function($log){ 
		var person = undefined;
		return {
			getSelected : function() {
				return person;
			},
			setSelected : function(p) {
				person = p;
			}
		};
	}]);

	app.directive('person', ['$log', function($log){
        return {
            restrict: 'E',
            template: '<div><p>{{person.firstname}}</p></div>',
        };
    }]);

})();