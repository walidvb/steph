'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Blumer Website', function() {

  beforeEach(function() {
    browser().navigateTo('app/index.html');
  });


  it('should not redirect when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("");
  });


  describe('home', function() {

    beforeEach(function() {
      browser().navigateTo('#/project/super');
    });

    it('should include the menu, with a project link', function(){
      expect(element('.navbar li:first').text()).toMatch(/Projects/)
    })

    it('should include a list of projects', function(){
      expect(element('#projects .project').count()).toBeGreaterThan(2);
    })

    it('should include a list of shows', function(){
      expect(element('#projects .show').count()).toBeGreaterThan(2);
    })

    it('should include the bio', function(){
      expect(element('#bio .bio-line').count()).toBeGreaterThan(2);
    });
    // it('should render a project when user navigates to /project/super', function() {
    //   expect(element('[ng-view] .project-title').text()).
    //     toMatch(/Super/);
    // });

  });

});
