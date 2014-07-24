describe('Listing issues', function() {

  var mockModule = require('../mocked-backend'),
    ptor;

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

  describe('Issue box', function(){

    it('be in edit mode when first viewing backlog', function(){
      browser.get('#/repos/user/repo');
      element.all(by.repeater('issue in issues')).each(function(elem){
        expect(elem.element(by.css('.notedit')).getAttribute('class')).not.toContain('ng-hide');
        expect(elem.element(by.css('.edit')).getAttribute('class')).toContain('ng-hide');
      });
    });

    it('should be in edit mode when clicked on', function(){
      browser.get('#/repos/user/repo');
      var issueElem = element.all(by.repeater('issue in issues')).first();
      issueElem.element(by.css('.notedit')).click();
      expect(issueElem.element(by.css('.notedit')).getAttribute('class')).toContain('ng-hide');
      expect(issueElem.element(by.css('.edit')).getAttribute('class')).not.toContain('ng-hide');      
    });

    it('should edit text of issue in edit mode', function(){
      browser.get('#/repos/user/repo');
      var issueElem = element.all(by.repeater('issue in issues')).first();
      var notEdit = issueElem.element(by.css('.notedit'));
      notEdit.click();
      var input = issueElem.element(by.model('issue.body'));
      input.sendKeys('HODOR');
      //notEdit.sendKeys(protractor.Key.Enter);
      issueElem.all(by.css('.notedit p')).last().getInnerHtml().then(function(text){
        expect(text).toContain('HODOR');
      });    
    });

  });

});
