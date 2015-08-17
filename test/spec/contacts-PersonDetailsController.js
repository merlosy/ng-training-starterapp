(function () {
  'use strict'

  describe('module Contacts', function () {

  	beforeEach(module('myapp'));

    describe('PersonDetailsController', function() {

    	var controller, Person, scope, $rootScope, 
    		ContactsService, $q;

    	beforeEach(inject(function( $controller, _$rootScope_, _Person_, _$q_){
    		// The injector unwraps the underscores (_) from around the parameter names when matching
    		Person = _Person_;
    		$rootScope = _$rootScope_;
    		$q = _$q_;

    		scope = $rootScope.$new();

    		ContactsService = jasmine.createSpyObj('ContactsService', ['update']);
        ContactsService.update.and.returnValue($q.when({}));

        spyOn($rootScope, '$broadcast');

    		controller = $controller('PersonDetailsController', {
    			'$scope' : scope, 
    			'ContactsService' : ContactsService,
    			'Person' : Person,
    			'$q' : $q
    		});
    	}));

      it('doit créer le controller et le mode d\'affichage', function () {
        expect(controller).toBeDefined();
    		expect(ContactsService.update).toBeDefined();
        expect(scope.contactMode).toBeDefined();
        expect(scope.person).toBeUndefined();
        expect(scope.editablePerson).toBeUndefined();
        expect(scope.contactMode).toEqual('show');

        expect(scope.updateContact).toBeDefined();
      });

      it('doit mettre à jour la personne selectionnée dans le scope', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:false};
        var setAsyncSelected = function(p){
          var deffered = $q.defer();
          Person.setSelected(p);
          return deffered.promise;
        };
        expect(scope.person).toBeUndefined();
        setAsyncSelected(p).then(function(){
          expect(scope.person).toEqual(p);
        });
      });

      it('doit mettre à jour la personne éditable dans le scope', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:false};
        var setAsyncSelected = function(p){
          var deffered = $q.defer();
          Person.setSelected(p);
          return deffered.promise;
        };
        setAsyncSelected(p).then(function(){
          scope.contactMode = 'edit';
          scope.$digest();
          expect(scope.editablePerson).toEqual(p);
        });
      });

      it('doit mettre à jour la personne après édition', function () {
        scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
        scope.updateContact();
        expect(ContactsService.update).toHaveBeenCalled();
        expect(ContactsService.update.calls.count()).toEqual(1);
        expect(ContactsService.update.calls.argsFor(0)[0]).toEqual({id:scope.editablePerson.id});
        expect(ContactsService.update.calls.argsFor(0)[1]).toEqual(scope.editablePerson);
      });

      it('doit mettre à jour la personne sélectionnée après appel service', function () {
        scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
        var asyncUpdateContact = function(){
          var deffered = $q.defer();
          scope.updateContact();
          return deffered.promise;
        };
        asyncUpdateContact().then(function(){
          expect(scope.person).toEqual(scope.editablePerson);
        });

      });

      it('doit emettre la mise à jour après appel service', function () {
        scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
        var asyncUpdateContact = function(){
          var deffered = $q.defer();
          scope.updateContact();
          return deffered.promise;
        };
        asyncUpdateContact().then(function(){
          expect($rootScope.$broadcast).toHaveBeenCalled();
          expect($rootScope.$broadcast).toHaveBeenCalledWith('update-select-person', scope.editablePerson);
        });

      });
    	
    });

  });

})();
