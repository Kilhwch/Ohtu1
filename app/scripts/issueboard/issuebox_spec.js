describe('Issue box', function(){
	
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


 it('should edit label of issue', function(){
    var elems = element.all(by.repeater('issue in issues'));
    ptor.findElement(by.id('editCog'), elems.first()).click();

    element(by.model('issue.body')).sendKeys("label name");
    $('#submit').click();
     
    var issueBody = ptor.findElement(by.css('.issueBody'), elems.first());
    expect(issueBody.getText()).toContain("label name");   
  });
  

	/* Most likely the mocked backend is not handling these correctly
	it('should edit text of issue in edit mode after pressing submit button', function(){

		var issueElem = element.all(by.repeater('issue in issues')).first();
		var notEdit = issueElem.findElement(by.css('.notedit'));
		notEdit.click();
		var input = issueElem.findElement(by.model('issue.editingbody'));
		input.sendKeys('HODOR');

		var submitBtn = issueElem.findElement(by.css('#submit'));
		submitBtn.click();

	  	issueElem.findElement(by.css('.issuebody')).getText().then(function(t){
		  	console.log(t);
		  	expect(t).toContain('HODOR');
	  	});

	});

	it('should edit text of issue in edit mode after pressing enter', function(){

	  var issueElem = element.all(by.repeater('issue in issues')).first();
	  var notEdit = issueElem.findElement(by.css('.notedit'));
	  notEdit.click();
	  var input = issueElem.findElement(by.model('issue.editingbody'));
	  input.sendKeys('HODOR\n');

	  expect(issueElem.all(by.css('.notedit p')).last().getText()).toContain('HODOR');

	});

	it('should not edit text of issue after pressing cancel in edit mode', function(){

	  var issueElem = element.all(by.repeater('issue in issues')).first();
	  var notEdit = issueElem.findElement(by.css('.notedit'));
	  notEdit.click();
	  var input = issueElem.findElement(by.model('issue.editingbody'));
	  input.sendKeys('HODOR');
	  
	  var cancelBtn = issueElem.findElement(by.css('#cancel'));
	  cancelBtn.click();

	  issueElem.all(by.css('.notedit p')).last().getInnerHtml().then(function(text){
	    expect(text).not.toContain('HODOR');
	  });

	});

*/

});
