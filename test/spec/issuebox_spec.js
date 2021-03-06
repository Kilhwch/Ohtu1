describe('Issue box', function(){
	
	var mockModule = require('../../app/scripts/mocked-backend'),
		authModule = require('../../app/scripts/mocked-auth'),
    	ptor;

	beforeEach(function() {
		ptor = protractor.getInstance();
		ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
		ptor.addMockModule('auth', authModule.authMock);
	    browser.get('#/logout');
	    $('.login-button').click();
	    browser.get('#/repos/user/repo');
	});

	it('should edit title of issue', function(){
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();

	    element(by.model('editissue.title')).sendKeys("new title");
	    $('#submit').click();
	     
	    var issueHeader = elems.element(by.css('.issueHeader'));
	    expect(issueHeader.getText()).toContain("new title");   
	});

 	it('should edit label', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('labelselect')).click();
	    element(by.id('testlabel')).click();
	    $('#submit').click();

	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('labelselect')).click();
	    expect(element.all(by.css('.glyphicon-ok')).count()).toBe(2);
	    $('#editlabel-close').click();
  	});

  	it('should edit milestone', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('mstonemenu')).click();
	    var item = ptor.findElement(by.cssContainingText('.mstoneoption', 'testi'));
	    item.click();
	    $('#submit').click();

	    var multiselectBtn = ptor.findElement(by.css('.multiSelectButton'));
		multiselectBtn.click();
		var multiselect = ptor.findElement(by.css('.multiSelect'));
		var item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'testi'), multiselect);
		item.click();
	    var elems = element.all(by.repeater('issue in issues'));
	    expect(elems.count()).toBe(1);
  	});

  	it('should remove a milestone from issue', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('mstonemenu')).click();
	    var item = ptor.findElement(by.cssContainingText('.mstoneoption', 'testi'));
	    item.click();
	    $('#submit').click();
	    

	    var multiselectBtn = ptor.findElement(by.css('.multiSelectButton'));
		multiselectBtn.click();
		var multiselect = ptor.findElement(by.css('.multiSelect'));
		var item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'testi'), multiselect);
		item.click();
	    var elems = element.all(by.repeater('issue in issues'));
	    expect(elems.count()).toBe(1);

	    browser.get('#/repos/user/repo');
	    
		elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('mstonemenu')).click();
	    item = ptor.findElement(by.cssContainingText('.mstoneoption', 'Clear'));
	    item.click();
	    $('#submit').click();	

		multiselectBtn = ptor.findElement(by.css('.multiSelectButton'));
		multiselectBtn.click();
		item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'testi'), multiselect);
		item.click(); 
		elems = element.all(by.repeater('issue in issues'));
	    expect(elems.count()).toBe(0);       
  	});

	it('should edit text of issue', function(){
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();

	    element(by.model('editissue.body')).sendKeys("label name");
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
	    element(by.model('data.body')).sendKeys("new comment");
	    $('#comment').click();
	    var divi = element.all(by.css('.panel.panel-default.ng-isolate-scope')).first();
	    var elem = element.all(by.css('.form-control.ng-binding')).first();
	//    divi.getInnerHtml().then(function(data) { console.log(data) });
	   expect(elem.getText()).toContain("Test body");

	});
  
	it('should cancel changes when edit label is canceled', function() {
	    var elems = element.all(by.repeater('issue in issues')).first();
	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('labelselect')).click();
	    element(by.id('testlabel')).click();
	    $('#editlabel-close').click();

	    ptor.actions().mouseMove(elems).perform();
	    elems.element(by.css('.fa.fa-cog')).click();
	    element(by.id('labelselect')).click();
	    expect(element.all(by.css('.glyphicon-ok')).count()).toBe(1);
	    $('#editlabel-close').click();
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
