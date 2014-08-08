describe('Creating milestones', function() {

  var mockModule = require('../../mocked-backend'),
      authModule = require('../../mocked-auth'),
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

    it('should receive correct response when creating a new milestone', function() {
      $('#add').click();
      element(by.id('New milestone')).click();
      element(by.model('milestone.title')).sendKeys('milestone title');
      element(by.model('milestone.description')).sendKeys('milestone description');
      element(by.model('milestone.due_on')).sendKeys('milestone due on');
      $('#newmilestone-create').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Created milestone: milestone title");
    });

  });

  describe('when delete', function() {

    it('should receive correct response when deleting a new milestone', function() {
      $('#add').click();
      element(by.id('Delete milestone')).click();
      $('select#delete').click()
      $('option[value="0"]').click()
      browser.sleep(1000)
      $('#milestone-delete').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Deleted milestone: testi");
    });

  });

});
