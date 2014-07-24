describe('Listing issues', function() {

  var mockModule = require('../mocked-backend'),
    ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('#/repos/user/repo');
    browser.manage().addCookie('token', 'testing', '/', 'localhost');
  });

  it('should list issues', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.count()).toBe(5);
  });

  it('should show issue.title', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.first().getText()).toContain('# Test tickle');
  });

  it('should show second issue.title', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.get(1).getText()).toContain('Test ready');
  });

  it('should show third issue.title', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.get(2).getText()).toContain('Test inprogress');
  });

  it('should show frouth issue.title', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.get(3).getText()).toContain('Test done');
  });

  it('should show fifth issue.title', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.get(4).getText()).toContain('Test done2');
  });

  xit('should list issues in Done', function() {
    var elems = element.all((by.css('.column4')));
    expect(elems.get(1).getText()).toContain('Test done');
  });

  it('should show issue.body', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.first().getText()).toContain('Test body');
  });

  it('should show owner', function() {
    expect(element(by.css('.viewbar')).getText()).toContain('Owner: ')
  });

  it('should show issue column Backlog', function() {
    var elems = element.all((by.css('.column')));
    expect(elems.first().getText()).toContain('Backlog');
  });

  it('should show issue column Ready', function() {
    var elems = element.all((by.css('.column')));
    expect(elems.get(1).getText()).toContain('Ready');
  });

  it('should show issue column In Progress', function() {
    var elems = element.all((by.css('.column')));
    expect(elems.get(2).getText()).toContain('In Progress');
  });

  it('should show issue column Done', function() {
    var elems = element.all((by.css('.column')));
    expect(elems.get(3).getText()).toContain('Done');
  });

  describe('Issue box', function(){

    it('be in edit mode when first viewing backlog', function(){
      element.all(by.repeater('issue in issues')).each(function(elem){
        expect(elem.element(by.css('.notedit')).getAttribute('class')).not.toContain('ng-hide');
        expect(elem.element(by.css('.edit')).getAttribute('class')).toContain('ng-hide');
      });
    });

    it('should be in edit mode when clicked on', function(){
      var issueElem = element.all(by.repeater('issue in issues')).first();
      issueElem.element(by.css('.notedit')).click();
      expect(issueElem.element(by.css('.notedit')).getAttribute('class')).toContain('ng-hide');
      expect(issueElem.element(by.css('.edit')).getAttribute('class')).not.toContain('ng-hide');      
    });

    it('should edit text of issue in edit mode', function(){
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
