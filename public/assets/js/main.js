"use strict";function scrollService(a,b,c){function d(a){document.getElementsByTagName("html")[0].classList.add("fullbook"),e(i),c.onscroll=function(b){c.innerHeight+c.scrollY>=document.body.scrollHeight-100&&a>=i&&0==h&&(h=!0,e(i))}}function e(){var b=document.getElementById("preloader");b.classList.add("show");var c="assets/json/chapter"+i+".json";a.get(c).success(function(a){var c=a.chapter;for(var d in c)g.push({screen:c[d].screen,type:c[d].type});b.classList.remove("show"),j.activeScreens.data=g,i++,h=!1}).error(function(){console.log("ajax fail")})}function f(a){return b.trustAsHtml(a)}var g=[],h=!1,i=1,j={activeScreens:{data:{}},trustHtml:f,activate:d};return j}function paginatedService(a,b,c,d,e,f,g){function h(c){document.getElementsByTagName("html")[0].classList.remove("fullbook");var f=parseInt(d.chapter);if(f>c||1>f)b.go("pagination",{chapter:1,paragraph:1});else{var h="assets/json/chapter"+f+".json";a.get(h,{cache:!0}).success(function(a){var b=a.chapter,c=[];for(var e in b)"text"!=b[e].type&&c.push({screen:b[e].screen,type:b[e].type});n.activeScreens.data=c,i(d.paragraph)}).error(function(){g.location.reload()})}e.previousState||m()}function i(a){var c=parseInt(d.chapter),e=n.activeScreens.data.length;if("final"==a&&(a=e),a=parseInt(a),a>e){var g=c+1;b.transitionTo("pagination",{chapter:g,paragraph:1},{reload:!1,inherit:!0,location:!0,notify:!1}),f(function(){b.transitionTo("pagination",{chapter:g,paragraph:1},{reload:!0,inherit:!0,location:!0,notify:!0})},0)}else if(1>a){var h=c-1;b.transitionTo("pagination",{chapter:h,paragraph:"final"},{reload:!1,inherit:!0,location:!0,notify:!1}),f(function(){b.transitionTo("pagination",{chapter:h,paragraph:"final"},{reload:!0,inherit:!0,location:!0,notify:!0})},0)}else a>=1&&e>=a&&(n.activeScreen.data=a,n.nextScreen.data=a+1,n.prevScreen.data=a-1,b.go("pagination",{chapter:c,paragraph:a},{notify:!1}))}function j(){g.location.reload()}function k(){b.go("fulltext")}function l(a){return c.trustAsHtml(a)}function m(){a.get("assets/json/chapter1.json",{cache:!0}),a.get("assets/json/chapter2.json",{cache:!0}),a.get("assets/json/chapter3.json",{cache:!0}),a.get("assets/json/chapter4.json",{cache:!0}),a.get("assets/json/chapter5.json",{cache:!0}),a.get("assets/json/chapter6.json",{cache:!0}),a.get("assets/json/chapter7.json",{cache:!0}),a.get("assets/json/chapter8.json",{cache:!0}),a.get("assets/json/chapter9.json",{cache:!0}),a.get("assets/json/chapter10.json",{cache:!0}),a.get("assets/json/chapter11.json",{cache:!0}),a.get("assets/json/chapter12.json",{cache:!0}),a.get("assets/json/chapter13.json",{cache:!0}),a.get("assets/json/chapter14.json",{cache:!0}),a.get("assets/json/chapter15.json",{cache:!0}),a.get("assets/json/chapter16.json",{cache:!0}),a.get("assets/json/chapter17.json",{cache:!0}),a.get("assets/json/chapter18.json",{cache:!0}),a.get("assets/json/chapter19.json",{cache:!0}),a.get("assets/json/chapter20.json",{cache:!0}),a.get("assets/json/chapter21.json",{cache:!0}),a.get("assets/json/chapter22.json",{cache:!0})}var n={nextScreen:{data:0},prevScreen:{data:0},activeScreen:{data:0},activeScreens:{data:{}},updateDisplay:i,trustHtml:l,pressScreen:k,resetDisplay:j,activate:h};return n}function mainService(a,b){function c(a){f.menuDisplay.state=a}function d(a){var b=document.getElementsByTagName("html"),c=window.getComputedStyle(b[0]),d=c.getPropertyValue("font-size"),e=parseInt(d);"increase"==a?e++:e--,b[0].style.fontSize=e+"px"}function e(){f.menuDisplay.state=!1,a.go("fulltext",{reload:!1,inherit:!0,location:!0,notify:!1}),b(function(){a.go("fulltext",{reload:!0,inherit:!0,location:!0,notify:!0})},0)}var f={menuDisplay:{state:!1},displayMenu:c,adjustFont:d,fullBook:e};return f}scrollService.$inject=["$http","$sce","$window"],function(){function a(a,b){var c=this;c.activeScreens=b.activeScreens,c.trustHtml=b.trustHtml,b.activate(a.$parent.vm.maxChapters)}angular.module("bol.scroll",["ui.router"]).factory("scrollService",scrollService).controller("ScrollCtrl",a).config(["$stateProvider",function(a){a.state("fulltext",{url:"/fullbook",parent:"main",templateUrl:"views/scroll/scroll.html",controller:"ScrollCtrl",controllerAs:"vm"})}]),a.$inject=["$scope","scrollService"]}(),paginatedService.$inject=["$http","$state","$sce","$stateParams","$rootScope","$timeout","$window"],function(){function a(a,b){var c=this;c.nextScreen=b.nextScreen,c.prevScreen=b.prevScreen,c.activeScreen=b.activeScreen,c.activeScreens=b.activeScreens,c.updateDisplay=b.updateDisplay,c.trustHtml=b.trustHtml,c.pressScreen=b.pressScreen,c.resetDisplay=b.resetDisplay,b.activate(a.$parent.vm.maxChapters)}angular.module("bol.paginated",["ui.router"]).factory("paginatedService",paginatedService).controller("PaginatedCtrl",a).config(["$stateProvider",function(a){a.state("pagination",{url:"/:chapter/:paragraph",parent:"main",templateUrl:"views/paginated/paginated.html",controller:"PaginatedCtrl",controllerAs:"vm"})}]),a.$inject=["$scope","paginatedService"]}(),mainService.$inject=["$state","$timeout"],function(){function a(a,b){var c=this;c.menuDisplay=b.menuDisplay,c.maxChapters=22,c.displayMenu=b.displayMenu,c.adjustFont=b.adjustFont,c.fullBook=b.fullBook,a.$on("$stateChangeSuccess",function(b,c,d,e,f){a.previousState=e.name,a.previousParams=f})}angular.module("bol.main",["ui.router"]).factory("mainService",mainService).controller("MainCtrl",a).config(["$stateProvider",function(a){a.state("main",{"abstract":!0,templateUrl:"views/shared/main.html",controller:"MainCtrl",controllerAs:"vm"})}]),a.$inject=["$rootScope","mainService"]}(),function(){function a(a){a.go("pagination",{chapter:1,paragraph:1})}angular.module("bol",["ui.router","hmTouchEvents","bol.main","bol.paginated","bol.scroll"]).config(["$stateProvider","$urlRouterProvider",function(b,c){c.otherwise("/"),b.state("setup",{url:"/",controller:a})}]),a.$inject=["$state"]}();