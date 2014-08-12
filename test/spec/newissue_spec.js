describe('Creating issues', function() {

  var mockModule = require('../../app/scripts/mocked-backend'),
      authModule = require('../../app/scripts/mocked-auth'),
      ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    ptor.addMockModule('auth', authModule.authMock);
    browser.get('#/logout');
    $('.login-button').click();
    browser.get('#/repos/user/repo');
  });

  describe('when create', function() {

    it('should receive correct response when creating a new issue', function() {
      element(by.id('add')).click();
      element(by.id('New issue')).click();
      element(by.model('issue.title')).sendKeys('issue title');
      element(by.model('issue.body')).sendKeys('issue body');
      $('#create-issue').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Created issue: issue title");
    });

  });

});
