describe('Listing repos', function() {

  var mockModule = require('../mocked-backend'),
    prot;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('http://localhost:9001');
    browser.manage().addCookie('token', 'testing', '/', 'localhost');
  });

  it('should list repos', function() {
    browser.get('#/list');
    expect(element.all(by.css('.list-group li')).count()).toBe(1);
  });

  it('should show repo.name and repo.description', function() {
    browser.get('#/list');
    expect(element(by.css('.list-group li a')).getText()).toBe('Test Repo');
    expect(element(by.css('.list-group li p')).getText()).toBe('Test description');
  });
  
  it('should display owner and repo correctly', function() {
    //kovakooditesti
    browser.get('#/repos/Kilhwch/Ohtu1');
    var owner = element(by.binding('params.owner'));
    var repo = element(by.binding('params.repoName'));
    expect(owner.getText()).toEqual('Kilhwch');
    expect(repo.getText()).toEqual('Ohtu1');
  
  });
  
  

});
