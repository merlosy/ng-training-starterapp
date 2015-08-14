(function () {
  'use strict'

  describe('module Contacts', function () {

  	beforeEach(module('myapp'));

    describe('PersonListController', function() {

    	var controller, Person, scope, $rootScope, 
    		ContactsService, $q;

    	beforeEach(inject(function( $controller, _$rootScope_, _Person_, _$q_){
    		// The injector unwraps the underscores (_) from around the parameter names when matching
    		Person = _Person_;
    		$rootScope = _$rootScope_;
    		$q = _$q_;

    		scope = $rootScope.$new();

    		ContactsService = jasmine.createSpyObj('ContactsService', ['save', 'query', 'update']);
    		ContactsService.query.and.returnValue($q.when({}));
        ContactsService.save.and.returnValue($q.when({}));
    		ContactsService.update.and.returnValue($q.when({}));

    		controller = $controller('PersonListController', {
    			'$scope' : scope, 
    			'ContactsService' : ContactsService,
    			'Person' : Person,
    			'$q' : $q
    		});
    	}));

      it('doit créer le controller et créer la liste de contacts', function () {
        expect(controller).toBeDefined();
    		expect(ContactsService.query).toHaveBeenCalled();
        // expect(ContactsService.query.callCount).toBe(1);
        expect(scope.people).toBeDefined();
      });

      it('ajouter une personne doit appeler le service', function () {
        var p = {firstname:"Jimmy"}
        scope.addPerson(p);
        expect(ContactsService.save).toHaveBeenCalled();
        // expect(ContactsService.save.callCount).toBe(1);
      });

      it('toggleFavorite doit enlever des favoris', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:true}
        scope.toggleFavorite(p);
        expect(p.favorite).toBeFalsy();
      });

      it('toggleFavorite doit ajouter aux favoris', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:false}
        scope.toggleFavorite(p);
        expect(p.favorite).toBeTruthy();
      });

      it('toggleFavorite doit appeler le service', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:true}
        scope.toggleFavorite(p);
        expect(ContactsService.update).toHaveBeenCalled();
        // expect(ContactsService.update).toHaveBeenCalledWith({id:p.id}, p, function(){});
      });
    	
      /*describe('maybe a bit more context here', function () {
        it('should run here few assertions', function () {

        	expect(true).toBeTruthy();
        });
      });*/
    });

  });

})();
