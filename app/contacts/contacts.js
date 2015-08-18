(function(){
	'use strict';

	var app = angular.module('myapp.contacts', [
        'ui.router',
        'myapp.contacts.person',
        'myapp.contacts.services'
    ]);

    app.config(['$stateProvider', 'APP', function($stateProvider, APP){

        $stateProvider.state('templateContacts', {
            'abstract': true,
            templateUrl: APP.templatePrefix+ 'contacts/tpl-contacts.html'
        });

        $stateProvider.state('contacts', {
            url: '/contacts',
            parent: 'templateContacts',
            views : {
                'left' : {
                    templateUrl: APP.templatePrefix+ 'contacts/contacts-list.html'
                },
                'right' : {
                    templateUrl: APP.templatePrefix+ 'contacts/contact-details.html'
                }
            }
        });

    }]);

    app.controller('PersonListController', ['$scope', '$rootScope', '$log', 'ContactsService', 'Person',
                                    function($scope, $rootScope, $log, ContactsService, Person){
        
        // Initialisation de la vue
        $scope.people = ContactsService.query();

        $scope.addPerson = function (name) {
            var person = {firstname: name};
            $scope.newFriend = '';
            ContactsService.save(person, function(data){
                // on rappelle le service pour avoir la liste à jour
                $scope.people = ContactsService.query();
            });
            
        };

        $scope.removePerson = function (person) {
            ContactsService.delete({id: person.id}, function(data){
                // on rappelle le service pour avoir la liste à jour
                $scope.people = ContactsService.query();
            });

            if ( Person.getSelected()!==undefined && Person.getSelected().id===person.id)
                    $scope.seePerson(undefined);
        };

        $scope.toggleFavorite = function (person) {
            person.favorite = !person.favorite;
            ContactsService.update({id: person.id}, person, function(data){

                if ( Person.getSelected()!==undefined && Person.getSelected().id===person.id)
                    $scope.seePerson(person);
            });
        };

        $scope.seePerson = function (person) {
            Person.setSelected(person);
        };

        $rootScope.$on('update-select-person', function(event, person){
            angular.forEach($scope.people, function(item, key){
                if (person.id===item.id)    $scope.people[key] = person;
            });
        });

    }]);

    app.controller('PersonDetailsController', ['$scope', '$rootScope', '$log', 'Person', 'ContactsService', 
                                    function($scope, $rootScope, $log, Person, ContactsService){

        $scope.contactMode = 'show';

        Person.onChange().then(null, null, function(person){
            $scope.person = person;
            $scope.contactMode = 'show';
        });

        $scope.$watch('contactMode', function(newVal){
            if (newVal==='edit') $scope.editablePerson = angular.copy($scope.person);
        });

        $scope.updateContact = function () {
            ContactsService.update({id: $scope.editablePerson.id}, $scope.editablePerson, function(data){
                Person.setSelected($scope.editablePerson);
                $rootScope.$broadcast('update-select-person', $scope.editablePerson);
            });
        };

    }]);

})();