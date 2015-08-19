(function () {
  'use strict'

  describe('module Contacts', function () {

  	beforeEach(module('myapp'));

    describe('PersonDetailsController', function() {

    	var controller, Person, scope, $rootScope, $timeout, $httpBackend,
    		ContactsService, $q;

      var p;
      var setAsyncSelected = function() {
        $timeout(function(){
          p = {firstname:'Jimmy', id:'00100', favorite:false};
          Person.setSelected(p);
        }, 1000);
      };

      // var asyncChangedSelected = function() {
      //   var deffered = $q.defer();
      //   deffered.promise.then(function(){
      //     return Person.onChange().then(null, null, function(person){
      //       return person;
      //     });
      //   });
      //   return deffered.promise;
      // };

      // var asyncUpdateContact = function(scope) {
      //   $q.when().then(function(){
      //     scope.updateContact();
      //   });
      // };

    	beforeEach(inject(function( $controller, _$rootScope_, _Person_, _$q_, _$timeout_, _$httpBackend_){
    		// The injector unwraps the underscores (_) from around the parameter names when matching
    		Person = _Person_;
    		$rootScope = _$rootScope_;
    		$q = _$q_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;

    		scope = $rootScope.$new();

    		ContactsService = jasmine.createSpyObj('ContactsService', ['update']);
        // ContactsService.update.and.returnValue($q.when({}));
        // ContactsService = {
        //   update: function(){
        //         var deferred = $q.defer();
        //         deferred.resolve({
        //             success: true
        //         });
        //         return deferred.promise;
        //     }
        // };
        // spyOn(ContactsService, 'update').and.callThrough();

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

      it('doit créer le controller et ne pas appeler de service par défaut', function () {
        expect(ContactsService.update).not.toHaveBeenCalled();
      });

      it('doit mettre à jour la personne selectionnée dans le scope', function () {
        setAsyncSelected();
        expect(scope.person).toBeUndefined();
        $timeout.flush();
        expect(scope.person).toEqual(p);
      });

      it('doit mettre à jour la personne éditable dans le scope', function () {
        setAsyncSelected();
        $timeout.flush();
        scope.contactMode = 'edit';
        scope.$digest();
        expect(scope.editablePerson).toEqual(p);
      });

      it('ne doit pas mettre à jour la personne éditable dans le scope', function () {
        setAsyncSelected();
        $timeout.flush();
        scope.contactMode = 'blah';
        scope.$digest();
        expect(scope.editablePerson).not.toEqual(p);
      });

      it('doit mettre à jour la personne après édition', function () {
        scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
        scope.updateContact();
        expect(ContactsService.update).toHaveBeenCalled();
        expect(ContactsService.update.calls.count()).toEqual(1);
        expect(ContactsService.update.calls.argsFor(0)[0]).toEqual({id:scope.editablePerson.id});
        expect(ContactsService.update.calls.argsFor(0)[1]).toEqual(scope.editablePerson);
      });

      // false positive
      it('doit mettre à jour la personne sélectionnée après appel service');
      // it('doit mettre à jour la personne sélectionnée après appel service', function () {
      //   var p = null;
      //   spyOn(Person, 'setSelected').and.callThrough();
      //   scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
      //   scope.updateContact();
      //   // asyncChangedSelected().then(function(pers){
      //   //   console.log(pers);
      //   //   p = pers; 
      //   // });
      //   //$rootScope.$apply();
      //   //$httpBackend.flush();
      //   scope.$digest();
      //   expect(Person.setSelected).toHaveBeenCalled();
      //   expect($rootScope.$broadcast).toHaveBeenCalled();
      //   //expect(scope.person).toEqual(scope.editablePerson);
      // });

      // false positive 
      it('doit emettre la mise à jour après appel service');
      // it('doit emettre la mise à jour après appel service', function () {
      //   scope.editablePerson = {firstname:'Jim', id:'00100', favorite:true, lastname: 'Ramsay'};
      //   var asyncUpdateContact = function(){
      //     var deffered = $q.defer();
      //     scope.updateContact();
      //     return deffered.promise;
      //   };
      //   asyncUpdateContact().then(function(){
      //     expect($rootScope.$broadcast).toHaveBeenCalled();
      //     expect($rootScope.$broadcast).toHaveBeenCalledWith('update-select-person', scope.editablePerson);
      //   });
      // });
    	
    });

  });

})();
