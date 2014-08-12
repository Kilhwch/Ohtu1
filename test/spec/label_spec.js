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

    it('should receive correct response when creating a new label', function() {
      element(by.id('add')).click();
      element(by.id('New label/Delete label')).click();
      element(by.model('createlabel.name')).sendKeys('label name');
      $('#sendlabel').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Created label: label name");
    });

  it('should receive correct response when deleting a new label', function() {
    element(by.id('add')).click();
    element(by.id('New label/Delete label')).click();
    element(by.model('delLabel')).click();
    $('#delLabel').click();
    var alertDialog = ptor.switchTo().alert();
    alertDialog.accept();
    expect(alertDialog.getText()).toContain("Deletion unsuccessful");
  });

  });

});
