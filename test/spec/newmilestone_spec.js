describe('Creating milestones', function() {

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

    it('should receive correct response when creating a new milestone', function() {
      $('#add').click();
      element(by.id('Milestones')).click();
      element(by.model('milestone.title')).sendKeys('milestone title');
      element(by.model('milestone.description')).sendKeys('milestone description');
      element(by.model('milestone.due_on')).sendKeys('milestone due on');
      $('#newmilestone-create').click();
      ptor.ignoreSynchronization = true;
      var alert = element(by.id('alert'));
      expect(alert.getText()).toContain("Created milestone: milestone title");
      ptor.ignoreSynchronization = false;
    });

  });

  xdescribe('when delete', function() {

    it('should receive correct response when deleting a new milestone', function() {
      $('#add').click();
      element(by.id('Milestones')).click();
      $('select#delete').click()
      $('option[value="0"]').click()
      $('#milestone-delete').click();
      ptor.ignoreSynchronization = true;
      var alert = element(by.id('alert'));
      expect(alert.getText()).toContain("Deleted milestone: testi");
      ptor.ignoreSynchronization = false;
    });

  });

});
