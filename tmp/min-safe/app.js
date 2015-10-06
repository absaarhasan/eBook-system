(function() {

    'use strict';

    angular.module('bol', ['ui.router','hmTouchEvents','bol.main','bol.paginated','bol.scroll'])

        .config(['$urlRouterProvider', function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/1/1");

        }]).run(['$rootScope', '$state', function ($rootScope, $state) {
            $rootScope.$state = $state;
        }]);

})();


