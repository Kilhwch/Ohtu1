"use strict";angular.module("ohtuProjektiAppApp",["ngAnimate","LocalStorageModule","ngResource","ngSanitize","ngTouch","ui.router","ui.bootstrap","multi-select","n3-line-chart","ui.labelmultiselect","ngDragDrop","ui.bootstrap.datetimepicker"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b){b.otherwise("/main"),a.state("main",{url:"/main",views:{"":{templateUrl:"scripts/main/main.html"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("logout",{url:"/logout",views:{"":{templateUrl:"scripts/user/logout.html",controller:"LogoutCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("list",{url:"/list",views:{"":{templateUrl:"scripts/list/list.html",controller:"ListCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}}).state("repository",{url:"/repos/:owner/:repoName",views:{"":{templateUrl:"scripts/issueboard/issueboard.html",controller:"IssueboardCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"},"newissue@repository":{templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl"},"newlabel@repository":{templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl"},"newmilestone@repository":{templateUrl:"scripts/issueboard/newmilestone/newmilestone.html",controller:"NewmilestoneCtrl"},"deletemilestone@repository":{templateUrl:"scripts/issueboard/newmilestone/deletemilestone.html",controller:"NewmilestoneCtrl"},"multiselect@repository":{templateUrl:"scripts/multiselect/multiselect.html"},"issuebox@repository":{templateUrl:"scripts/issueboard/issuebox/issueboard.issuebox.html"}}}).state("burndown",{url:"/repos/:owner/:repoName/burndown",views:{"":{templateUrl:"scripts/burndown/burndown.html",controller:"BurndownCtrl"},"header@":{controller:"HeaderCtrl",templateUrl:"scripts/header/header.html"}}})}]),angular.module("ohtuProjektiAppApp").controller("LoginCtrl",["$scope","$state","github","auth",function(a,b,c,d){a.signin=function(){var e=d.askAuth();e.done(function(d){c.loginWithToken(d.access_token),b.go("main",{},{reload:!0}),a.$apply()}).fail(function(a){console.log(a)})}}]),angular.module("ohtuProjektiAppApp").controller("LogoutCtrl",["github","$state",function(a,b){a.logout(),b.go("main")}]);var myApp=angular.module("ohtuProjektiAppApp");myApp.controller("MainCtrl",["$scope","$state","github",function(a,b,c){b.go(c.isAuthenticated()?"list":"login")}]),angular.module("ohtuProjektiAppApp").controller("ListCtrl",["$scope","$state","github","alertService",function(a,b,c,d){c.isAuthenticated()||b.go("main"),c.userRepos().success(function(b){a.repos=b}),a.repoExists=function(){c.repositoryExists(a.owner,a.repo).success(function(c){c&&b.go("repository",{owner:a.owner,repoName:a.repo})}).error(function(a){d.addAlert("danger",a.message)})}}]),angular.module("ohtuProjektiAppApp").controller("HeaderCtrl",["$scope","$location","github","filteringOptions","$state","$stateParams",function(a,b,c,d,e){a.currentState=e.current.name,a.params=e.params,a.isLoggedIn=c.isAuthenticated(),a.textFilter={filter:""},a.groupedFilters=[],c.authenticatedUser().success(function(b){a.userName=b.login,a.avatar=b.avatar_url}),a.getClass=function(a,c){return c=c||b.path(),c.substr(0,a.length)==a?"active":""},a.textFilterChanged=function(){d.setTextFilter(a.textFilter.filter)},a.$watch(function(){return d.getGroupedFilters()},function(b){a.groupedFilters=b})}]),angular.module("ohtuProjektiAppApp").controller("IssueboardCtrl",["$scope","$filter","$state","$stateParams","github","filteringOptions","$modal","$window","alertService",function(a,b,c,d,e,f,g,h,i){e.isAuthenticated()||c.go("main");var j=new e.Issue(d.owner,d.repoName),k=new e.Milestone(d.owner,d.repoName),l=new e.Label(d.owner,d.repoName),m=new e.Assignee(d.owner,d.repoName);a.$root.createOptions=["Issues","Labels","Milestones"],k.list().success(function(b){a.milestones=b,l.list().success(function(b){a.labels=b,m.list().success(function(b){b.editing=!1,a.assignees=b,f.init(a.labels,a.milestones,a.assignees)})})}),j.list().success(function(b){b.editing=!1,a.issues=b}).error(function(a){i.addAlert("danger",a.message)}),a.editItem=function(a){a.editingbody=a.body,a.editing=!0};a.changedMilestone=function(a,b){j.updateIssue(a.number,{milestone:a.milestone.number},function(){},function(){a.milestone=b}),a.editing=!1},a.assign=function(a,b){j.updateIssue(a.number,{assignee:b.login},function(b){a.assignee=b.assignee},function(){console.log("Error while assigning assignee")}),a.editing=!1},a.clearAssignee=function(a){j.updateIssue(a.number,{assignee:null},function(b){a.assignee=b.assignee},function(){console.log("Error while assigning assignee")}),a.editing=!1},a.changedLabel=function(a,b){j.updateIssue(a.number,{labels:a.labels},function(){},function(){a.labels=b}),a.editing=!1},a.getLabelColor=function(a){return 0===a.labels.length?"":"#"+a.labels[0].color},a.$root.openModal=function(b){"Issues"===b&&a.openNewIssueModal(),"Labels"===b&&a.openNewLabelModal(),"Milestones"===b&&a.openNewMilestoneModal(),"Issue edit"===b&&a.openIssueEditModal(),a.choice=0},a.openIssueEditModal=function(b){a.issue=b,a.modalInstance=g.open({templateUrl:"scripts/issueboard/issuebox/issueboxedit.html",controller:"IssueboxCtrl",scope:a})},a.openNewIssueModal=function(){g.open({templateUrl:"scripts/issueboard/newissue/newissue.html",controller:"NewissueCtrl",scope:a})},a.openNewLabelModal=function(){g.open({templateUrl:"scripts/issueboard/newlabel/newlabel.html",controller:"NewlabelCtrl",scope:a})},a.openNewMilestoneModal=function(){g.open({templateUrl:"scripts/issueboard/newmilestone/newmilestone.html",controller:"NewmilestoneCtrl",scope:a})},a.openDeleteMilestoneModal=function(){g.open({templateUrl:"scripts/issueboard/newmilestone/deletemilestone.html",controller:"NewmilestoneCtrl",scope:a})},a.$watch(function(){return f.getTextFilter()},function(b){a.textFilter=b.filter},!0),a.issueBoxDragStarted=function(b,c,d){a.dragedissue=d;var e=c.helper.context,f=angular.element(e);f.css({visibility:"visible"})},a.issueBoxDragStopped=function(a){var b=angular.element(a.target);b.css({visibility:"visible"})},a.issueDroppedReady=function(){a.issueDropped("State:Done","State:InProgress","State:Ready")},a.issueDroppedInProgress=function(){a.issueDropped("State:Ready","State:Done","State:InProgress")},a.issueDroppedDone=function(){a.issueDropped("State:Ready","State:InProgress","State:Done")};var n=function(){for(var b=0;b<a.issues.length;++b)a.issues[b].number==a.dragedissue.number&&(a.issues[b].labels=a.dragedissue.labels);j.updateIssue(a.dragedissue.number,{labels:a.dragedissue.labels},function(b){a.dragedissue.labels=b.labels},function(){})};a.issueDropped=function(b,c,d){for(var e=!0,f=0;f<a.dragedissue.labels.length;++f){var g=a.dragedissue.labels[f].name;(g==b||g==c)&&(a.dragedissue.labels[f].name=d,e=!1)}e&&a.dragedissue.labels.unshift(d),n()},a.issueDroppedBacklog=function(){for(var b=0;b<a.dragedissue.labels.length;++b){var c=a.dragedissue.labels[b].name;("State:Ready"==c||"State:InProgress"==c||"State:Done"==c)&&a.dragedissue.labels.splice(b,1)}n()}}]),angular.module("ohtuProjektiAppApp").service("auth",function(){return OAuth.initialize("CHkmXQc9pfI3vqPZectNDagrwSc"),{askAuth:function(){return OAuth.popup("github")}}}),angular.module("ohtuProjektiAppApp").service("github",["$http","localStorageService",function(a,b){function c(c,e,f,g,h){var i={method:c,url:d+e,data:f,cache:!1,params:{}},j=b.get("token");"GET"===c&&(i.params.cache=(new Date).getTime(),i.params.per_page=100),j&&(i.headers={Authorization:"token "+j});var k=a(i);return g?void(h?k.success(g).error(h):k.success(g)):k}var d="https://api.github.com",e={loginWithToken:function(a){b.set("token",a)},logout:function(){b.remove("token")},isAuthenticated:function(){return!!b.get("token")},user:function(a,b,d){return c("GET","/users/"+a,null,b,d)},authenticatedUser:function(a,b){return c("GET","/user",null,a,b)},userRepos:function(a,b){return c("GET","/user/repos",null,a,b)},repositoryExists:function(a,b,d,e){return c("GET","/repos/"+a+"/"+b,{},d,e)},Issue:function(a,b){var d="/repos/"+a+"/"+b+"/issues";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getIssue=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createIssue=function(a,b,e){return c("POST",d,a,b,e)},this.updateIssue=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.openIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"open"},b,e)},this.closeIssue=function(a,b,e){return c("PATCH",d+"/"+a,{state:"closed"},b,e)}},Label:function(a,b){var d="/repos/"+a+"/"+b+"/labels";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getLabel=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createLabel=function(a,b,e){return c("POST",d,a,b,e)},this.deleteLabel=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)},this.updateLabel=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)}},Comment:function(a,b,d){var e="/repos/"+a+"/"+b+"/issues/"+d.number+"/comments";this.list=function(a,b,d){return c("GET",e,a||{},b,d)},this.getComment=function(a,b,d){return c("GET",e+"/"+a,null,b,d)},this.createComment=function(a,b,d){return c("POST",e,a,b,d)},this.deleteComment=function(a,b,d){return c("DELETE",e+"/"+a,null,b,d)},this.updateComment=function(a,b,d,f){return c("PATCH",e+"/"+a,b,d,f)}},Milestone:function(a,b){var d="/repos/"+a+"/"+b+"/milestones";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.getMilestone=function(a,b,e){return c("GET",d+"/"+a,null,b,e)},this.createMilestone=function(a,b,e){return c("POST",d,a,b,e)},this.updateMilestone=function(a,b,e,f){return c("PATCH",d+"/"+a,b,e,f)},this.deleteMilestone=function(a,b,e){return c("DELETE",d+"/"+a,null,b,e)}},Assignee:function(a,b){var d="/repos/"+a+"/"+b+"/assignees";this.list=function(a,b,e){return c("GET",d,a||{},b,e)},this.checkAssignee=function(a,b,e){return c("GET",d+"/"+a,null,b,e)}}};return e}]),angular.module("ohtuProjektiAppApp").controller("BurndownCtrl",["$scope","$stateParams","github",function(a,b,c){var d=new c.Issue(b.owner,b.repoName);a.listOfIssues,d.list().success(function(b){console.log(b[0]),a.listOfIssues=b,a.data=[];for(var c=0,d=0;d<a.listOfIssues.length;++d)a.data.push({x:new Date(a.listOfIssues[d].created_at),val_0:c}),c++}),a.options={axes:{x:{type:"date",key:"x"},y:{type:"linear"}},series:[{y:"val_0",label:"Issues created",color:"#9467bd",axis:"y",type:"line",thickness:"2px",id:"series_0",visible:!0,lineMode:void 0}],tooltip:{mode:"scrubber"},stacks:[],lineMode:"linear",tension:.7,drawLegend:!0,drawDots:!0,columnsHGap:5}}]),angular.module("ohtuProjektiAppApp").controller("NewissueCtrl",["$state","$scope","github","$stateParams","$modalInstance","alertService",function(a,b,c,d,e,f){var g=new c.Issue(d.owner,d.repoName),h=function(){a.transitionTo(a.current,d,{reload:!0,inherit:!1,notify:!0})};b.issue={},b.addIssue=function(){var a={title:b.issue.title,body:b.issue.body,assignee:b.issue.assignee,labels:b.issue.labels};b.issue.milestone&&(a={title:b.issue.title,body:b.issue.body,assignee:b.issue.assignee,labels:b.issue.labels,milestone:b.issue.milestone.number}),g.createIssue(a).success(function(a,c){"201"==c&&b.issues.unshift(a),f.addAlert("success","Created issue: "+b.issue.title)}).error(function(a){f.addAlert("danger","Could not create issue: "+a.message)}),h(),b.close()},b.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").controller("NewlabelCtrl",["$scope","github","$state","$stateParams","$modalInstance","alertService",function(a,b,c,d,e,f){var g=new b.Label(d.owner,d.repoName),h=function(){c.transitionTo(c.current,d,{reload:!0,inherit:!1,notify:!0})};a.createLabel=function(b){var c=b.color.slice(1,7),d={name:b.name,color:c};g.createLabel(d,function(c){f.addAlert("success","Created label: "+b.name),a.labels.push(c)},function(){f.addAlert("danger","Creation unsuccessful:")}),h(),a.close()},a.renameLabel=function(b,c){var d={name:c};g.updateLabel(b,d,function(c){f.addAlert("success","Renamed label: "+b),a.labels.push(c)},function(){f.addAlert("danger","Rename unsuccessful:")}),h(),a.close()},a.deleteLabel=function(b){"State:Ready"!==b&&"State:InProgress"!==b&&"State:Done"!==b?g.deleteLabel(b,function(){f.addAlert("success","Deleted label: "+b)},function(){f.addAlert("danger","Deletion unsuccessful:")}):f.addAlert("danger","Deletion of '"+b+"' is not allowed"),h(),a.close()},a.close=function(){e.dismiss("close")}}]),angular.module("ohtuProjektiAppApp").controller("NewmilestoneCtrl",["$scope","github","$state","$stateParams","$modalInstance","$filter","alertService",function(a,b,c,d,e,f,g){a.ghMilestones=new b.Milestone(d.owner,d.repoName),a.reload=function(){c.transitionTo(c.current,d,{reload:!0,inherit:!1,notify:!0})},a.createMilestone=function(b){var c=f("date")(b.due_on,"yyyy-MM-ddTHH:mmZ"),d={title:b.title,description:b.description,due_on:c};a.ghMilestones.createMilestone(d,function(c){g.addAlert("success","Created milestone: "+b.title),a.milestones.push(c)},function(){g.addAlert("danger","Creation unsuccessful:")}),a.reload(),a.close()},a.deleteMilestone=function(b){b&&a.ghMilestones.deleteMilestone(b.number,function(){g.addAlert("success","Deleted milestone: "+b.title),a.reload()}),a.close()},a.close=function(){e.dismiss("close")},a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0}}]),angular.module("ohtuProjektiAppApp").controller("IssueboxCtrl",["$scope","github","$state","$stateParams","$modalInstance","alertService",function(a,b,c,d,e,f){var g=new b.Issue(d.owner,d.repoName),h=new b.Comment(d.owner,d.repoName,a.issue);h.list({},function(b){a.comments=b}),a.data={body:""},a.editissue=angular.copy(a.issue);a.cancelEditing=function(b){b.editing=!1,a.modalInstance.dismiss("close")},a.doneEditing=function(b){var c=angular.copy(a.issue),d=[];angular.forEach(a.issue.labels,function(a){a.name.indexOf("State:")>-1&&(d.unshift(a.name),b.labels.unshift(a))}),angular.forEach(b.labels,function(a){d.push(a.name)}),a.issue.title=b.title,a.issue.body=b.body,a.issue.milestone=b.milestone,a.issue.labels=b.labels;var e=[];e=null==b.milestone?{title:b.title,body:b.body,labels:d,milestone:""}:{title:b.title,body:b.body,labels:d,milestone:b.milestone.number},g.updateIssue(b.number,e,function(){f.addAlert("success","Edit succesful")},function(){a.issue.title=c.title,a.issue.body=c.body,a.issue.milestone=c.milestone,a.issue.labels=c.labels,f.addAlert("warning","Edit unsuccesful")}),b.editing=!1,a.modalInstance.dismiss("close")},a.close=function(){e.dismiss("close")},a.newComment=function(b){h.createComment({body:b},function(b){a.comments.push(b)},function(){}),a.data.body=""}}]),angular.module("ohtuProjektiAppApp").filter("multiselect",["filteringOptions",function(a){return function(b){function c(){return 0!=k.length}function d(){return 0!=j.length}function e(){return 0!=l.length}function f(){return!d()&&!c()&&!e()}function g(a){for(var b=0;b<j.length;b++)if(h(a,j[b].name))return void i.push(a);for(var b=0;b<k.length;b++){if(!a.milestone)return;if(k[b].name===a.milestone.title)return void i.push(a)}for(var b=0;b<l.length;b++){if(!a.assignee)return;if(l[b].name===a.assignee.login)return void i.push(a)}}function h(a,b){if(!a.labels)return!1;for(var c=0;c<a.labels.length;c++)if(a.labels[c].name===b)return!0;return!1}for(var i=[],j=[],k=[],l=[],m=a.getGroupedFilters(),n=0;n<m.length;n++){var o=m[n];o.ticked&&("label"===o.type&&j.push(o),"milestone"===o.type&&k.push(o),"assignee"===o.type&&l.push(o))}return f()?b:(angular.forEach(b,g),i)}}]).filter("textfilter",function(){return function(a,b){function c(a){return a.body&&a.body.indexOf(b)>-1||a.title&&a.title.indexOf(b)>-1||a.number==parseInt(b)}if(""==b)return a;var d=[];return a.forEach(function(a){c(a)&&d.push(a)}),d}});var app=angular.module("ohtuProjektiAppApp");app.directive("issuebox",function(){return{restrict:"E",templateUrl:"scripts/issueboard/issuebox/issueboard.issuebox.html"}}),angular.module("ohtuProjektiAppApp").service("filteringOptions",function(){var a={filter:""},b=[];return{getGroupedFilters:function(){return b},getTextFilter:function(){return a},setTextFilter:function(b){a.filter=b},init:function(a,c,d){if(a){b=[],b.push({name:"<strong>Milestones</strong>",multiSelectGroup:!0});for(var e=0;e<c.length;e++){var f=c[e].title;b.push({name:f,ticked:!1,type:"milestone"})}b.push({multiSelectGroup:!1}),b.push({name:"<strong>Labels</strong>",multiSelectGroup:!0});for(var e=0;e<a.length;e++){var g=a[e].name;"State:Done"!=g&&"State:InProgress"!=g&&"State:Ready"!=g&&b.push({name:g,ticked:!1,type:"label"})}b.push({multiSelectGroup:!1}),b.push({name:"<strong>Assignees</strong>",multiSelectGroup:!0});for(var e=0;e<d.length;e++){var g=d[e].login;b.push({name:g,ticked:!1,type:"assignee"})}b.push({multiSelectGroup:!1})}}}}),angular.module("ui.labelmultiselect",["labelmultiselect.tpl.html"]).factory("optionParser",["$parse",function(a){var b=/^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '"+c+"'.");return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("labelmultiselect",["$parse","$document","$compile","$interpolate","optionParser",function(a,b,c,d,e){return{restrict:"E",require:"ngModel",link:function(b,f,g,h){function i(){s.items.length=0;var a=p.source(b);if(angular.isDefined(a))for(var c=0;c<a.length;c++){var d={};d[p.itemName]=a[c],s.items.push({label:p.viewMapper(d),model:a[c],checked:!1})}}function j(){if(k(h.$modelValue))return s.header=g.msHeader||"Select";if(q)s.header=g.msSelected?d(g.msSelected)(s):h.$modelValue.length+" selected";else{var a={};a[p.itemName]=h.$modelValue,s.header=p.viewMapper(a)}}function k(a){if(!a)return!0;if(a.length&&a.length>0)return!1;for(var b in a)if(a[b])return!1;return!0}function l(a){a.checked=!a.checked,m(!0)}function m(a){var b;a?(b=[],angular.forEach(s.items,function(a){a.checked&&b.push(a.model)})):angular.forEach(s.items,function(a){return a.checked?(b=a.model,!1):void 0}),h.$setViewValue(b)}function n(a){angular.isArray(a)?angular.forEach(s.items,function(b){b.checked=!1,angular.forEach(a,function(a){angular.equals(b.model,a)&&(b.checked=!0)})}):angular.forEach(s.items,function(b){return angular.equals(b.model,a)?(b.checked=!0,!1):void 0})}var o=g.options,p=e.parse(o),q=!0,r=!1,s=b.$new(),t=g.change||angular.noop;g.msHeader="--Select--",g.msSelected="--Select--",s.items=[],s.header="--Select--",s.multiple=!0,s.disabled=!1,b.$on("$destroy",function(){s.$destroy()});var u=angular.element("<labelmultiselect-popup></labelmultiselect-popup>");(g.required||g.ngRequired)&&(r=!0),g.$observe("required",function(a){r=a}),s.$watch(function(){return a(g.disabled)(b)},function(a){s.disabled=a}),s.$watch(function(){return a(g.multiple)(b)},function(a){q=a||!1}),s.$watch(function(){return p.source(b)},function(a){angular.isDefined(a)&&i()},!0),s.$watch(function(){return h.$modelValue},function(a){angular.isDefined(a)&&(n(a),s.$eval(t)),j(),h.$setValidity("required",s.valid())},!0),i(),f.append(c(u)(s)),s.valid=function(){if(!r)return!0;var a=h.$modelValue;return angular.isArray(a)&&a.length>0||!angular.isArray(a)&&null!=a},s.checkAll=function(){angular.forEach(s.items,function(a){a.checked=!0}),m(!0)},s.uncheckAll=function(){angular.forEach(s.items,function(a){a.checked=!1}),m(!0)},s.select=function(a){l(a)}}}}]).directive("labelmultiselectPopup",["$document",function(a){return{restrict:"E",scope:!1,replace:!0,templateUrl:"labelmultiselect.tpl.html",link:function(b,c){function d(f){e(f.target,c.find(f.target.tagName))||(c.removeClass("open"),a.unbind("click",d),b.$apply())}b.isVisible=!1,b.toggleSelect=function(){c.hasClass("open")?(c.removeClass("open"),a.unbind("click",d)):(c.addClass("open"),a.bind("click",d),b.focus())},b.focus=function(){var a=c.find("input")[0];a.focus()};var e=function(a,b){for(var c=0;c<b.length;c++)if(a==b[c])return!0;return!1}}}}]),angular.module("labelmultiselect.tpl.html",[]).run(["$templateCache",function(a){a.put("labelmultiselect.tpl.html",'<div class="btn-group multilabel">\n  <button id="labelselect"type="button" class="btn btn-default dropdown-toggle form-control" ng-click="toggleSelect()" ng-disabled="disabled" ng-class="{\'error\': !valid()}">\n    --Select-- <span class="caret"></span>\n  </button>\n  <ul class="dropdown-menu">\n    <li>\n      <input class="form-control input-sm" type="text" ng-model="searchText.label" autofocus="autofocus" placeholder="Filter" />\n    </li>\n    <li ng-show="multiple" role="presentation" class="">\n      <button class="btn btn-link btn-xs" ng-click="checkAll()" type="button"><i class="glyphicon glyphicon-ok"></i> Check all</button>\n      <button class="btn btn-link btn-xs" ng-click="uncheckAll()" type="button"><i class="glyphicon glyphicon-remove"></i> Uncheck all</button>\n    </li>\n    <li ng-repeat="i in items | filter:searchText">\n      <a id="{{i.label}}" ng-click="select(i); focus()">\n        <i class="glyphicon" ng-class="{\'glyphicon-ok\': i.checked, \'empty\': !i.checked}"></i> {{i.label}}</a>\n    </li>\n  </ul>\n</div>')}]),angular.module("ui.bootstrap.datetimepicker",[]).constant("dateTimePickerConfig",{dropdownSelector:null,minuteStep:5,minView:"hour",startView:"day",weekStart:0}).directive("datetimepicker",["dateTimePickerConfig",function(a){var b=function(a){var b=["startView","minView","minuteStep","dropdownSelector","weekStart"];for(var c in a)if(a.hasOwnProperty(c)&&b.indexOf(c)<0)throw"invalid option: "+c;var d=["minute","hour","day","month","year"];if(d.indexOf(a.startView)<0)throw"invalid startView value: "+a.startView;if(d.indexOf(a.minView)<0)throw"invalid minView value: "+a.minView;if(d.indexOf(a.minView)>d.indexOf(a.startView))throw"startView must be greater than minView";if(!angular.isNumber(a.minuteStep))throw"minuteStep must be numeric";if(a.minuteStep<=0||a.minuteStep>=60)throw"minuteStep must be greater than zero and less than 60";if(null!==a.dropdownSelector&&!angular.isString(a.dropdownSelector))throw"dropdownSelector must be a string";if(!angular.isNumber(a.weekStart))throw"weekStart must be numeric";if(a.weekStart<0||a.weekStart>6)throw"weekStart must be greater than or equal to zero and less than 7"};return{restrict:"E",require:"ngModel",template:"<div class='datetimepicker'><table class='table-condensed'>   <thead>       <tr>           <th class='left'               data-ng-click='changeView(data.currentView, data.leftDate, $event)'               ><i class='glyphicon glyphicon-arrow-left'/></th>           <th class='switch' colspan='5'               data-ng-click='changeView(data.previousView, data.currentDate, $event)'>{{ data.title }}</th>           <th class='right'               data-ng-click='changeView(data.currentView, data.rightDate, $event)'             ><i class='glyphicon glyphicon-arrow-right'/></th>       </tr>       <tr>           <th class='dow' data-ng-repeat='day in data.dayNames' >{{ day }}</th>       </tr>   </thead>   <tbody>       <tr data-ng-class='{ hide: data.currentView == \"day\" }' >           <td colspan='7' >              <span    class='{{ data.currentView }}'                        data-ng-repeat='dateValue in data.dates'                         data-ng-class='{active: dateValue.active, past: dateValue.past, future: dateValue.future}'                        data-ng-click=\"changeView(data.nextView, dateValue.date, $event)\">{{ dateValue.display }}</span>            </td>       </tr>       <tr data-ng-show='data.currentView == \"day\"' data-ng-repeat='week in data.weeks'>           <td data-ng-repeat='dateValue in week.dates'                data-ng-click='changeView(data.nextView, dateValue.date, $event)'               class='day'                data-ng-class='{active: dateValue.active, past: dateValue.past, future: dateValue.future}' >{{ dateValue.display }}</td>       </tr>   </tbody></table></div>",scope:{ngModel:"=",onSetTime:"="},replace:!0,link:function(c,d,e){var f={};e.datetimepickerConfig&&(f=c.$eval(e.datetimepickerConfig));var g={};angular.extend(g,a,f),b(g);var h={year:function(a){for(var b=moment.utc(a).startOf("year"),d=10*parseInt(b.year()/10,10),e=moment.utc(b).year(d-1).startOf("year"),f=c.ngModel?moment(c.ngModel).year():0,h={currentView:"year",nextView:"year"===g.minView?"setTime":"month",title:d+"-"+(d+9),leftDate:moment.utc(e).subtract(9,"year").valueOf(),rightDate:moment.utc(e).add(11,"year").valueOf(),dates:[]},i=0;12>i;i++){var j=moment.utc(e).add(i,"years"),k={date:j.valueOf(),display:j.format("YYYY"),past:j.year()<d,future:j.year()>d+9,active:j.year()===f};h.dates.push(k)}return h},month:function(a){for(var b=moment.utc(a).startOf("year"),d=c.ngModel?moment(c.ngModel).format("YYYY-MMM"):0,e={previousView:"year",currentView:"month",nextView:"month"===g.minView?"setTime":"day",currentDate:b.valueOf(),title:b.format("YYYY"),leftDate:moment.utc(b).subtract(1,"year").valueOf(),rightDate:moment.utc(b).add(1,"year").valueOf(),dates:[]},f=0;12>f;f++){var h=moment.utc(b).add(f,"months"),i={date:h.valueOf(),display:h.format("MMM"),active:h.format("YYYY-MMM")===d};e.dates.push(i)}return e},day:function(a){for(var b=moment.utc(a),d=moment.utc(b).startOf("month"),e=moment.utc(b).endOf("month"),f=moment.utc(d).subtract(Math.abs(d.weekday()-g.weekStart),"days"),h=c.ngModel?moment(c.ngModel).format("YYYY-MMM-DD"):"",i={previousView:"month",currentView:"day",nextView:"day"===g.minView?"setTime":"hour",currentDate:b.valueOf(),title:b.format("YYYY-MMM"),leftDate:moment.utc(d).subtract(1,"months").valueOf(),rightDate:moment.utc(d).add(1,"months").valueOf(),dayNames:[],weeks:[]},j=g.weekStart;j<g.weekStart+7;j++)i.dayNames.push(moment.utc().weekday(j).format("dd"));for(var k=0;6>k;k++){for(var l={dates:[]},m=0;7>m;m++){var n=moment.utc(f).add(7*k+m,"days"),o={date:n.valueOf(),display:n.format("D"),active:n.format("YYYY-MMM-DD")===h,past:n.isBefore(d),future:n.isAfter(e)};l.dates.push(o)}i.weeks.push(l)}return i},hour:function(a){for(var b=moment.utc(a).hour(0).minute(0).second(0),d=c.ngModel?moment(c.ngModel).format("YYYY-MM-DD H"):"",e={previousView:"day",currentView:"hour",nextView:"hour"===g.minView?"setTime":"minute",currentDate:b.valueOf(),title:b.format("YYYY-MMM-DD"),leftDate:moment.utc(b).subtract(1,"days").valueOf(),rightDate:moment.utc(b).add(1,"days").valueOf(),dates:[]},f=0;24>f;f++){var h=moment.utc(b).add(f,"hours"),i={date:h.valueOf(),display:h.format("H:00"),active:h.format("YYYY-MM-DD H")===d};e.dates.push(i)}return e},minute:function(a){for(var b=moment.utc(a).minute(0).second(0),d=c.ngModel?moment(c.ngModel).format("YYYY-MM-DD H:mm"):"",e={previousView:"hour",currentView:"minute",nextView:"setTime",currentDate:b.valueOf(),title:b.format("YYYY-MMM-DD H:mm"),leftDate:moment.utc(b).subtract(1,"hours").valueOf(),rightDate:moment.utc(b).add(1,"hours").valueOf(),dates:[]},f=60/g.minuteStep,h=0;f>h;h++){var i=moment.utc(b).add(h*g.minuteStep,"minute"),j={date:i.valueOf(),display:i.format("H:mm"),active:i.format("YYYY-MM-DD H:mm")===d};e.dates.push(j)}return e},setTime:function(a){var b=new Date(a),d=new Date(b.getTime()+6e4*b.getTimezoneOffset());return g.dropdownSelector&&jQuery(g.dropdownSelector).dropdown("toggle"),angular.isFunction(c.onSetTime)&&c.onSetTime(d,c.ngModel),c.ngModel=d,h[c.data.currentView](a)}},i=function(){var a=c.ngModel?moment(c.ngModel).toDate():new Date;return a.getTime()-6e4*a.getTimezoneOffset()};c.changeView=function(a,b,d){d&&(d.stopPropagation(),d.preventDefault()),a&&b>-1/0&&h[a]&&(c.data=h[a](b))},c.changeView(g.startView,i()),c.$watch("ngModel",function(){c.changeView(c.data.currentView,i())})}}}]),angular.module("ohtuProjektiAppApp").service("alertService",["$rootScope","$timeout",function(a,b){var c={};return a.alerts=[],c.addAlert=function(c,d){a.alerts.push({type:c,msg:d}),b(function(){a.alerts.splice(0,1)},3e3)},c.closeAlert=function(b){a.alerts.splice(b,1)},c}]);