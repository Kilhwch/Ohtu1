describe('Listing repos', function() {

  var mockModule = require('../../app/scripts/mocked-backend'),
      authModule = require('../../app/scripts/mocked-auth'),
      prot;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    ptor.addMockModule('auth', authModule.authMock);
    browser.get('#/logout');
    $('.login-button').click();
    browser.get('#/list');
  });

  it('should list repos', function() {
    expect(element.all(by.css('.list-group a')).count()).toBe(2);
  });

  it('should show repo.name and repo.description for every repo', function() {
    var elems = element.all(by.repeater('repo in repos'));
    expect(elems.first().element(by.css('.list-group a h4')).getText()).toBe('Test Repo');
    expect(elems.first().element(by.css('.list-group a p')).getText()).toBe('Test description');
    expect(elems.last().element(by.css('.list-group a h4')).getText()).toBe('Testi Reponen');
    expect(elems.last().element(by.css('.list-group a p')).getText()).toBe('Test description X2000 pro');
  });

  it('should show owner and repo when searched', function() {
    element(by.css('.owner')).sendKeys("Kilhwch");
    element(by.css('.repo')).sendKeys("Ohtu1");
    expect(element(by.id('searchlink')).getText()).toBe('Kilhwch/Ohtu1');
  });

  it('should show owner when searched', function() {
    element(by.css('.owner')).sendKeys("Kilh");
    expect(element(by.id('searchlink')).getText()).toBe('Kilh/');
  });
});
