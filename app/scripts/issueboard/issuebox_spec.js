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


	it('should edit text of issue', function(){
		var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();

	    element(by.model('issue.body')).sendKeys("label name");
	    $('#submit').click();
	     
	    var issueBody = elems.element(by.css('.issueBody'));
	    expect(issueBody.getText()).toContain("label name");   
	});

	it('should add comment', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	// model = issue.labels
	// button id = submit
	    element(by.css('.pull-right.glyphicon.ng-scope.glyphicon-chevron-right')).click();
	    element(by.model('body')).sendKeys("new comment");
	    $('#comment').click();
	    var divi = element.all(by.css('.panel.panel-default.ng-isolate-scope')).first();
	    var elem = divi.element(by.css('.form-control.ng-binding'));
	//    divi.getInnerHtml().then(function(data) { console.log(data) });
	   expect(elem.getText()).toContain("Test body");

	});

 	it('should edit label', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.css('.labels option[value="1"]')).click();
	    $('#submit').click();
	    var cols = element.all(by.css('.column')).get(3);
	    ptor.sleep(1000);
	    var newElem = cols.element(by.repeater('issue in issues'));
	    expect(newElem.getText()).toContain("Test tickle")

  	});

  	it('should edit milestone', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.css('.milestones option[value="0"]')).click();
	    $('#submit').click();
	    var cols = element.all(by.css('.column')).get(3);
	    ptor.sleep(1000);

	    var elem = element.all((by.css('.textFilter'))).first();
	    elem.sendKeys('testi');
	    ptor.sleep(5000);
	    var elems = element.all(by.repeater('issue in issues'));
	    expect(elems.count()).toBe(2);

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
