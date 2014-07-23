
var app = angular.module('ohtuProjektiAppApp');
app.mock = {};

app.mock.$githubMockProvider = function(){
	var issue = {
		number: 0,
		body: "Issue 0"
	};

	var issues = [issue];

	this.$get = function(){
		
		var $service = {
			Issue: function(user, repo){

				this.list = function(options, cb){
					cb(issues);
				},

				this.updateIssue = function(number, options, cb){
					issues[number].body = 'body updated';
					cb(issues[number]);
				}
			},

			Milestone: function(user, repo){
				this.list = function(options, cb){}
			}
		};
		return $service;
	};	 
};

angular.module('appMock', ['ng']).provider({
  $githubMock: app.mock.$githubMockProvider
});