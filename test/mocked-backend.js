exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
            .run(function($httpBackend) {
                var apiUrl = 'https://api.github.com';
                var list = apiUrl + '/user/repos';
                var issueboard = apiUrl + '/repos/user/repo/issues';
                var repo = {name: 'Test Repo', description: 'Test description'};
                var repo2 = {name: 'Testi Reponen', description: 'Test description X2000 pro'};
                var issue = {title: 'Test tickle'};

                $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');
                $httpBackend.whenGET(list).respond([repo, repo2]);
                $httpBackend.whenGET(issueboard).respond([issue]);
                $httpBackend.whenGET(/.*/).passThrough();
            });
}
