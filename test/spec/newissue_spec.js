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
      element(by.id('Issues')).click();
      element(by.model('issue.title')).sendKeys('issue title');
      element(by.model('issue.body')).sendKeys('issue body');
      element(by.css('.milestones option[value="0"]')).click();
      element(by.id('labelselect')).click();
      element(by.id('testlabel')).click();
      $('#create-issue').click();
      ptor.ignoreSynchronization = true;
      var alert = element(by.id('alert'));
      expect(alert.getText()).toContain("Created issue: issue title");
      ptor.ignoreSynchronization = false;
    });

  });

});
