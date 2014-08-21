exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
            .run(function($httpBackend) {
                var apiUrl = 'https://api.github.com';
                var list =  /https:\/\/api\.github\.com\/user\/repos/;
                var issueboard = /https:\/\/api\.github\.com\/repos\/user\/repo\/issues/;
                var labels = /https:\/\/api\.github\.com\/repos\/user\/repo\/labels/;
                var milestones = /https:\/\/api\.github\.com\/repos\/user\/repo\/milestones/;
                var assignees = /https:\/\/api\.github\.com\/repos\/user\/repo\/assignees/;
                


                // milestones
                var multimilestone = {title: 'testi', number: 1};
                
                //assignees
                var assignee = {'login': 'octocat','id': 1,'avatar_url': 'https://github.com/images/error/octocat_happy.gif'};

                // issuelabels
                var label = {'name':'State:Done','color': 'f29513'};
                var readylabel = {'name':'State:Ready','color': 'f29513'};
                var inproglabel = {'name':'State:InProgress','color': 'f29513'}
                var donelabel = {'name':'State:Done','color': 'f29513'};
                var multilabel = {'name':'testlabel','color': 'f29513'};
                
                // repos
                var repo = {name: 'Test Repo', description: 'Test description'};
                var repo2 = {name: 'Testi Reponen', description: 'Test description X2000 pro'};
                
                // issues
                var issue = {number: 1, title: 'Test tickle', body:'Test body', milestone: null};
                var issue2 = {number: 2, title: 'Test ready', body:'ready body', milestone: 'testi' , 'labels':[readylabel] };
              	var issue3 = {number: 3, title: 'Test inprogress', body:'inprogress body', milestone: null , 'labels':[inproglabel] };
              	var issue4 = {number: 4, title: 'Test done', body:'Done body', milestone: null , 'labels':[donelabel] };
              	var issue5 = {number: 5, title: 'Test done2', body:'Done body2', milestone: null , 'labels':[donelabel, multilabel] };
                    
                    
   
                $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');
                $httpBackend.whenGET(assignees).respond([assignee]);
                $httpBackend.whenGET(list).respond([repo, repo2]);
                $httpBackend.whenGET(issueboard).respond([issue, issue2, issue3, issue4, issue5]);
                $httpBackend.whenGET(labels).respond([multilabel, label]);
                $httpBackend.whenGET(milestones).respond([multimilestone]);
                
                
                $httpBackend.whenPATCH('https://api.github.com/repos/user/repo/issues/1')
                  .respond(function(method, url, data, headers) {
                    if (data === '{"assignee":null}') { 
                      return [201, {number: 1, title: 'Test tickle', body:'Test body', milestone: null}];
                    }
                    return [201, {number: 1, title: 'Test tickle', body:'Test body', milestone: null, assignee: assignee}];                  });
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
                $httpBackend.whenDELETE('https://api.github.com/repos/user/repo/milestones/1')
                  .respond(function(method, url, data, headers) {
                   return [201, data];
                  });
                $httpBackend.whenGET(/.*/).passThrough();
                
            });
}
