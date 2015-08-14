(function(){
	'use strict';

	var app = angular.module('myapp.contacts.person', []);


	app.service('Person', ['$q', function($q){ 
		var self = this,
        	deferred = $q.defer();

        this.person = undefined;

        this.onChange = function() {
	        return deferred.promise;
	    };

	    this.getSelected = function() {
	        return self.person;
	    };

	    this.setSelected = function(person) {
	        self.person = person;
	        deferred.notify(self.person);
	    };
	}]);

	app.directive('personTile', ['$log', function($log){
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="person-container"><div class="row" >'
            	+'<div class="col-md-12 text-center">{{person.firstname}}</div> '
				+'<div class="col-md-12 btn-group" role="group">'
				+'	<button type="button" class="btn btn-sm btn-default btn-simple" ng-click="eventFavorite(person)">'
				+'		<span class="glyphicon glyphicon-heart"'
				+'			ng-class="{\'text-red\' : person.favorite}">'
				+'		</span>'
				+'	</button>'
				+'	<button class="btn btn-sm btn-primary btn-simple" type="button" ng-click="eventSee(person)"><span class="glyphicon glyphicon-eye-open"></span></buttom>'
				+'	<button class="btn btn-sm btn-danger btn-simple" type="button" ng-click="delete(person)" aria-label="Supprimer" title="Supprimer">'
				+'		<span class="glyphicon glyphicon-remove"></span>'
				+'	</button>'
				+'</div></div></div>',
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