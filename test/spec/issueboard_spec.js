'use strict';

describe('Listing issues', function() {

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

  xdescribe('drag n drop', function() {
  
    it('should drag n drop', function() {
      var element1 = element.all(by.id('donebox')).first();
      var element2 = element.all(by.id('readybox')).first();
      var checkT = element1.getText();
    
      ptor.actions().dragAndDrop(
        element1,
        element2
      ).perform();

   //   browser.pause();
      var checkE = element.all(by.id('readybox')).last();
      expect(checkE.getText()).toContain(checkT);

    });

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
    it('should filter excess issues', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(5);

      var elem = element.all((by.css('.textFilter'))).first();
      elem.sendKeys('body2');

      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(1);
    });

    it('should filter excess issues done', function() {
      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(5);
      var elem = element.all((by.css('.textFilter'))).first();
      elem.sendKeys('Done');

      var elems = element.all(by.repeater('issue in issues'));
      expect(elems.count()).toBe(2);
    });
  });

  describe('assignee', function() {
    it('should not have any to begin with', function() {
      var elem = element.all(by.repeater('issue in issues')).first();
      expect(elem.element(by.css('.avatar-img')).isDisplayed()).toBe(false);
      expect(elem.element(by.id('assignee')).isDisplayed()).toBe(true); 
    });

    it('should have assignee when assigned', function() {
      var elem = element.all(by.repeater('issue in issues')).first();
      elem.element(by.id('assignee')).click();
      elem.element(by.css('.assignee-1')).click();
      expect(elem.element(by.css('.avatar-img')).isDisplayed()).toBe(true);
      expect(elem.element(by.id('assignee')).isDisplayed()).toBe(false);
    });

    it('should clear assignee', function() {
      var elem = element.all(by.repeater('issue in issues')).first();
      elem.element(by.id('assignee')).click();
      elem.element(by.css('.assignee-1')).click();
      elem.element(by.css('.avatar-img')).click();
      elem.element(by.css('.clear-assignee')).click();
      expect(elem.element(by.css('.avatar-img')).isDisplayed()).toBe(false);
      expect(elem.element(by.id('assignee')).isDisplayed()).toBe(true); 
    });
  });


});

