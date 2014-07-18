"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router"]).factory("auth",function(){}).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("index",{url:"/",views:{header:{templateUrl:"views/index.header.html"},login:{templateUrl:"views/index.login.html",controller:"LoginCtrl"},footer:{templateUrl:"views/index.footer.html",controller:"FooterCtrl"}},controller:"MainCtrl"}).state("about",{url:"/about",templateUrl:"views/about.html",controller:"AboutCtrl"})}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$location","gitapi",function(a,b,c){if(c.isAuthenticated()){var d=c.getGithub(),e=d.getUser();e.repos(function(b,c){a.$apply(function(){a.repos=c})})}else b.path("login")}]),angular.module("ohtuProjektiAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$location","gitapi","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.path("/"),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").service("gitapi",function(){var a;return{loginWithToken:function(b){a=new Github({token:b,auth:"oauth"})},isAuthenticated:function(){return void 0!=a},getGithub:function(){return a}}}),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http",function(a){var b,c="https://api.github.com";return{loginWithToken:function(a){b=a},isAuthenticated:function(){return void 0!=b},_http:function(d,e,f,g,h){var i=a({method:d,url:c+e,data:f,headers:"Authorization: token "+b}).success(g);h&&i.error(h)},Issue:function(a){var b="/repos/"+a.user+"/"+a.repo+"/issues";this.list=function(a,c){_http("GET",b,a,c)},this.getIssue=function(a,c){_http("GET",b+"/"+a,null,c)},this.createIssue=function(a,c){_http("POST",b,a,c)},this.updateIssue=function(a,c,d){_http("PATCH",b+"/"+a,c,d)},this.openIssue=function(a,c){_http("PATCH",b+"/"+a,{state:"open"},c)},this.closeIssue=function(a,c){_http("PATCH",b+"/"+a,{state:"closed"},c)}}}}]),angular.module("ohtuProjektiAppApp").controller("FooterCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);