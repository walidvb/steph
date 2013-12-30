'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  describe('Project Controller', function(){
  	var scope ,ctrl, $httpBackend;
  	//instantiate fake backend
  	beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/works.json').
          respond([{title: 'super'}, {title: 'super2'}, {title: 'super3'}]);

      scope = $rootScope.$new();
      ctrl = $controller('projectListCtrl', {$scope: scope});
    }));


	  it('should fetch some projects', inject(function() {
	    expect(scope.projects).toBeEqualData([]);
	    //return the promise
	    $httpBackend.flush();
	    expect(scope.projects.length).toBe(3);
	  }));
});

  it('should ....', inject(function() {
    //spec body
  }));
});
