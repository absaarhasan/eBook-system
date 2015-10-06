(function() {

    'use strict';

    angular.module('bol', ['ui.router','hmTouchEvents','bol.main','bol.paginated','bol.scroll'])

        .config(function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/1/1");

        }).run(function ($rootScope, $state) {
            $rootScope.$state = $state;
        });

})();


