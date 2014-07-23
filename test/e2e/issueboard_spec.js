describe('Listing issues', function() {

  var mockModule = require('../mocked-backend'),
    prot;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('http://localhost:38765');
    browser.manage().addCookie('token', 'testing', '/', 'localhost');
  });

  xit('should list issues', function() {
    browser.get('#/issueboard');
    expect(element.all(by.css('.ng-scope')).count()).toBe(1);
  });

  xit('should show repo.name and repo.description', function() {
    browser.get('#/issueboard');
    expect(element(by.css('.ng-scope')).getText()).toBe('Test title');
    expect(element(by.css('.ng-scope')).getText()).toBe('Test body');
  });

});
