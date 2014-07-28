exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
            .run(function($httpBackend) {
                var apiUrl = 'https://api.github.com';
                var list = apiUrl + '/user/repos';
                var issueboard = apiUrl + '/repos/user/repo/issues';
                var repo = {name: 'Test Repo', description: 'Test description'};
                var repo2 = {name: 'Testi Reponen', description: 'Test description X2000 pro'};
                var issue = {title: 'Test tickle', body:'Test body', milestone: null};
		var issue2 = {title: 'Test ready', body:'ready body', milestone: null , 'labels':[{'name':'Ready','color': 'f29513'}] };
		var issue3 = {title: 'Test inprogress', body:'inprogress body', milestone: null , 'labels':[{'name':'InProgress','color': 'f29513'}] };
		var issue4 = {title: 'Test done', body:'done body', milestone: null , 'labels':[{'name':'Done','color': 'f29513'}] };
		var issue5 = {title: 'Test done2', body:'done body2', milestone: null , 'labels':[{'name':'Done','color': 'f29513'}] };

                $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');
                $httpBackend.whenGET(list).respond([repo, repo2]);
                $httpBackend.whenGET(issueboard).respond([issue, issue2, issue3, issue4, issue5]);
                $httpBackend.whenPOST('https://api.github.com/repos/user/repo/issues')
                  .respond(function(method, url, data, headers) {
                   return [201, {title: "moi"}];
                  });
                $httpBackend.whenGET(/.*/).passThrough();
                
            });
}