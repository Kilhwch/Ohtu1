exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
            .run(function($httpBackend) {
                var apiUrl = 'https://api.github.com';
                var list =  /https:\/\/api\.github\.com\/user\/repos/;
                var issueboard = /https:\/\/api\.github\.com\/repos\/user\/repo\/issues/;
                var labels = /https:\/\/api\.github\.com\/repos\/user\/repo\/labels/;
                var milestones = /https:\/\/api\.github\.com\/repos\/user\/repo\/milestones/;
                
                var multimilestone = {title: 'testi'};
                var multilabel = {'name':'testlabel','color': 'f29513'};
                var repo = {name: 'Test Repo', description: 'Test description'};
                var repo2 = {name: 'Testi Reponen', description: 'Test description X2000 pro'};
                var issue = {number: 1, title: 'Test tickle', body:'Test body', milestone: null};
            		var issue2 = {number: 1, title: 'Test ready', body:'ready body', milestone: 'testi' , 'labels':[{'name':'Ready','color': 'f29513'}] };
            		var issue3 = {number: 1, title: 'Test inprogress', body:'inprogress body', milestone: null , 'labels':[{'name':'InProgress','color': 'f29513'}] };
            		var issue4 = {number: 1, title: 'Test done', body:'done body', milestone: null , 'labels':[{'name':'Done','color': 'f29513'}] };
            		var issue5 = {number: 1, title: 'Test done2', body:'done body2', milestone: null , 'labels':[{'name':'Done','color': 'f29513'}] };
                    var label = {'name':'Done','color': 'f29513'};
                    
   
                $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');
                $httpBackend.whenGET(list).respond([repo, repo2]);
                $httpBackend.whenGET(issueboard).respond([issue, issue2, issue3, issue4, issue5]);
                $httpBackend.whenGET(labels).respond([multilabel]);
                $httpBackend.whenGET(milestones).respond([multimilestone]);
                
                
                $httpBackend.whenPATCH(/https:\/\/api\.github\.com\/repos\/user\/repo\/issues\/1/).respond(201, '');
                

                $httpBackend.whenPATCH('https://api.github.com/repos/user/repo/labels')
                  .respond(function(method, url, data, headers) {
                   return [201, data];
                  });
                $httpBackend.whenPOST('https://api.github.com/repos/user/repo/issues')
                  .respond(function(method, url, data, headers) {
                   return [201, data];
                  });
                $httpBackend.whenPOST('https://api.github.com/repos/user/repo/labels')
                  .respond(function(method, url, data, headers) {
                   return [201, data];
                  });
                $httpBackend.whenPOST('https://api.github.com/repos/user/repo/milestones')
                  .respond(function(method, url, data, headers) {
                   return [201, data];
                  });
                $httpBackend.whenGET(/.*/).passThrough();
                
            });
}
