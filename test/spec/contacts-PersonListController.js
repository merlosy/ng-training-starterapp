(function () {

  	describe('module Contacts', function () {

  		beforeEach(module('myapp'));

  		var controller, Person, scope, $rootScope, 
  			ContactsService, $q;

  		beforeEach(inject(function( $controller, _$rootScope_, _Person_, _$q_){
    		// The injector unwraps the underscores (_) from around the parameter names when matching
    		Person = _Person_;
    		$rootScope = _$rootScope_;
    		$q = _$q_;

    		scope = $rootScope.$new();

    		ContactsService = jasmine.createSpyObj('ContactsService', ['save', 'query']);
			ContactsService.query.and.returnValue($q.when({}));
			ContactsService.save.and.returnValue($q.when({}));

			controller = $controller('PersonListController', {
				'$scope' : scope, 
				'ContactsService' : ContactsService,
				'Person' : Person,
				'$q' : $q
			});
  		}));

  		it('PersonListController exists', function () {

  			expect(controller).toBeDefined();
	    });
  		
	    /*describe('maybe a bit more context here', function () {
		    it('should run here few assertions', function () {

		    	expect(true).toBeTruthy();
		    });
	    });*/
  	});
})();
