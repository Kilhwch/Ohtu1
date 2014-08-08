"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","LocalStorageModule","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","multi-select","n3-line-chart"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b){b.otherwise("/main"),a.state("main",{url:"/main",views:{"":{templateUrl:"scripts/main/main.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("logout",{url:"/logout",views:{"":{templateUrl:"scripts/user/logout.html",controller:"LogoutCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"scripts/list/list.html",controller:"ListCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("repository",{url:"/repos/:owner/:repoName",views:{"":{templateUrl:"scripts/issueboard/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"},"newissue@repository":{templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl"},"newlabel@repository":{templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl"},"newmilestone@repository":{templateUrl:"scripts/issueboard/newmilestone/newmilestone.html",controller:"NewmilestoneCtrl"},"deletemilestone@repository":{templateUrl:"scripts/issueboard/newmilestone/deletemilestone.html",controller:"NewmilestoneCtrl"},"multiselect@repository":{templateUrl:"scripts/multiselect/multiselect.html"}}}).state("burndown",{url:"/repos/:owner/:repoName/burndown",views:{"":{templateUrl:"scripts/burndown/burndown.html",controller:"BurndownCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}})}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main",{},{reload:!0}),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").controller("LogoutCtrl",["github","$state",function(a,b){a.logout(),b.go("main")}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","$state","github",function(a,b,c){c.isAuthenticated()||b.go("main"),c.userRepos().success(function(b){a.repos=b})}]),angular.module("ohtuProjektiAppApp").controller("HeaderCtrl",["$rootScope","$scope","$location","github","filteringOptions","$state","$stateParams",function(a,b,c,d,e,f){b.currentState=f.current.name,b.params=f.params,b.isLoggedIn=d.isAuthenticated(),b.filters={textFilter:""},d.authenticatedUser().success(function(a){b.userName=a.login,b.avatar=a.avatar_url}),b.getClass=function(a,b){return b=b||c.path(),b.substr(0,a.length)==a?"active":""},b.textFilterChanged=function(){e.setTextFilter(b.filters.textFilter)}}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$rootScope","$scope","$filter","$state","$stateParams","github","filteringOptions","$modal","$window",function(a,b,c,d,e,f,g,h){f.isAuthenticated()||d.go("main");var i=new f.Issue(e.owner,e.repoName),j=new f.Milestone(e.owner,e.repoName),k=new f.Label(e.owner,e.repoName),l=new f.Assignee(e.owner,e.repoName);b.createOptions=["New issue","New label/Delete label","New milestone","Delete milestone"],j.list().success(function(c){b.milestones=c,a.$broadcast("viewIssueboard",{milestones:c}),k.list().success(function(a){b.labels=a,b.init()})}),l.list().success(function(a){a.editing=!1,b.assignees=a}),i.list().success(function(a){a.editing=!1,b.issues=a}),b.editItem=function(a){a.editingbody=a.body,a.editing=!0};b.changedMilestone=function(a,b){i.updateIssue(a.number,{milestone:a.milestone.number},function(){},function(){a.milestone=b}),a.editing=!1},b.assign=function(a,b){i.updateIssue(a.number,{assignee:b.login},function(b){a.assignee=b.assignee},function(){console.log("Error while assigning assignee")}),a.editing=!1},b.changedLabel=function(a,b){i.updateIssue(a.number,{labels:a.labels},function(){},function(){a.labels=b}),a.editing=!1},b.getLabelColor=function(a){return 0===a.labels.length?"":"#"+a.labels[0].color},b.openModal=function(a){"New issue"===a&&b.openNewIssueModal(),"New label/Delete label"===a&&b.openNewLabelModal(),"New milestone"===a&&b.openNewMilestoneModal(),"Delete milestone"===a&&b.openDeleteMilestoneModal(),"Issue edit"===a&&b.openIssueEditModal(),b.choice=0},b.openIssueEditModal=function(a){b.issue=a,b.modalInstance=h.open({templateUrl:"scripts/issueboard/issuebox/issueboxedit.html",controller:"IssueboxCtrl",scope:b})},b.openNewIssueModal=function(){h.open({templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl",scope:b})},b.openNewLabelModal=function(){h.open({templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl",scope:b})},b.openNewMilestoneModal=function(){h.open({templateUrl:"scripts/issueboard/newmilestone/newmilestone.html",controller:"NewmilestoneCtrl",scope:b})},b.openDeleteMilestoneModal=function(){h.open({templateUrl:"scripts/issueboard/newmilestone/deletemilestone.html",controller:"NewmilestoneCtrl",scope:b})},b.init=function(){if(b.labels){a.filtersGrouped=[],a.filtersGrouped.push({name:"<strong>Milestones</strong>",multiSelectGroup:!0}),a.filtersGrouped.push({name:"No milestone",ticked:!1,type:"check"});for(var c=0;c<b.milestones.length;c++){var d=b.milestones[c].title;b.filtersGrouped.push({name:d,ticked:!1,type:"milestone"})}a.filtersGrouped.push({multiSelectGroup:!1}),a.filtersGrouped.push({name:"<strong>Labels</strong>",multiSelectGroup:!0});for(var c=0;c<b.labels.length;c++){var e=b.labels[c].name;"Done"!=e&&"InProgress"!=e&&"Ready"!=e&&a.filtersGrouped.push({name:e,ticked:!1,type:"label"})}a.filtersGrouped.push({multiSelectGroup:!1})}},b.$watch(function(){return g.getTextFilter()},function(a){b.textFilter=a.textFilter},!0)}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","localStorageService",function(a,b){function c(c,e,f,g,h){var i={method:c,url:d+e,data:f,cache:!1,params:{}},j=b.get("token");"GET"===c&&(i.params.cache=(new Date).getTime(),i.params.per_page=100),j&&(i.headers={Authorization:"token "+j});var k=a(i);return g?void(h?k.success(g).error(h):k.success(g)):k}var d="https://api.github.com",e={loginWithToken:function(a){b.set("token",a)},logout:function(){b.remove("token")},isAuthenticated:function(){return!!b.get("token")},user:function(a,b,d){return c("GET","/users/"+a,null,b,d)},authenticatedUser:function(a,b){return c("GET","/user",null,a,b)},userRepos:function(a,b){return c("GET","/user/repos",null,a,b)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getIssue=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createIssue=function(a,b,e){return c("POST",d,a,b,e)},this.updateIssue=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.openIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"open"},b,e)},this.closeIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"closed"},b,e)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getLabel=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createLabel=function(a,b,e){return c("POST",d,a,b,e)},this.deleteLabel=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)},this.updateLabel=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)}},Comment:function(a,b,d){var e="/repos/"+a+"/"+b+"/issues/"+d.number+"/comments";this.list=function(a,b,d){return c("GET",e,a||{},b,d)},this.getComment=function(a,b,d){return c("GET",e+"/"+a,null,b,d)},this.createComment=function(a,b,d){return c("POST",e,a,b,d)},this.deleteComment=function(a,b,d){return c("DELETE",e+"/"+a,null,b,d)},this.updateComment=function(a,b,d,f){return c("PATCH",e+"/"+a,b,d,f)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getMilestone=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createMilestone=function(a,b,e){return c("POST",d,a,b,e)},this.updateMilestone=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.deleteMilestone=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)}},Assignee:function(a,b){var d="/repos/"+a+"/"+b+"/assignees";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.checkAssignee=function(a,b,e){return c("GET",d+"/"+a,null,b,e)}}};return e}]),angular.module("ohtuProjektiAppApp").controller("BurndownCtrl",["$scope","$stateParams","github",function(a,b,c){var d=new c.Issue(b.owner,b.repoName);a.listOfIssues,d.list().success(function(b){console.log(b[0]),a.listOfIssues=b}),a.data=[{x:new Date(1404201465570),val_0:0,val_1:0,val_2:0,val_3:0},{x:new Date(1404287865570),val_0:.993,val_1:3.894,val_2:8.47,val_3:14.347},{x:new Date(1404374265570),val_0:1.947,val_1:7.174,val_2:13.981,val_3:19.991},{x:new Date(1404460665570),val_0:2.823,val_1:9.32,val_2:14.608,val_3:13.509},{x:new Date(1404547065570),val_0:3.587,val_1:9.996,val_2:10.132,val_3:-1.167},{x:new Date(1404633465570),val_0:4.207,val_1:9.093,val_2:2.117,val_3:-15.136},{x:new Date(1404719865570),val_0:4.66,val_1:6.755,val_2:-6.638,val_3:-19.923},{x:new Date(1404806265570),val_0:4.927,val_1:3.35,val_2:-13.074,val_3:-12.625},{x:new Date(1404892665570),val_0:4.998,val_1:-.584,val_2:-14.942,val_3:2.331},{x:new Date(1404979065570),val_0:4.869,val_1:-4.425,val_2:-11.591,val_3:15.873},{x:new Date(1405065465570),val_0:4.546,val_1:-7.568,val_2:-4.191,val_3:19.787},{x:new Date(1405151865570),val_0:4.042,val_1:-9.516,val_2:4.673,val_3:11.698},{x:new Date(1405238265570),val_0:3.377,val_1:-9.962,val_2:11.905,val_3:-3.487},{x:new Date(1405324665570),val_0:2.578,val_1:-8.835,val_2:14.978,val_3:-16.557},{x:new Date(1405411065570),val_0:1.675,val_1:-6.313,val_2:12.819,val_3:-19.584},{x:new Date(1405497465570),val_0:.706,val_1:-2.794,val_2:6.182,val_3:-10.731},{x:new Date(1405583865570),val_0:-.292,val_1:1.165,val_2:-2.615,val_3:4.63},{x:new Date(1405670265570),val_0:-1.278,val_1:4.941,val_2:-10.498,val_3:17.183},{x:new Date(1405756665570),val_0:-2.213,val_1:7.937,val_2:-14.714,val_3:19.313},{x:new Date(1405843065570),val_0:-3.059,val_1:9.679,val_2:-13.79,val_3:9.728},{x:new Date(1405929465570),val_0:-3.784,val_1:9.894,val_2:-8.049,val_3:-5.758},{x:new Date(1406015865570),val_0:-4.358,val_1:8.546,val_2:.504,val_3:-17.751},{x:new Date(1406102265570),val_0:-4.758,val_1:5.849,val_2:8.881,val_3:-18.977},{x:new Date(1406188665570),val_0:-4.968,val_1:2.229,val_2:14.155,val_3:-8.691},{x:new Date(1406275065570),val_0:-4.981,val_1:-1.743,val_2:14.485,val_3:6.866},{x:new Date(1406361465570),val_0:-4.795,val_1:-5.44,val_2:9.754,val_3:18.259},{x:new Date(1406447865570),val_0:-4.417,val_1:-8.278,val_2:1.616,val_3:18.576},{x:new Date(1406534265570),val_0:-3.864,val_1:-9.809,val_2:-7.086,val_3:7.625},{x:new Date(1406620665570),val_0:-3.156,val_1:-9.792,val_2:-13.314,val_3:-7.951},{x:new Date(1406707065570),val_0:-2.323,val_1:-8.228,val_2:-14.89,val_3:-18.704}],a.options={axes:{x:{type:"date",key:"x"},y:{type:"linear"}},series:[{y:"val_0",label:"A time series",color:"#9467bd",axis:"y",type:"line",thickness:"2px",id:"series_0",visible:!0,lineMode:void 0}],tooltip:{mode:"scrubber"},stacks:[],lineMode:"linear",tension:.7,drawLegend:!0,drawDots:!0,columnsHGap:5}}]),angular.module("ohtuProjektiAppApp").controller("NewissueCtrl",["$state","$scope","github","$stateParams","$modalInstance",function(a,b,c,d,e){var f=new c.Issue(d.owner,d.repoName),g=function(){a.transitionTo(a.current,d,{reload:!0,inherit:!1,notify:!0})};b.issue={},b.addIssue=function(){f.createIssue(b.issue).success(function(a,c){"201"==c&&b.issues.unshift(a),alert("Created issue: "+b.issue.title)}),g(),b.close()},b.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").controller("NewlabelCtrl",["$scope","github","$state","$stateParams","$modalInstance",function(a,b,c,d,e){var f=new b.Label(d.owner,d.repoName),g=function(){c.transitionTo(c.current,d,{reload:!0,inherit:!1,notify:!0})};a.createLabel=function(b){var c={name:b.name};f.createLabel(c,function(c){alert("Created label: "+b.name),a.labels.push(c)},function(){alert("Creation unsuccessful")}),g(),a.close()},a.deleteLabel=function(b){"Ready"!==b&&"InProgress"!==b&&"Done"!==b?f.deleteLabel(b,function(){alert("Deleted label: "+b)},function(){alert("Deletion unsuccessful")}):alert("Deletion of '"+b+"' is not allowed"),g(),a.close()},a.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").controller("NewmilestoneCtrl",["$scope","github","$state","$stateParams","$modalInstance",function(a,b,c,d,e){a.ghMilestones=new b.Milestone(d.owner,d.repoName),a.reload=function(){c.transitionTo(c.current,d,{reload:!0,inherit:!1,notify:!0})},a.createMilestone=function(b){var c={title:b.title,description:b.description,due_on:b.due_on};a.ghMilestones.createMilestone(c,function(c){alert("Created milestone: "+b.title),a.milestones.push(c)},function(){alert("Creation unsuccessful")}),a.close()},a.deleteMilestone=function(b){a.ghMilestones.deleteMilestone(b.number,function(){alert("Deleted milestone: "+b.title),a.reload()}),a.close()},a.close=function(){e.dismiss("close")},a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0}}]),angular.module("ohtuProjektiAppApp").controller("IssueboxCtrl",["$scope","github","$state","$stateParams","$modalInstance",function(a,b,c,d,e){var f=new b.Issue(d.owner,d.repoName),g=new b.Comment(d.owner,d.repoName,a.issue);g.list({},function(b){a.comments=b});a.cancelEditing=function(b,c,d){b.milestone=c,b.labels=d,b.editing=!1,a.modalInstance.dismiss("close")},a.doneEditing=function(b,c,d){var e={body:b.body,labels:b.labels.name};b.milestone&&(e={body:b.body,labels:b.labels.name,milestone:b.milestone.number});b.body;f.updateIssue(b.number,e,function(a){b=a},function(){b.milestone=c,b.labels=d}),b.editing=!1,a.modalInstance.dismiss("close")},a.close=function(){e.dismiss("close")},a.newComment=function(b){g.createComment({body:b},function(b){a.comments.push(b)},function(){})}}]),angular.module("ohtuProjektiAppApp").filter("multiselect",["$rootScope",function(a){return function(b,c){function d(){return 0!=k.length}function e(){return 0!=j.length}function f(){return!e()&&!d()&&!l}function g(a){if(l){if(a.milestone&&!d())return;return void i.push(a)}for(var b=0;b<j.length;b++)if(h(a,j[b].name))return void i.push(a);for(var b=0;b<k.length;b++){if(!a.milestone)return;if(a.milestone.title===k[b].name)return void i.push(a)}}function h(a,b){if(!a.labels)return!1;for(var c=0;c<a.labels.length;c++)if(a.labels[c].name===b)return!0;return!1}if(!c.filtersGrouped)return b;for(var i=[],j=[],k=[],l=!1,m=0;m<a.filtersGrouped.length;m++){var n=a.filtersGrouped[m];"check"===n.type&&(l=n.ticked),n.ticked&&("label"===n.type&&j.push(n),"milestone"===n.type&&k.push(n))}return f()?b:(angular.forEach(b,g),i)}}]);var app=angular.module("ohtuProjektiAppApp");app.directive("issuebox",function(){return{restrict:"E",templateUrl:"scripts/issueboard/issueboard.issuebox.html"}}).directive("barsChart",["$parse",function(){return{restrict:"E",replace:!1,scope:{data:"=chartData"},link:function(a,b){var c=d3.select(b[0]);c.append("div").attr("class","chart").selectAll("div").data(a.data).enter().append("div").transition().ease("elastic").style("width",function(a){return a+"%"}).text(function(a){return a+"%"})}}}]),angular.module("ohtuProjektiAppApp").service("filteringOptions",function(){var a={textFilter:""};return{getTextFilter:function(){return a},setTextFilter:function(b){a.textFilter=b}}});