describe('Listing issues', function() {

  var mockModule = require('../mocked-backend'),
      authModule = require('../mocked-auth'),
      ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    ptor.addMockModule('auth', authModule.authMock);
    browser.get('#/logout');
    $('.login-button').click();
    browser.get('#/repos/user/repo');
  });



  it('should list issues', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.count()).toBe(5);
  });

  it('should show issue.body', function() {
    var elems = element.all(by.repeater('issue in issues'));
    expect(elems.first().getText()).toContain('Test body');
  });

  it('should show owner and repository', function() {
    expect(element(by.css('.repoAddress')).getText()).toContain('user/repo');
  });

  describe('correct ammount', function(){
    it('should show issue.title', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.first().getText()).toContain('Test tickle');
    });

    it('should show second issue.title', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.get(1).getText()).toContain('Test ready');
    });

    it('should show third issue.title', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.get(2).getText()).toContain('Test inprogress');
    });

    it('should show fourth issue.title', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.get(3).getText()).toContain('Test done');
    });

    it('should show fifth issue.title', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.get(4).getText()).toContain('Test done2');
    });
  });

  describe('correct place',function(){
    it('should list issues in Backlog', function() {
      var column = element.all((by.css('.backlogbox'))).get(0);
      expect(column.getText()).toContain('Test tickle')
    });

    it('should list issues in Ready', function() {
      var column = element.all((by.css('.readybox'))).get(0);
      expect(column.getText()).toContain('Test ready')
    });

    it('should list issues in In Progress', function() {
      var column = element.all((by.css('.inprogressbox'))).get(0);
      expect(column.getText()).toContain('Test inprogress')
    });
     
    it('should list issues in Done', function() {
      var column = element.all((by.css('.donebox'))).get(0);
      expect(column.getText()).toContain('Test done')
    });

    it('should list issues in Done2', function() {
      var column = element.all((by.css('.donebox'))).get(1);
      expect(column.getText()).toContain('Test done2')
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

  });
 
  describe('when create', function() {

    it('should receive correct response when creating a new issue', function() {
      element(by.id('create')).click();
      element(by.css('#create option[value="0"]')).click();
      element(by.model('issue.title')).sendKeys('issue title');
      element(by.model('issue.body')).sendKeys('issue body');
      $('#create-issue').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Created issue: issue title");
    });
    
    it('should receive correct response when creating a new label', function() {
      element(by.id('create')).click();
      element(by.css('#create option[value="1"]')).click();
      element(by.model('createlabel.name')).sendKeys('label name');
      $('#sendlabel').click();
      var alertDialog = ptor.switchTo().alert();
      alertDialog.accept();
      expect(alertDialog.getText()).toContain("Created label: label name");
    });
  });

  describe('Issue box', function(){

    it('should edit label of issue', function(){
        var backlog = element.all((by.css('.backlogbox'))).get(0);
        expect(backlog.getText()).toContain('Test tickle')
        var issueElem = element.all(by.repeater('issue in issues')).first();
        var notEdit = issueElem.element(by.css('.notedit'));
        notEdit.click();
        issueElem.element(by.id('labels')).click();
        issueElem.element(by.css('#labels option[value="0"]')).click();
        var done = element.all((by.css('.donebox'))).get(0);
        expect(done.getText()).toContain('Test tickle');
    });

    it('should not be in edit mode when first viewing backlog', function(){
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

    it('should edit text of issue in edit mode after pressing submit button', function(){

      var issueElem = element.all(by.repeater('issue in issues')).first();
      var notEdit = issueElem.element(by.css('.notedit'));
      notEdit.click();
      var input = issueElem.element(by.model('issue.editingbody'));
      input.sendKeys('HODOR');

      var submitBtn = issueElem.element(by.css('#submit'));
      submitBtn.click();

      issueElem.all(by.css('.notedit p')).last().getInnerHtml().then(function(text){
        expect(text).toContain('HODOR');
      });

    });

    it('should edit text of issue in edit mode after pressing enter', function(){

      var issueElem = element.all(by.repeater('issue in issues')).first();
      var notEdit = issueElem.element(by.css('.notedit'));
      notEdit.click();
      var input = issueElem.element(by.model('issue.editingbody'));
      input.sendKeys('HODOR\n');

      expect(issueElem.all(by.css('.notedit p')).last().getText()).toContain('HODOR');

    });

    it('should not edit text of issue after pressing cancel in edit mode', function(){

      var issueElem = element.all(by.repeater('issue in issues')).first();
      var notEdit = issueElem.element(by.css('.notedit'));
      notEdit.click();
      var input = issueElem.element(by.model('issue.editingbody'));
      input.sendKeys('HODOR');
      
      var cancelBtn = issueElem.element(by.css('#cancel'));
      cancelBtn.click();

      issueElem.all(by.css('.notedit p')).last().getInnerHtml().then(function(text){
        expect(text).not.toContain('HODOR');
      });

    });

  });

});

