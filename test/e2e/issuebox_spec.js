describe('Issue box', function(){
	
	var mockModule = require('../mocked-backend'),
    ptor;

	beforeEach(function() {
		ptor = protractor.getInstance();
		ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
		browser.get('#/repos/user/repo');
		browser.manage().addCookie('token', 'testing', '/', 'localhost');
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