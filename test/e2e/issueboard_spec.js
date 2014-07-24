describe('Listing issues', function() {

  var mockModule = require('../mocked-backend'),
    prot;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('/');
    browser.manage().addCookie('token', 'testing', '/', 'localhost');
  });

  it('should list issues', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.count()).toBe(1);
  });

  it('should show issue.title', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.first().getText()).toBe('# Test tickle');
  });

  it('should show owner', function() {
    browser.get('#/repos/user/repo');
    expect(element(by.css('.viewbar')).getText()).toContain('Owner: ')
  });

  it('should show issue labels Backlog', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all((by.css('.column')));
    expect(elems.first().getText()).toContain('Backlog');
  });

  it('should show issue labels Ready', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all((by.css('.column')));
    expect(elems.get(1).getText()).toContain('Ready');
  });

  it('should show issue labels In Progress', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all((by.css('.column')));
    expect(elems.get(2).getText()).toContain('In Progress');
  });

  it('should show issue labels Done', function() {
    browser.get('#/repos/user/repo');
    var elems = element.all((by.css('.column')));
    expect(elems.get(3).getText()).toContain('Done');
  });


});
