exports.httpBackendMock = function() {
    angular.module('httpBackendMock', ['ohtuProjektiAppApp', 'ngMockE2E'])
    .run(function($httpBackend) {
        var apiUrl = 'https://api.github.com';
        var list = apiUrl + '/user/repos';
	var issueboard = apiUrl + list + '/owner/repo';
        var repo = {name: 'Test Repo', description: 'Test description'};
	var issue = {title: 'Test title', body:'Test body'}

        $httpBackend.whenGET(/https:\/\/oauth.io.*/).respond('token');        
        $httpBackend.whenGET(list).respond([repo]);
	$httpBackend.whenGET(issueboard).respond([issue]);        
        $httpBackend.whenGET(/.*/).passThrough();
        });
}
