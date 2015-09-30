(function() {

    'use strict';

    angular.module('bol', ['ui.router','hmTouchEvents','bol.main','bol.paginated','bol.scroll'])

        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider

            .state('setup', {
                url: "/",
                controller: SetupCtrl
            })

        }]);

    SetupCtrl.$inject = ['$state'];

    function SetupCtrl( $state) {

        $state.go('pagination', { chapter: 1, paragraph: 1  });

    };

})();


