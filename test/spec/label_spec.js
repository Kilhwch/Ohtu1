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
      element(by.id('Labels')).click();
      element(by.model('createlabel.name')).sendKeys('label name');
      $('#sendlabel').click();
      ptor.ignoreSynchronization = true;
      var alert = element(by.id('alert'));
      expect(alert.getText()).toContain("Created label: label name");
      ptor.ignoreSynchronization = false;
    });

    it('should receive correct response when creating a new label as a state', function() {
      element(by.id('add')).click();
      element(by.id('Labels')).click();
      element(by.model('createlabel.name')).sendKeys('label name');
      element(by.model('createlabel.state')).click();
      $('#sendlabel').click();
      ptor.ignoreSynchronization = true;
      var alert = element(by.id('alert'));
      expect(alert.getText()).toContain("Created label: State:label name");
      ptor.ignoreSynchronization = false;
    });

  it('should receive correct response when deleting a new label', function() {
    element(by.id('add')).click();
    element(by.id('Labels')).click();
    //element(by.model('delLabel option[value="0"]')).click();
    $('select#delete').click()
    $('option[value="0"]').click()
    $('#delLabel').click();
    ptor.ignoreSynchronization = true;
    var alert = element(by.id('alert'));
    expect(alert.getText()).toContain("Deletion unsuccessful");
    ptor.ignoreSynchronization = false;
  });

  it('should receive correct response when renaming a new label', function() {
    element(by.id('add')).click();
    element(by.id('Labels')).click();
    $('select#delete').click()
    $('option[value="0"]').click()
    element(by.model('renamelabelname')).sendKeys('Uusi');
    $('#renameLabel').click();
    ptor.ignoreSynchronization = true;
    var alert = element(by.id('alert'));
    expect(alert.getText()).toContain("Rename unsuccessful");
    ptor.ignoreSynchronization = false;
  });

  });

});
