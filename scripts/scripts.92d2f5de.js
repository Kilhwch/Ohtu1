"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","LocalStorageModule","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","multi-select","n3-line-chart"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b){b.otherwise("/main"),a.state("main",{url:"/main",views:{"":{templateUrl:"scripts/main/main.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("logout",{url:"/logout",views:{"":{templateUrl:"scripts/user/logout.html",controller:"LogoutCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"scripts/list/list.html",controller:"ListCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("repository",{url:"/repos/:owner/:repoName",views:{"":{templateUrl:"scripts/issueboard/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"},"newissue@repository":{templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl"},"newlabel@repository":{templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl"},"multiselect@repository":{templateUrl:"scripts/multiselect/multiselect.html",controller:"IssueboardCtrl"}}}).state("burndown",{url:"/repos/:owner/:repoName/burndown",views:{"":{templateUrl:"scripts/burndown/burndown.html",controller:"BurndownCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}})}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main",{},{reload:!0}),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").controller("LogoutCtrl",["github","$state",function(a,b){a.logout(),b.go("main")}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","$state","github",function(a,b,c){c.isAuthenticated()||b.go("main"),c.userRepos().success(function(b){a.repos=b})}]),angular.module("ohtuProjektiAppApp").controller("HeaderCtrl",["$rootScope","$scope","$location","github","$state","$stateParams",function(a,b,c,d,e){b.currentState=e.current.name,b.params=e.params,b.isLoggedIn=d.isAuthenticated(),d.authenticatedUser().success(function(a){b.userName=a.login}),b.options=["New issue","New label/Delete label","New milestone"],b.getClass=function(a,b){return b=b||c.path(),b.substr(0,a.length)==a?"active":""},b.doAction=function(b){a.$broadcast("addItem",{choice:b})}}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$rootScope","$scope","$state","$stateParams","github","$modal",function(a,b,c,d,e,f){e.isAuthenticated()||c.go("main"),b.options={realtime:e.realtime()};var g=new e.Issue(d.owner,d.repoName),h=new e.Milestone(d.owner,d.repoName),i=new e.Label(d.owner,d.repoName);b.createOptions=["New issue","New label/Delete label","New milestone"],i.list().success(function(a){b.labels=a}),h.list().success(function(c){b.milestones=c,a.$broadcast("viewIssueboard",{milestones:c}),b.init()}),g.list().success(function(a){a.editing=!1,b.issues=a}),b.editItem=function(a){a.editingbody=a.body,a.editing=!0},b.cancelEditing=function(a){a.editing=!1},b.doneEditing=function(a){var b=a.body;a.body=a.editingbody,g.updateIssue(a.number,{body:a.body}).error(function(){a.body=b}),a.editing=!1},b.changedMilestone=function(a,b){g.updateIssue(a.number,{milestone:a.milestone.number},function(){},function(){a.milestone=b}),a.editing=!1},b.changedLabel=function(a,b){g.updateIssue(a.number,{labels:a.labels},function(){},function(){a.labels=b}),a.editing=!1},b.getLabelColor=function(a){return 0===a.labels.length?"":"#"+a.labels[0].color},b.isInBacklog=function(a){for(var b=0,c=0;c<a.labels.length;c++)(a.labels[c].name.match("Ready")||a.labels[c].name.match("InProgress")||a.labels[c].name.match("Done"))&&b++;return 0===b?a:void 0},b.isReady=function(){for(var a=0;a<issue.labels.length;a++)if(issue.labels[a].name.match("Ready"))return issue},b.isInProgress=function(a){for(var b=0;b<a.labels.length;b++)if(a.labels[b].name.match("InProgress"))return a},b.isDone=function(a){for(var b=0;b<a.labels.length;b++)if(a.labels[b].name.match("Done"))return a},b.openModal=function(a){"New issue"===a&&b.openNewIssueModal(),"New label/Delete label"===a&&b.openNewLabelModal(),"New milestone"===a&&console.log(a+"3")},b.openNewIssueModal=function(){f.open({templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl",scope:b})},b.openNewLabelModal=function(){f.open({templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl",scope:b})},b.init=function(){if(b.labels){b.filtersGrouped=[],b.filtersGrouped.push({name:"<strong>Milestones</strong>",multiSelectGroup:!0}),b.filtersGrouped.push({name:"No milestone",ticked:!1,type:"check"});for(var a=0;a<b.milestones.length;a++){var c=b.milestones[a].title;b.filtersGrouped.push({name:c,ticked:!1,type:"milestone"})}b.filtersGrouped.push({multiSelectGroup:!1}),b.filtersGrouped.push({name:"<strong>Labels</strong>",multiSelectGroup:!0});for(var a=0;a<b.labels.length;a++){var d=b.labels[a].name;"Done"!=d&&"InProgress"!=d&&"Ready"!=d&&b.filtersGrouped.push({name:d,ticked:!1,type:"label"})}b.filtersGrouped.push({multiSelectGroup:!1})}},b.updateRealtime=function(){e.realtime(b.options.realtime)},b.$on("addItem",function(a,c){b.openModal(c.choice)})}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","localStorageService",function(a,b){function c(c,f,g,h,i){var j={method:c,url:d+f,data:g,cache:!1},k=b.get("token");e.realtime()&&"GET"===c&&(j.params={cache:(new Date).getTime()}),k&&(j.headers={Authorization:"token "+k});var l=a(j);return h?void(i?l.success(h).error(i):l.success(h)):l}var d="https://api.github.com",e={realtime:function(a){return"undefined"==typeof a?angular.fromJson(b.get("realtime")):void b.set("realtime",a)},loginWithToken:function(a){b.set("token",a)},logout:function(){b.remove("token")},isAuthenticated:function(){return!!b.get("token")},user:function(a,b,d){return c("GET","/users/"+a,null,b,d)},authenticatedUser:function(a,b){return c("GET","/user",null,a,b)},userRepos:function(a,b){return c("GET","/user/repos",null,a,b)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getIssue=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createIssue=function(a,b,e){return c("POST",d,a,b,e)},this.updateIssue=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.openIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"open"},b,e)},this.closeIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"closed"},b,e)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getLabel=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createLabel=function(a,b,e){return c("POST",d,a,b,e)},this.deleteLabel=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)},this.updateLabel=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getMilestone=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createMilestone=function(a,b,e){return c("POST",d,a,b,e)},this.updateMilestone=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.deleteMilestone=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)}}};return e}]),angular.module("ohtuProjektiAppApp").controller("BurndownCtrl",["$scope","$stateParams","github",function(a,b,c){var d=new c.Issue(b.owner,b.repoName);a.listOfIssues,d.list().success(function(b){console.log(b[0]),a.listOfIssues=b}),a.data=[{x:new Date(1404201465570),val_0:0,val_1:0,val_2:0,val_3:0},{x:new Date(1404287865570),val_0:.993,val_1:3.894,val_2:8.47,val_3:14.347},{x:new Date(1404374265570),val_0:1.947,val_1:7.174,val_2:13.981,val_3:19.991},{x:new Date(1404460665570),val_0:2.823,val_1:9.32,val_2:14.608,val_3:13.509},{x:new Date(1404547065570),val_0:3.587,val_1:9.996,val_2:10.132,val_3:-1.167},{x:new Date(1404633465570),val_0:4.207,val_1:9.093,val_2:2.117,val_3:-15.136},{x:new Date(1404719865570),val_0:4.66,val_1:6.755,val_2:-6.638,val_3:-19.923},{x:new Date(1404806265570),val_0:4.927,val_1:3.35,val_2:-13.074,val_3:-12.625},{x:new Date(1404892665570),val_0:4.998,val_1:-.584,val_2:-14.942,val_3:2.331},{x:new Date(1404979065570),val_0:4.869,val_1:-4.425,val_2:-11.591,val_3:15.873},{x:new Date(1405065465570),val_0:4.546,val_1:-7.568,val_2:-4.191,val_3:19.787},{x:new Date(1405151865570),val_0:4.042,val_1:-9.516,val_2:4.673,val_3:11.698},{x:new Date(1405238265570),val_0:3.377,val_1:-9.962,val_2:11.905,val_3:-3.487},{x:new Date(1405324665570),val_0:2.578,val_1:-8.835,val_2:14.978,val_3:-16.557},{x:new Date(1405411065570),val_0:1.675,val_1:-6.313,val_2:12.819,val_3:-19.584},{x:new Date(1405497465570),val_0:.706,val_1:-2.794,val_2:6.182,val_3:-10.731},{x:new Date(1405583865570),val_0:-.292,val_1:1.165,val_2:-2.615,val_3:4.63},{x:new Date(1405670265570),val_0:-1.278,val_1:4.941,val_2:-10.498,val_3:17.183},{x:new Date(1405756665570),val_0:-2.213,val_1:7.937,val_2:-14.714,val_3:19.313},{x:new Date(1405843065570),val_0:-3.059,val_1:9.679,val_2:-13.79,val_3:9.728},{x:new Date(1405929465570),val_0:-3.784,val_1:9.894,val_2:-8.049,val_3:-5.758},{x:new Date(1406015865570),val_0:-4.358,val_1:8.546,val_2:.504,val_3:-17.751},{x:new Date(1406102265570),val_0:-4.758,val_1:5.849,val_2:8.881,val_3:-18.977},{x:new Date(1406188665570),val_0:-4.968,val_1:2.229,val_2:14.155,val_3:-8.691},{x:new Date(1406275065570),val_0:-4.981,val_1:-1.743,val_2:14.485,val_3:6.866},{x:new Date(1406361465570),val_0:-4.795,val_1:-5.44,val_2:9.754,val_3:18.259},{x:new Date(1406447865570),val_0:-4.417,val_1:-8.278,val_2:1.616,val_3:18.576},{x:new Date(1406534265570),val_0:-3.864,val_1:-9.809,val_2:-7.086,val_3:7.625},{x:new Date(1406620665570),val_0:-3.156,val_1:-9.792,val_2:-13.314,val_3:-7.951},{x:new Date(1406707065570),val_0:-2.323,val_1:-8.228,val_2:-14.89,val_3:-18.704}],a.options={axes:{x:{type:"date",key:"x"},y:{type:"linear"}},series:[{y:"val_0",label:"A time series",color:"#9467bd",axis:"y",type:"line",thickness:"2px",id:"series_0",visible:!0,lineMode:void 0}],tooltip:{mode:"scrubber"},stacks:[],lineMode:"linear",tension:.7,drawLegend:!0,drawDots:!0,columnsHGap:5}}]),angular.module("ohtuProjektiAppApp").controller("NewissueCtrl",["$state","$scope","github","$stateParams","$modalInstance",function(a,b,c,d,e){var f=new c.Issue(d.owner,d.repoName),g=function(){a.transitionTo(a.current,d,{reload:!0,inherit:!1,notify:!0})};b.issue={},b.addIssue=function(){f.createIssue(b.issue).success(function(a,c){"201"==c&&b.issues.unshift(a),alert("Created issue: "+b.issue.title)}),g(),b.close()},b.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").controller("NewlabelCtrl",["$scope","github","$state","$stateParams","$modalInstance",function(a,b,c,d,e){var f=new b.Label(d.owner,d.repoName),g=function(){c.transitionTo(c.current,d,{reload:!0,inherit:!1,notify:!0})};a.createLabel=function(b){var c={name:b.name};f.createLabel(c,function(c){alert("Created label: "+b.name),a.labels.push(c)},function(){alert("Creation unsuccessful")}),a.close()},a.deleteLabel=function(b){"Ready"!==b&&"InProgress"!==b&&"Done"!==b?f.deleteLabel(b,function(){alert("Deleted label: "+b)},function(){alert("Deletion unsuccessful")}):alert("Deletion of '"+b+"' is not allowed"),g(),a.close()},a.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").filter("multiselect",function(){return function(a,b){function c(){return 0!=j.length}function d(){return 0!=i.length}function e(){return!d()&&!c()&&!k}function f(a){if(k){if(a.milestone&&!c())return;return void h.push(a)}for(var b=0;b<i.length;b++)if(g(a,i[b].name))return void h.push(a);for(var b=0;b<j.length;b++){if(!a.milestone)return;if(a.milestone.title===j[b].name)return void h.push(a)}}function g(a,b){if(!a.labels)return!1;for(var c=0;c<a.labels.length;c++)if(a.labels[c].name===b)return!0;return!1}if(!b.filtersGrouped)return a;for(var h=[],i=[],j=[],k=!1,l=0;l<b.filtersGrouped.length;l++){var m=b.filtersGrouped[l];"check"===m.type&&(k=m.ticked),m.ticked&&("label"===m.type&&i.push(m),"milestone"===m.type&&j.push(m))}return e()?a:(angular.forEach(a,f),h)}});var app=angular.module("ohtuProjektiAppApp");app.directive("issuebox",function(){return{restrict:"E",templateUrl:"scripts/issueboard/issueboard.issuebox.html"}}).directive("barsChart",["$parse",function(){return{restrict:"E",replace:!1,scope:{data:"=chartData"},link:function(a,b){var c=d3.select(b[0]);c.append("div").attr("class","chart").selectAll("div").data(a.data).enter().append("div").transition().ease("elastic").style("width",function(a){return a+"%"}).text(function(a){return a+"%"})}}}]);