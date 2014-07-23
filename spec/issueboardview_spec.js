'use strict';

describe('index', function() {

  it('should show title', function() {
      browser.get('/');
      expect(browser.getTitle()).toEqual('Haitari');
  });

  it('should show mainpage', function() {
      browser.get('/#/main');
      expect(browser.getTitle()).toEqual('Haita
