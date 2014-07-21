"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","LocalStorageModule","ngResource","ngSanitize","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/main"),a.state("header",{templateUrl:"views/header.html"}).state("footer",{templateUrl:"views/footer.html"}).state("main",{url:"/main",views:{"":{templateUrl:"views/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("login",{url:"/login",views:{"":{templateUrl:"views/login.html",controller:"LoginCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("logout",{url:"/logout",views:{"":{templateUrl:"views/logout.html",controller:"LogoutCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"views/list.html",controller:"ListCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("repository",{url:"/repos/:owner/:repoName",views:{"":{templateUrl:"views/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("burndown",{url:"/repos/:owner/:repoName/burndown",views:{"":{templateUrl:"views/burndown.html",controller:"BurndownCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}})}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("IssuesCtrl",["$scope","$stateParams","github",function(a,b,c){a.issues=new c.Issue(b.owner,b.repoName),a.issues.list({},function(b){a.issues=b}),a.issues.list({},function(a,b){console.log("createIssue"),a&&console.error(a),console.dir(b)})}]),angular.module("ohtuProjektiAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main"),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").controller("LogoutCtrl",["github","$state",function(a,b){a.logout(),b.go("login")}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","$state","github",function(a,b,c){c.isAuthenticated()||b.go("login"),c.userRepos(function(b){a.repos=b})}]),angular.module("ohtuProjektiAppApp").controller("HeaderCtrl",["$scope","$location","github",function(a,b,c){a.url=b.url(),a.list=[{name:"Home",url:"/main"},{name:"List",url:"/list"}],a.list.push(c.isAuthenticated()?{name:"Logout",url:"/logout"}:{name:"Login",url:"/login"});for(var d=0;d<a.list.length;d++)a.list[d].url===a.url&&(a.list[d].class="active")}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$scope","$stateParams",function(a,b){a.repoName=b.repoName,a.owner=b.owner}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","localStorageService",function(a,b){function c(c,e,f,g,h){var i={method:c,url:d+e,data:f},j=b.get("token");j&&(i.headers={Authorization:"token "+j});var k=a(i).success(g);h&&k.error(h)}var d="https://api.github.com";return{loginWithToken:function(a){b.set("token",a)},logout:function(){b.remove("token")},isAuthenticated:function(){return!!b.get("token")},user:function(a,b){c("GET","/users/"+a,null,b)},authenticatedUser:function(a){c("GET","/user",null,a)},userRepos:function(a){var b="/user/repos";c("GET",b,null,a)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b){c("GET",d,a,b)},this.getIssue=function(a,b){c("GET",d+"/"+a,null,b)},this.createIssue=function(a,b){c("POST",d,a,b)},this.updateIssue=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.openIssue=function(a,b){c("PATCH",d+"/"+a,{state:"open"},b)},this.closeIssue=function(a,b){c("PATCH",d+"/"+a,{state:"closed"},b)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b){c("GET",d,a,b)},this.getLabel=function(a,b){c("GET",d+"/"+a,null,b)},this.createLabel=function(a,b){c("POST",d,a,b)},this.deleteLabel=function(a,b){c("DELETE",d+"/"+a,null,b)},this.updateLabel=function(a,b,e){c("PATCH",d+"/"+a,b,e)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b){c("GET",d,a,b)},this.getMilestone=function(a,b){c("GET",d+"/"+a,null,b)},this.createMilestone=function(a,b){c("POST",d,a,b)},this.updateMilestone=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.deleteMilestone=function(a,b){c("DELETE",d+"/"+a,null,b)}}}}]),angular.module("ohtuProjektiAppApp").controller("BurndownCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);