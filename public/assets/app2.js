
// Angular module, defining routes for the app

var app = angular.module('bol', ['ui.router','hmTouchEvents'])

    .config(function($stateProvider, $urlRouterProvider) {

        var randomUrl = '/' + Math.floor((Math.random() * 100000000) + 1);

    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('main', {
            abstract: true,
            templateUrl: "views/main.html",
            controller: MainCtrl
        })

        .state('setup', {
            url: "/",
            controller: SetupCtrl
        })
        .state('pagination', {
            url: "/:chapter/:paragraph",
            parent: 'main',
            templateUrl: "views/paginated.html",
            controller: PaginatedCtrl
        })
        .state('fulltext', {
            url: '/fullbook',
            parent: 'main',
            templateUrl: "views/fulltext.html",
            controller: FulltextCtrl
        })



    })

