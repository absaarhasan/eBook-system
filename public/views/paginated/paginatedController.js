(function() {

    'use strict';

    angular.module('bol.paginated', ['ui.router'])
        .factory('paginatedService', paginatedService)
        .controller('PaginatedCtrl',  PaginatedCtrl)
        .config(function($stateProvider) {

            $stateProvider
                .state('pagination', {
                    url: "/:chapter/:paragraph",
                    parent: 'main',
                    templateUrl: "views/paginated/paginated.html",
                    controller: 'PaginatedCtrl',
                    controllerAs: 'vm'
                })

        });


   PaginatedCtrl.$inject = ['$scope','paginatedService'];

    function PaginatedCtrl($scope , paginatedService) {

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


        paginatedService.activate($scope.$parent.vm.maxChapters)

    }


})();