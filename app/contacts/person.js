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

	app.directive('personTile', ['$log', function($log){
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="person-container">{{person.firstname}} '
				+'<button type="button" class="btn btn-xs btn-default btn-simple" ng-click="eventFavorite(person)">'
				+'	<span class="glyphicon glyphicon-heart"'
				+'		ng-class="{\'text-red\' : person.favorite}">'
				+'	</span>'
				+'</button>'
				+'<button class="btn btn-xs btn-primary" type="button" ng-click="eventSee(person)">Voir</a>'
				+'<button class="btn btn-xs btn-danger" type="button" ng-click="delete(person)" aria-label="Supprimer" title="Supprimer">'
				+'	<span class="glyphicon glyphicon-remove"></span>'
				+'</button></div>',
			scope : {
				person : '=',
				eventSee : '&onSee',
				eventFavorite : '&onFavorite',
				eventDelete : '&onDelete'
			},
			link : function (scope, element, attrs, ctrl){

				scope.delete = function(person) {
					if (confirm("Êtes-vous sûr de vouloir supprimer "+person.firstname+"?"))
						scope.eventDelete(person);
				};
			}
        };
    }]);

})();