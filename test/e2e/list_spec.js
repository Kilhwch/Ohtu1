describe('Listing repos', function() {

  var mockModule = require('../mocked-backend'),
    prot;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('/');
    browser.manage().addCookie('token', 'testing', '/', 'localhost');
  });

  it('should list repos', function() {
    browser.get('#/list');
    expect(element.all(by.css('.list-group li')).count()).toBe(2);
  });

  it('should show repo.name and repo.description for every repo', function() {
    browser.get('#/list');
    var elems = element.all(by.repeater('repo in repos'));
    expect(elems.first().element(by.css('.list-group li a')).getText()).toBe('Test Repo');
    expect(elems.first().element(by.css('.list-group li p')).getText()).toBe('Test description');
    expect(elems.last().element(by.css('.list-group li a')).getText()).toBe('Testi Reponen');
    expect(elems.last().element(by.css('.list-group li p')).getText()).toBe('Test description X2000 pro');
    
  });
});
