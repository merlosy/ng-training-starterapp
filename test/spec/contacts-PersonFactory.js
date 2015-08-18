(function () {
  'use strict'

  describe('module Contacts', function () {

  	beforeEach(module('myapp'));

    describe('Person Factory', function() {

    	var Person, $q;

    	beforeEach(inject(function( _Person_, _$q_){
    		// The injector unwraps the underscores (_) from around the parameter names when matching
    		Person = _Person_;
    		$q = _$q_;
      
    	}));

      it('doit être undefined par défaut', function () {
        var p = Person.getSelected();
        expect(p).toBeUndefined();
      });

      it('doit être modifiable', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:false};
        Person.setSelected(p);
        var pers = Person.getSelected();
        expect(pers).toEqual(p);
      });

      // false positive
      it('une modification doit déclencher la promise', function () {
        var p = {firstname:'Jimmy', id:'00100', favorite:false};

        Person.onChange().then(null, null, function(pers) {
          expect(pers).toBe(1);
        });

        Person.setSelected(p);
      });
    	
    }); 

  });

})();
