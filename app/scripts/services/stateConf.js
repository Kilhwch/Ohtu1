'use strict';

var myApp = angular.module('ohtuProjektiAppApp');

myApp.config(function($stateProvider, $urlRouterProvider){
	 //
	 // For any unmatched url
	 $urlRouterProvider.otherwise("/");
	 //
	 $stateProvider.state('backlog', {
	    url: "/backlog",
	    templateUrl: "views/backlog.html",
	    controller: 'BacklogCtrl'
	  })
	 .state('login',{
	 	url: "/login",
	 	template: "<p>views/login.html</p>"
	 	//controller: 'LoginCtrl'
	 })
)};