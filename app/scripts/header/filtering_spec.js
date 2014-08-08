'use strict';

describe('Filtering', function() {

	var httpBackendMock = function() {
    angular.module('httpBackendMock', ['ngMockE2E', 'ohtuProjektiAppApp'])
      .run(function($httpBackend) {
        var list =  /https:\/\/api\.github\.com\/user\/repos/;
        var issueboard = /https:\/\/api\.github\.com\/repos\/user\/repo\/issues/;
        var labels = /https:\/\/api\.github\.com\/repos\/user\/repo\/labels/;
        var milestones = /https:\/\/api\.github\.com\/repos\/user\/repo\/milestones/;

        var issue = {number: 1, title: 'Issue Alpha', body:'Shem', milestone: null};
        var issue2 = {number: 1, title: 'Issue Beta', body:'Ham', milestone: null , 'labels':[{'name':'Ready','color': 'f29513'}] };
        var issue3 = {number: 1, title: 'Issue Gamma', body:'Jahpheth', milestone: null , 'labels':[{'name':'InProgress','color': 'f29513'}] };

        $httpBackend.whenGET(issueboard).respond([issue, issue2, issue3]);

        $httpBackend.whenGET(/.*/).passThrough();
      })
  	};


	var authModule = require('../mocked-auth'),
		ptor;

	beforeEach(function() {
		ptor = protractor.getInstance();
		ptor.addMockModule('httpBackendMock', httpBackendMock);
		ptor.addMockModule('auth', authModule.authMock);
		browser.get('#/logout');
		$('.login-button').click();
		browser.get('#/repos/user/repo');
	});

	describe('by text input', function(){

		it('should be empty when first entering repository view', function(){
			var elem = ptor.findElement(by.css('.textFilter'));
			expect(elem.getText()).toEqual("");
		});

		it('should not be filtering any issues when first entering repository view', function() {
			var elems = element.all(by.repeater('issue in issues'));
			expect(elems.count()).toBe(3);
	    });

	    it('should filter by body', function() {
	    	var elem = ptor.findElement(by.css('.textFilter'));
			elem.sendKeys('Shem');

			var elems = element.all(by.repeater('issue in issues'));
			expect(elems.count()).toBe(1);

			var issueBody = ptor.findElement(by.css('.issueBody'), elems.first());
			expect(issueBody.getText()).toContain("Shem");
	    });

	    it('should filter by title', function() {
			var elem = ptor.findElement(by.css('.textFilter'));
			elem.sendKeys('Issue');

			var elems = element.all(by.repeater('issue in issues'));
			expect(elems.count()).toBe(3);

			elem.clear();
			elem.sendKeys('Alpha');

			expect(elems.count()).toBe(1);

			var issueHeader = ptor.findElement(by.css('.issueHeader'), elems.first());
			expect(issueHeader.getText()).toContain("Alpha");
	    });

	});

	xdescribe('by multiselect', function(){

		it('should keep issues with no milestone when selecting "No milestone"', function(){
			var multiselectBtn = ptor.findElement(by.css('.multiSelectButton'));
			multiselectBtn.click();

			var multiselect = ptor.findElement(by.css('.multiSelect'));
			multiselect.getInnerHtml().then(function(data){
				console.log(data);
			});

			var item = ptor.findElement(by.cssContainingText('.multiSelectItem', 'No milestone'), multiselect);
			//ptor.findElement(by.css('input'), checkbox).click();
			item.click();

			var elems = element.all(by.repeater('issue in issues'));
			expect(elems.count()).toBe(3);
		});

	});
});