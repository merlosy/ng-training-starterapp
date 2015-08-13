(function(){
	'use strict'

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
            url: "/contacts",
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

    app.controller('PersonListController', ['$scope', '$log', 'ContactsService', 'Person',
                                    function($scope, $log, ContactsService, Person){
        
        // Initialisation de la vue
        $scope.people = ContactsService.query();

        $scope.addPerson = function (name) {
            var person = {firstname: name};
            $scope.newFriend = '';
            ContactsService.save(person, function(data){
                $log.debug(data);
                // on rappelle le service pour avoir la liste à jour
                $scope.people = ContactsService.query();
            });
            
        };

        $scope.removePerson = function (person) {
            ContactsService.delete({id: person.id}, function(data){
                $log.debug(data);
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

    }]);

    app.controller('PersonDetailsController', ['$scope', '$log', 'Person', 'ContactsService', function($scope, $log, Person, ContactsService){

        $scope.contactMode = 'show';

        $scope.$watch(function(){
                return Person.getSelected();
            }, 
            function (newVal, oldVal) {
                if(newVal!==oldVal) { 
                    $scope.person = newVal;
                    $scope.contactMode = 'show';
                }
            });

        $scope.$watch('contactMode', function(newVal){
            if (newVal==='edit') $scope.editablePerson = angular.copy($scope.person);
        })

        $scope.updateContact = function () {
            ContactsService.update({id: $scope.editablePerson.id}, $scope.editablePerson, function(data){
                Person.setSelected($scope.editablePerson);
                $scope.contactMode = 'show';
            });
        };

    }]);

})();