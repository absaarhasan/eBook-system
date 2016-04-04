(function() {

    'use strict';

    angular.module('bol.paginated', ['ui.router'])
        .factory('paginatedService', paginatedService)
        .controller('PaginatedCtrl',  PaginatedCtrl)
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider
                .state('pagination', {
                    url: "/:chapter/:paragraph",
                    parent: 'main',
                    templateUrl: "views/paginated/paginated.html",
                    controller: 'PaginatedCtrl',
                    controllerAs: 'vm'
                })

        }]);


   PaginatedCtrl.$inject = ['$scope','paginatedService' , 'maxChapters'];

    function PaginatedCtrl($scope , paginatedService , maxChapters) {

        /* jshint validthis: true */
        var vm = this;

        vm.nextScreen = paginatedService.nextScreen;
        vm.prevScreen = paginatedService.prevScreen;
        vm.activeScreen = paginatedService.activeScreen;
        vm.activeScreens = paginatedService.activeScreens;
        vm.updateDisplay = paginatedService.updateDisplay;
        vm.trustHtml = paginatedService.trustHtml;
        vm.pressScreen = paginatedService.pressScreen;
        vm.resetDisplay = paginatedService.resetDisplay;
        vm.test = function(){

           $scope.$parent.vm.displayMenu(true)

        }


        paginatedService.activate(maxChapters)

    }


})();