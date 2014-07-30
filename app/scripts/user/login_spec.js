describe('Login', function() {
    var authModule = require('../mocked-auth'),
        prot;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.addMockModule('auth', authModule.authMock)
    });

    afterEach(function() {
      browser.clearMockModules();
    });

    it('has a title', function() {
      browser.get('#/logout');
      $('.login-button').click();
      browser.get('#/list');
      expect(browser.getCurrentUrl()).toContain('#/list');
    });
});
