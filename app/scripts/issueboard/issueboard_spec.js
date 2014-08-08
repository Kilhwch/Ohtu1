'use strict';

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
  
  
  describe('multiselect filter', function() {
    it('should filter issues that have no milestone', function() {
      
      var multiselect = ptor.findElement(by.css('.multiSelect'));
      var button = ptor.findElement(by.css('.multiSelectButton'));
      button.click();
      
      var item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'No milestone'), multiselect);
      item.click();
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(4);
    });
    
    it('should filter issues that have a "testlabel" label', function() {
      
      var multiselect = ptor.findElement(by.css('.multiSelect'));
      var button = ptor.findElement(by.css('.multiSelectButton'));
      button.click();
      
      var item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'testlabel'), multiselect);
      item.click();
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(1);
    });
    
  });

  describe('filter', function() {
    xit('should filter excess issues', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(5);

      var elem = element.all((by.css('.textFilter'))).first();
      elem.sendKeys('body2');

      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(1);
    });

    xit('should filter excess issues done', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(5);

      var elem = element.all((by.css('.textFilter'))).first();
      elem.sendKeys('Done');

      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(2);
    });
  });


});

