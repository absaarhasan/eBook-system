'use strict';

describe('BOL app', function() {

  it('should automatically redirect to /1/1 when location hash/fragment is empty', function() {
    browser.get('http://localhost:5000');
    expect(browser.getLocationAbsUrl()).toMatch("/1/1");
  });

/*
  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ui-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
  */

});
