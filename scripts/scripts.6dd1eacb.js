"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","angularCharts","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/main"),a.state("main",{url:"/main",views:{"":{templateUrl:"views/main.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("logout",{url:"/logout",views:{"":{templateUrl:"views/logout.html",controller:"LogoutCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"views/list.html",controller:"ListCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("repository",{url:"/repos/:owner/:repoName",views:{"":{templateUrl:"views/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"},"newissue@repository":{templateUrl:"views/newissue.html",controller:"NewissueCtrl"}}}).state("burndown",{url:"/repos/:owner/:repoName/burndown",views:{"":{templateUrl:"views/burndown.html",controller:"BurndownCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}}).state("newissue",{url:"/repos/:owner/:repoName/newissue",views:{"":{templateUrl:"views/newissue.html",controller:"NewissueCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"views/header.html"}}})}]),angular.module("ohtuProjektiAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main",{},{reload:!0}),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").controller("LogoutCtrl",["github","$state",function(a,b){a.logout(),b.go("main")}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","$state","github",function(a,b,c){c.isAuthenticated()||b.go("main"),c.userRepos(function(b){a.repos=b})}]),angular.module("ohtuProjektiAppApp").controller("HeaderCtrl",["$scope","$location","github","$state","$stateParams",function(a,b,c,d){a.currentState=d.current.name,a.params=d.params,a.isLoggedIn=c.isAuthenticated(),a.getClass=function(a,c){return c=c||b.path(),c.substr(0,a.length)==a?"active":""}}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$scope","$stateParams","github",function(a,b,c){var d=new c.Issue(b.owner,b.repoName),e=new c.Milestone(b.owner,b.repoName);a.labels=["Ready","InProgress","Done"],e.list({},function(b){a.milestones=b}),d.list({},function(b){b.editing=!1,a.issues=b}),a.editItem=function(a){a.editingbody=a.body,a.editing=!0},a.cancelEditing=function(a){a.editing=!1},a.doneEditing=function(a){a.body=a.editingbody,d.updateIssue(a.number,a,function(){}),a.editing=!1},a.changedMilestone=function(b){a.doneEditing(b),e.getMilestone(b.milestone,function(a){b.milestone=a})},a.getLabelColor=function(a){return 0===a.labels.length?"":"#"+a.labels[0].color}}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","$cookies",function(a,b){function c(c,e,f,g,h){var i={method:c,url:d+e,data:f},j=b.token;j&&(i.headers={Authorization:"token "+j});var k=a(i).success(g);h&&k.error(h)}var d="https://api.github.com";return{loginWithToken:function(a){b.token=a},logout:function(){delete b.token},isAuthenticated:function(){return!!b.token},user:function(a,b){c("GET","/users/"+a,null,b)},authenticatedUser:function(a){c("GET","/user",null,a)},userRepos:function(a){c("GET","/user/repos",null,a)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b){c("GET",d,a,b)},this.getIssue=function(a,b){c("GET",d+"/"+a,null,b)},this.createIssue=function(a,b){c("POST",d,a,b)},this.updateIssue=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.openIssue=function(a,b){c("PATCH",d+"/"+a,{state:"open"},b)},this.closeIssue=function(a,b){c("PATCH",d+"/"+a,{state:"closed"},b)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b){c("GET",d,a,b)},this.getLabel=function(a,b){c("GET",d+"/"+a,null,b)},this.createLabel=function(a,b){c("POST",d,a,b)},this.deleteLabel=function(a,b){c("DELETE",d+"/"+a,null,b)},this.updateLabel=function(a,b,e){c("PATCH",d+"/"+a,b,e)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b){c("GET",d,a,b)},this.getMilestone=function(a,b){c("GET",d+"/"+a,null,b)},this.createMilestone=function(a,b){c("POST",d,a,b)},this.updateMilestone=function(a,b,e){c("PATCH",d+"/"+a,b,e)},this.deleteMilestone=function(a,b){c("DELETE",d+"/"+a,null,b)}}}}]),angular.module("ohtuProjektiAppApp").controller("BurndownCtrl",["$scope",function(a){a.config={title:"Project name votes",tooltips:!0,labels:!1,mouseover:function(){},mouseout:function(){},click:function(){},legend:{display:!0,position:"right"}},a.data={series:["Haitari","AgileHub","GitTasker","TaskTable"],data:[{x:"Haitari",y:[0],tooltip:"this is tooltip"},{x:"AgileHub",y:[2]},{x:"GitTasker",y:[2]},{x:"TaskTable",y:[2]}]}}]),angular.module("ohtuProjektiAppApp").controller("NewissueCtrl",["$scope","github","$stateParams",function(a,b,c){var d=new b.Issue(c.owner,c.repoName);a.clearFields=function(){a.issueTitle="",a.issueBody=""},a.addIssue=function(){var b={title:a.issueTitle,body:a.issueBody};d.createIssue(b,function(b,c){console.log("issues data",a.issues),"201"==c&&a.issues.unshift(b)}),a.clearFields()}}]);var app=angular.module("ohtuProjektiAppApp");app.directive("issuebox",function(){return{restrict:"E",templateUrl:"views/issueboard.issuebox.html"}});