exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
    .run(function($httpBackend) {
        var apiUrl = 'https://api.github.com';
        var list = apiUrl + '/user/repos';
        var repo = {name: 'Test Repo', description: 'Test description'};

        $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');        
        $httpBackend.whenGET(list).respond([repo]);        
        $httpBackend.whenGET(/.*/).passThrough();
        });
}
