(function() {

        'use strict';

        angular.module('bol.main', ['ui.router'])

            .factory('mainService', mainService)
            .controller('MainCtrl',  MainCtrl)
            .config(function($stateProvider) {
                $stateProvider

                    .state('main', {
                        abstract: true,
                        templateUrl: "views/shared/main.html",
                        controller: 'MainCtrl',
                        controllerAs: 'vm'
                    })

            });

        MainCtrl.$inject = ['$rootScope', 'mainService'];

        function MainCtrl($rootScope, mainService) {

            /* jshint validthis: true */
            var vm = this;

            vm.menuDisplay = mainService.menuDisplay;
     //       vm.activeScreens = [];
            vm.maxChapters = 22;
            vm.displayMenu = mainService.displayMenu;
            vm.adjustFont = mainService.adjustFont;
            vm.fullBook = mainService.fullBook;

            $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {

                $rootScope.previousState = from.name;
                $rootScope.previousParams = fromParams;

            });


        }


})();

