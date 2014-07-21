"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/main"),a.state("header",{templateUrl:"views/header.html"}).state("footer",{templateUrl:"views/footer.html"}).state("main",{url:"/main",views:{"":{templateUrl:"views/issueboard.html",controller:"IssueboardCtrl"},"header@":{templateUrl:"views/header.html"}}}).state("login",{url:"/login",views:{"":{templateUrl:"views/login.html",controller:"LoginCtrl"},"header@":{templateUrl:"views/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"views/list.html",controller:"ListCtrl"},"header@":{templateUrl:"views/header.html"}}})}]),angular.module("ohtuProjektiAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main"),a.$apply()}).fail(function(a){console.log(a)})}}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","github",function(a,b){b.isAuthenticated()||$state.go("login"),b.userRepos(function(b){a.repos=b})}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","$cookies",function(a,b){function c(c,e,f,g,h){var i={method:c,url:d+e,data:f};b.token&&(i.headers={Authorization:"token "+b.token});var j=a(i).success(g);h&&j.error(h)}var d="https://api.github.com";return{loginWithToken:function(a){b.token=a},isAuthenticated:function(){return!!b.token},user:function(a,b){c("GET","/users/"+a,null,b)},authenticatedUser:function(a){c("GET","/user",null,a)},userRepos:function(a){var b="/user/repos";c("GET",b,null,a)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b){c("GET",d,a,b)},this.getIssue=function(a,b){c("GET",d+"/"+a,null,b)},this.createIssue=function(a,b){c("POST",d,a,b)},this.updateIssue=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.openIssue=function(a,b){c("PATCH",d+"/"+a,{state:"open"},b)},this.closeIssue=function(a,b){c("PATCH",d+"/"+a,{state:"closed"},b)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b){c("GET",d,a,b)},this.getLabel=function(a,b){c("GET",d+"/"+a,null,b)},this.createLabel=function(a,b){c("POST",d,a,b)},this.deleteLabel=function(a,b){c("DELETE",d+"/"+a,null,b)},this.updateLabel=function(a,b,e){c("PATCH",d+"/"+a,b,e)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b){c("GET",d,a,b)},this.getMilestone=function(a,b){c("GET",d+"/"+a,null,b)},this.createMilestone=function(a,b){c("POST",d,a,b)},this.updateMilestone=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.deleteMilestone=function(a,b){c("DELETE",d+"/"+a,null,b)}}}}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);