describe('logging in', function() {
  it('should redirect to main after login', function() {
    browser.get('#/login');
    element(by.css('.login')).click();
    expect(browser.getCurrentUrl()).toContain('#/main');
  });

  it('should redirect to login after signing out', function() {
    browser.get('#/logout');
    expect(browser.getCurrentUrl()).toContain('#/login');
  });

});
